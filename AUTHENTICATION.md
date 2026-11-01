# MATRU-NETRA: Real User Authentication & Role-Based Access Control (RBAC)

This document describes the authentication architecture, security policies, and configuration instructions for MATRU-NETRA.

---

## 1. Overview & Architecture

All demo login bypasses, hardcoded demo accounts, role-switcher shortcuts, and mock credential fillers have been completely removed. The application now enforces **strict Role-Based Access Control (RBAC)** across three distinct personas:

1. **Doctor / PHC** (`role: 'doctor'`): Clinical triage queue, longitudinal vitals analysis, referral approvals.
2. **ASHA Worker** (`role: 'asha'`): Doorstep antenatal/postnatal care recorder, high-risk flagging, offline syncing.
3. **Mother / Patient** (`role: 'mother'`): Beneficiary health dashboard, growth countdown, doctor prescriptions.

```
┌────────────────────────────────────────────────────────┐
│               MATRU-NETRA Auth Gateway                 │
│      (Selects Intended Portal Flow: Doctor/ASHA/Mother)│
└──────────────────────────┬─────────────────────────────┘
                           │
             Credentials Entered & Verified
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│           authService.login(email, pass, role)         │
│  - Verifies Password against Cryptographic Hash        │
│  - Verifies Account Role matches Intended Portal       │
│  - Rejects Mismatches ("Role Authorization Failed")    │
│  - Generates Secure Session Token with Expiry          │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│            Authenticated Session & RBAC                │
│  - Session restored across page refreshes              │
│  - Unauthenticated access to portals strictly blocked  │
│  - Sign-out invalidates and clears active session      │
└────────────────────────────────────────────────────────┘
```

---

## 2. Authentication Modes

MATRU-NETRA supports two seamless operational modes:

### Mode A: Supabase Cloud Authentication (Production)
When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are configured in `.env`:
- Authenticates directly against Supabase Auth (`supabase.auth.signInWithPassword`, `supabase.auth.signUp`).
- Enforces PostgreSQL Row-Level Security (RLS) policies using [supabase/schema.sql](file:///c:/Users/Ivy%20Kundu/OneDrive/Desktop/Matru-Netra/supabase/schema.sql).
- Stores user roles in the protected `public.profiles` table with database triggers preventing role escalation.

### Mode B: Local Cryptographic Auth Engine (Local / Offline Testing)
When external cloud credentials are not yet set:
- Passwords are **never stored in plaintext**.
- Uses the **W3C Web Crypto API** (`crypto.subtle.digest('SHA-256')`) with random 16-byte cryptographic salts to verify passwords.
- Validates session tokens and timestamps in `localStorage`.
- Strictly validates role authorization (e.g. entering a Mother's credentials in the Doctor portal is rejected with an explicit Role Authorization Error).

---

## 3. Provisioned Accounts for Testing

The following accredited healthcare accounts are provisioned in the secure local cryptographic database for evaluation:

| Role | Email | Password | Assigned Jurisdiction |
| :--- | :--- | :--- | :--- |
| **Doctor / PHC** | `doctor.priya@matrunetra.gov.in` | `PriyaDoctor#2026` | PHC Rampur |
| **ASHA Worker** | `asha.anita@matrunetra.gov.in` | `AnitaAsha#2026` | Sub-Centre Kalyanpur |
| **Mother / Patient** | `sunita.devi@matrunetra.in` | `SunitaMom#2026` | Village Kalyanpur (28w) |

> **Note**: You can also register a **brand new patient account** at any time by selecting the **Mother** tab in the Sign In dialog and clicking **"Register Here"**.

---

## 4. How to Connect to Supabase (Optional Cloud Setup)

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com) and create a free project.
2. **Apply Database Schema & RLS Policies**:
   - In your Supabase Dashboard, open the **SQL Editor**.
   - Copy and execute the contents of [supabase/schema.sql](file:///c:/Users/Ivy%20Kundu/OneDrive/Desktop/Matru-Netra/supabase/schema.sql).
3. **Configure Environment Variables**:
   - Create a `.env` file in the project root based on [.env.example](file:///c:/Users/Ivy%20Kundu/OneDrive/Desktop/Matru-Netra/.env.example):
     ```env
     VITE_SUPABASE_URL=https://your-project-id.supabase.co
     VITE_SUPABASE_ANON_KEY=your-actual-anon-public-key
     ```
4. **Restart Vite Dev Server**:
   ```bash
   npm run build
   ```

