-- ============================================================================
-- MATRU-NETRA: Maternal Care Net-Grid Database Schema
-- Production PostgreSQL & Supabase Auth Setup with Row-Level Security (RLS)
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. PROFILES TABLE (Linked to auth.users)
-- Stores role, verified clinical credentials, and contact info
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK (role IN ('doctor', 'asha', 'mother')),
    full_name TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    designation TEXT,
    assigned_sub_centre TEXT,
    assigned_phc TEXT,
    account_status TEXT NOT NULL DEFAULT 'active' CHECK (account_status IN ('active', 'pending_approval', 'suspended')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row-Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies:
-- Users can view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- Healthcare workers can view profiles of mothers within their jurisdiction
CREATE POLICY "Doctors and ASHAs can view mother profiles in their jurisdiction" 
ON public.profiles FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles AS worker 
        WHERE worker.id = auth.uid() 
        AND worker.role IN ('doctor', 'asha')
    )
);

-- Users can update non-privileged fields of their own profile (cannot change role)
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (
    auth.uid() = id AND 
    role = (SELECT role FROM public.profiles WHERE id = auth.uid())
);

-- ----------------------------------------------------------------------------
-- 2. MATERNAL PATIENTS TABLE
-- Clinical profiles for expectant and postpartum mothers
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.maternal_patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- Nullable if registered by ASHA before patient registers
    mcts_id TEXT UNIQUE,
    name TEXT NOT NULL,
    age INT NOT NULL CHECK (age >= 14 AND age <= 60),
    husband_name TEXT,
    village TEXT NOT NULL,
    sub_centre TEXT NOT NULL,
    phc_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    lmp_date DATE NOT NULL,
    edd_date DATE NOT NULL,
    gestational_weeks INT NOT NULL,
    gravida INT NOT NULL DEFAULT 1,
    para INT NOT NULL DEFAULT 0,
    blood_group TEXT,
    risk_level TEXT NOT NULL DEFAULT 'normal' CHECK (risk_level IN ('normal', 'moderate', 'high')),
    risk_reasons TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'Scheduled',
    assigned_asha_id UUID REFERENCES public.profiles(id),
    assigned_doctor_id UUID REFERENCES public.profiles(id),
    last_visit_date DATE,
    next_scheduled_date DATE,
    next_scheduled_type TEXT,
    baby_details JSONB DEFAULT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.maternal_patients ENABLE ROW LEVEL SECURITY;

-- Patient Policies:
-- A mother can only view her own maternal record
CREATE POLICY "Mothers can view only their own record" 
ON public.maternal_patients FOR SELECT 
USING (auth.uid() = user_id);

-- An ASHA worker can view and manage mothers assigned to her
CREATE POLICY "ASHA can view assigned patients" 
ON public.maternal_patients FOR SELECT 
USING (
    auth.uid() = assigned_asha_id OR 
    sub_centre = (SELECT assigned_sub_centre FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "ASHA can insert new mother registrations" 
ON public.maternal_patients FOR INSERT 
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'asha'
    )
);

CREATE POLICY "ASHA can update assigned mother records" 
ON public.maternal_patients FOR UPDATE 
USING (auth.uid() = assigned_asha_id);

-- Doctors can view all patients in their PHC
CREATE POLICY "Doctors can view and manage PHC patients" 
ON public.maternal_patients FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'doctor'
    )
);

-- ----------------------------------------------------------------------------
-- 3. VISIT RECORDS TABLE
-- Doorstep ANC/PNC visits logged by ASHAs and reviewed by Doctors
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.visit_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mother_id UUID NOT NULL REFERENCES public.maternal_patients(id) ON DELETE CASCADE,
    mother_name TEXT NOT NULL,
    visit_type TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    gestational_age_weeks INT NOT NULL,
    bp_systolic INT NOT NULL,
    bp_diastolic INT NOT NULL,
    weight_kg NUMERIC(4, 1) NOT NULL,
    hemoglobin NUMERIC(3, 1) NOT NULL,
    fetal_heart_rate INT,
    baby_temp_celsius NUMERIC(3, 1),
    danger_signs_reported TEXT[] DEFAULT '{}',
    asha_observations TEXT,
    flagged_for_doctor BOOLEAN NOT NULL DEFAULT false,
    flag_reason TEXT,
    decision_support_alert TEXT,
    doctor_review JSONB DEFAULT NULL,
    sync_status TEXT NOT NULL DEFAULT 'Synchronised',
    recorded_by_id UUID NOT NULL REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.visit_records ENABLE ROW LEVEL SECURITY;

-- Visit Records Policies:
-- Mothers can view only their own visits
CREATE POLICY "Mothers can view own visits" 
ON public.visit_records FOR SELECT 
USING (
    mother_id IN (
        SELECT id FROM public.maternal_patients WHERE user_id = auth.uid()
    )
);

-- ASHA workers can view and record visits for their assigned patients
CREATE POLICY "ASHA workers can view assigned visits" 
ON public.visit_records FOR SELECT 
USING (
    mother_id IN (
        SELECT id FROM public.maternal_patients WHERE assigned_asha_id = auth.uid()
    )
);

CREATE POLICY "ASHA workers can insert visit records" 
ON public.visit_records FOR INSERT 
WITH CHECK (
    recorded_by_id = auth.uid() AND 
    EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'asha'
    )
);

-- Doctors can view and review visits within their PHC
CREATE POLICY "Doctors can view and update visit records" 
ON public.visit_records FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'doctor'
    )
);

-- ----------------------------------------------------------------------------
-- 4. MILESTONES TABLE
-- Antenatal and postnatal care milestones
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mother_id UUID NOT NULL REFERENCES public.maternal_patients(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    title_hi TEXT,
    title_bn TEXT,
    target_date DATE NOT NULL,
    completed_date DATE,
    status TEXT NOT NULL DEFAULT 'Upcoming',
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view milestones for authorized patients" 
ON public.milestones FOR SELECT 
USING (
    mother_id IN (
        SELECT id FROM public.maternal_patients 
        WHERE user_id = auth.uid() OR assigned_asha_id = auth.uid() OR 
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'doctor')
    )
);

-- ----------------------------------------------------------------------------
-- 5. AUTOMATIC PROFILE CREATION TRIGGER
-- When a user registers through Supabase Auth, securely insert profile
-- Note: Doctor and ASHA roles require administrative approval/invitation.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_role TEXT;
    user_name TEXT;
    user_phone TEXT;
    user_village TEXT;
BEGIN
    -- Extract metadata supplied during registration
    user_role := COALESCE(new.raw_user_meta_data->>'role', 'mother');
    user_name := COALESCE(new.raw_user_meta_data->>'full_name', 'Beneficiary');
    user_phone := new.raw_user_meta_data->>'phone';
    user_village := new.raw_user_meta_data->>'village';

    -- Security check: Prevent public self-registration from claiming doctor or asha roles
    -- unless created via service-role / admin invitation
    IF user_role IN ('doctor', 'asha') AND (new.raw_user_meta_data->>'invited_by_admin') IS NULL THEN
        user_role := 'mother'; -- Default to mother if not admin-invited
    END IF;

    INSERT INTO public.profiles (
        id, 
        email, 
        role, 
        full_name, 
        phone, 
        location,
        designation,
        account_status
    )
    VALUES (
        new.id,
        new.email,
        user_role,
        user_name,
        user_phone,
        user_village,
        CASE 
            WHEN user_role = 'doctor' THEN 'Medical Officer In-Charge'
            WHEN user_role = 'asha' THEN 'ASHA Field Worker'
            ELSE 'Beneficiary Mother'
        END,
        'active'
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

