import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User, UserRole, AccountStatus } from '../types';

export interface AuthSession {
  token: string;
  user: User;
  role: UserRole;
  expiresAt: number;
}

export interface RegisterPatientInput {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  village: string;
  age: number;
  gestationalWeeks?: number;
  lmpDate?: string;
  husbandName?: string;
}

export interface RegisterDoctorInput {
  fullName: string;
  email: string;
  phone: string;
  medicalRegNo: string;
  hospitalAffiliation: string;
  password: string;
}

export interface RegisterAshaInput {
  fullName: string;
  email: string;
  phone: string;
  ashaWorkerId?: string;
  assignedVillage: string;
  associatedPhc: string;
  password: string;
}

interface StoredAccount {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: UserRole;
  fullName: string;
  designation: string;
  location: string;
  phone: string;
  accountStatus: AccountStatus;
  motherProfileId?: string;
  medicalRegNo?: string;
  hospitalAffiliation?: string;
  ashaWorkerId?: string;
  assignedVillage?: string;
  associatedPhc?: string;
  createdAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

const STORAGE_KEY_SESSION = 'matru_netra_auth_session_v2';
const STORAGE_KEY_LOCAL_ACCOUNTS = 'matru_netra_accounts_v2';

// Standard 24-hour session lifetime
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

/**
 * Cryptographic helper to hash passwords using SHA-256 with unique salt
 * Ensures passwords are never stored in plaintext even in local storage
 */
async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(password + '::MN_SALT::' + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate a cryptographically random salt or token
 */
function generateRandomHex(length: number = 16): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Seed initial accredited healthcare accounts into local store if not yet created.
 * Passwords are cryptographically salted and hashed.
 */
async function initializeLocalAccounts(): Promise<StoredAccount[]> {
  const existing = localStorage.getItem(STORAGE_KEY_LOCAL_ACCOUNTS);
  if (existing) {
    try {
      const parsed: StoredAccount[] = JSON.parse(existing);
      // Ensure existing accounts have accountStatus defaulted to active
      const migrated = parsed.map(acc => ({
        ...acc,
        accountStatus: acc.accountStatus || 'active'
      }));
      return migrated;
    } catch {
      // Re-initialize if corrupted
    }
  }

  // Generate salts and hashes for authorized clinical seed profiles
  const docSalt = generateRandomHex(16);
  const ashaSalt = generateRandomHex(16);
  const momSalt = generateRandomHex(16);

  const docHash = await hashPassword('PriyaDoctor#2026', docSalt);
  const ashaHash = await hashPassword('AnitaAsha#2026', ashaSalt);
  const momHash = await hashPassword('SunitaMom#2026', momSalt);

  const initialAccounts: StoredAccount[] = [
    {
      id: 'usr_doc_rampur_01',
      email: 'doctor.priya@matrunetra.gov.in',
      passwordHash: docHash,
      salt: docSalt,
      role: 'doctor',
      fullName: 'Dr. Priya Sharma, MBBS, DGO',
      designation: 'Medical Officer In-Charge',
      location: 'Primary Health Centre (PHC) Rampur',
      phone: '+91 98765-11223',
      accountStatus: 'active',
      medicalRegNo: 'MCI-WB-48291',
      hospitalAffiliation: 'PHC Rampur',
      associatedPhc: 'PHC Rampur',
      createdAt: new Date().toISOString(),
      verifiedAt: new Date().toISOString(),
      verifiedBy: 'State Health Mission West Bengal'
    },
    {
      id: 'usr_asha_kalyanpur_01',
      email: 'asha.anita@matrunetra.gov.in',
      passwordHash: ashaHash,
      salt: ashaSalt,
      role: 'asha',
      fullName: 'Anita Devi',
      designation: 'ASHA Facilitator',
      location: 'Sub-Centre Kalyanpur, PHC Rampur',
      phone: '+91 98765-43210',
      accountStatus: 'active',
      ashaWorkerId: 'ASHA-WB-2041',
      assignedVillage: 'Kalyanpur',
      associatedPhc: 'PHC Rampur',
      createdAt: new Date().toISOString(),
      verifiedAt: new Date().toISOString(),
      verifiedBy: 'Dr. Priya Sharma (MOIC Rampur)'
    },
    {
      id: 'usr_mom_sunita_01',
      email: 'sunita.devi@matrunetra.in',
      passwordHash: momHash,
      salt: momSalt,
      role: 'mother',
      fullName: 'Sunita Devi',
      designation: 'Beneficiary Mother (28 Weeks Pregnant)',
      location: 'Village Kalyanpur, Block Rampur',
      phone: '+91 98765-88990',
      accountStatus: 'active',
      motherProfileId: 'MOM-001',
      createdAt: new Date().toISOString()
    }
  ];

  localStorage.setItem(STORAGE_KEY_LOCAL_ACCOUNTS, JSON.stringify(initialAccounts));
  return initialAccounts;
}


/** Convert a row of the shared `profiles` table into an app User. */
function profileRowToUser(profile: any): User {
  return {
    id: profile.id,
    name: profile.full_name,
    role: profile.role,
    designation: profile.designation || '',
    location: profile.location || '',
    phone: profile.phone,
    avatar: profile.role === 'doctor' ? '🩺' : (profile.role === 'asha' ? '👩‍⚕️' : '🤰'),
    accountStatus: profile.account_status || 'active',
    medicalRegNo: profile.medical_reg_no,
    hospitalAffiliation: profile.hospital_affiliation,
    ashaWorkerId: profile.asha_worker_id,
    assignedVillage: profile.assigned_village,
    associatedPhc: profile.assigned_phc || profile.hospital_affiliation,
    registrationDate: profile.created_at,
    verifiedAt: profile.verified_at,
    verifiedBy: profile.verified_by
  };
}

export const authService = {
  /**
   * Check if Supabase cloud backend is configured
   */
  isCloudConfigured(): boolean {
    return isSupabaseConfigured();
  },

  /**
   * Authenticate a user with email and password, verifying assigned role against intended portal
   */
  async login(email: string, password: string, expectedRole: UserRole): Promise<{ user: User; session: AuthSession }> {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      throw new Error('Please enter both email address and password.');
    }

    // 1. SUPABASE CLOUD AUTHENTICATION (When configured)
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (error || !data.user) {
        throw new Error(error?.message || 'Invalid email or password.');
      }

      // Query the user's role from the protected profiles table
      const { data: profile, error: profileErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileErr || !profile) {
        await supabase.auth.signOut();
        throw new Error('User profile record not found. Please contact administration.');
      }

      // Strictly verify that the authenticated account's assigned role matches the expected role
      if (profile.role !== expectedRole) {
        await supabase.auth.signOut();
        const roleNames: Record<string, string> = {
          doctor: 'Doctor / Medical Officer',
          asha: 'ASHA Field Worker',
          mother: 'Mother / Patient'
        };
        throw new Error(
          `Role Authorization Failed: Your authenticated account is assigned the role '${roleNames[profile.role] || profile.role}'. You cannot access the ${roleNames[expectedRole]} portal with these credentials.`
        );
      }

      const userObj: User = {
        id: profile.id,
        name: profile.full_name,
        role: profile.role,
        designation: profile.designation || '',
        location: profile.location || '',
        phone: profile.phone,
        avatar: profile.role === 'doctor' ? '🩺' : (profile.role === 'asha' ? '👩‍⚕️' : '🤰'),
        accountStatus: profile.account_status || 'active',
        medicalRegNo: profile.medical_reg_no,
        hospitalAffiliation: profile.hospital_affiliation,
        ashaWorkerId: profile.asha_worker_id,
        assignedVillage: profile.assigned_village,
        associatedPhc: profile.assigned_phc || profile.hospital_affiliation,
        registrationDate: profile.created_at,
        verifiedAt: profile.verified_at,
        verifiedBy: profile.verified_by
      };

      const session: AuthSession = {
        token: data.session?.access_token || generateRandomHex(32),
        user: userObj,
        role: profile.role,
        expiresAt: Date.now() + SESSION_DURATION_MS
      };

      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
      return { user: userObj, session };
    }

    // 2. LOCAL SECURE CRYPTOGRAPHIC AUTHENTICATION (When running locally before cloud credentials)
    const accounts = await initializeLocalAccounts();
    const account = accounts.find(acc => acc.email.toLowerCase() === trimmedEmail);

    if (!account) {
      throw new Error('Invalid email or password.');
    }

    // Verify cryptographic password hash
    const computedHash = await hashPassword(trimmedPassword, account.salt);
    if (computedHash !== account.passwordHash) {
      throw new Error('Invalid email or password.');
    }

    // Strictly enforce role verification
    if (account.role !== expectedRole) {
      const roleNames: Record<string, string> = {
        doctor: 'Doctor / Medical Officer',
        asha: 'ASHA Field Worker',
        mother: 'Mother / Patient'
      };
      throw new Error(
        `Role Authorization Failed: This account is registered as '${roleNames[account.role]}'. You are not authorized to access the ${roleNames[expectedRole]} portal with this account.`
      );
    }

    const userObj: User = {
      id: account.id,
      name: account.fullName,
      role: account.role,
      designation: account.designation,
      location: account.location,
      phone: account.phone,
      avatar: account.role === 'doctor' ? '🩺' : (account.role === 'asha' ? '👩‍⚕️' : '🤰'),
      motherProfileId: account.motherProfileId,
      accountStatus: account.accountStatus || 'active',
      medicalRegNo: account.medicalRegNo,
      hospitalAffiliation: account.hospitalAffiliation,
      ashaWorkerId: account.ashaWorkerId,
      assignedVillage: account.assignedVillage,
      associatedPhc: account.associatedPhc,
      registrationDate: account.createdAt,
      verifiedAt: account.verifiedAt,
      verifiedBy: account.verifiedBy
    };

    const session: AuthSession = {
      token: generateRandomHex(32),
      user: userObj,
      role: account.role,
      expiresAt: Date.now() + SESSION_DURATION_MS
    };

    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
    return { user: userObj, session };
  },

  /**
   * Register a new Mother / Patient account
   * Open registration is permitted for mothers, but Doctor and ASHA roles are strictly restricted.
   */
  async registerPatient(input: RegisterPatientInput): Promise<{ user: User; session: AuthSession }> {
    const trimmedEmail = input.email.trim().toLowerCase();
    const trimmedPassword = input.password.trim();

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    if (trimmedPassword.length < 6) {
      throw new Error('Password must be at least 6 characters in length.');
    }
    if (!input.fullName.trim()) {
      throw new Error('Please enter your full name.');
    }
    if (!input.phone.trim() || input.phone.trim().length < 10) {
      throw new Error('Please enter a valid 10-digit mobile number.');
    }

    // 1. SUPABASE CLOUD REGISTRATION
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password: trimmedPassword,
        options: {
          data: {
            role: 'mother', // Force role to mother
            full_name: input.fullName.trim(),
            phone: input.phone.trim(),
            village: input.village.trim(),
          }
        }
      });

      if (error || !data.user) {
        throw new Error(error?.message || 'Failed to complete registration.');
      }

      const userObj: User = {
        id: data.user.id,
        name: input.fullName.trim(),
        role: 'mother',
        designation: 'Registered Mother',
        location: input.village.trim(),
        phone: input.phone.trim(),
        avatar: '🤰',
        accountStatus: 'active'
      };

      const session: AuthSession = {
        token: data.session?.access_token || generateRandomHex(32),
        user: userObj,
        role: 'mother',
        expiresAt: Date.now() + SESSION_DURATION_MS
      };

      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
      return { user: userObj, session };
    }

    // 2. LOCAL SECURE REGISTRATION
    const accounts = await initializeLocalAccounts();
    const exists = accounts.some(acc => acc.email.toLowerCase() === trimmedEmail);
    if (exists) {
      throw new Error('An account with this email address is already registered. Please sign in instead.');
    }

    const salt = generateRandomHex(16);
    const passwordHash = await hashPassword(trimmedPassword, salt);
    const newUserId = 'usr_mom_' + generateRandomHex(8);
    const newMotherProfileId = 'MOM-' + Math.floor(100 + Math.random() * 900);

    const newAccount: StoredAccount = {
      id: newUserId,
      email: trimmedEmail,
      passwordHash,
      salt,
      role: 'mother',
      fullName: input.fullName.trim(),
      designation: `Beneficiary Mother (${input.gestationalWeeks || 12} Weeks Expecting)`,
      location: input.village.trim() || 'Village Rampur',
      phone: input.phone.trim(),
      accountStatus: 'active',
      motherProfileId: newMotherProfileId,
      createdAt: new Date().toISOString()
    };

    accounts.push(newAccount);
    localStorage.setItem(STORAGE_KEY_LOCAL_ACCOUNTS, JSON.stringify(accounts));

    const userObj: User = {
      id: newUserId,
      name: newAccount.fullName,
      role: 'mother',
      designation: newAccount.designation,
      location: newAccount.location,
      phone: newAccount.phone,
      avatar: '🤰',
      accountStatus: 'active',
      motherProfileId: newMotherProfileId
    };

    const session: AuthSession = {
      token: generateRandomHex(32),
      user: userObj,
      role: 'mother',
      expiresAt: Date.now() + SESSION_DURATION_MS
    };

    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
    return { user: userObj, session };
  },

  /**
   * Register a new Doctor / Medical Officer account
   * Creates an account with pending-verification status.
   */
  async registerDoctor(input: RegisterDoctorInput): Promise<{ user: User; session: AuthSession; message: string }> {
    const trimmedEmail = input.email.trim().toLowerCase();
    const trimmedPassword = input.password.trim();
    const trimmedName = input.fullName.trim();
    const trimmedPhone = input.phone.trim();
    const trimmedRegNo = input.medicalRegNo.trim();
    const trimmedFacility = input.hospitalAffiliation.trim();

    if (!trimmedName) throw new Error('Please enter your full name.');
    if (!trimmedEmail || !trimmedEmail.includes('@')) throw new Error('Please enter a valid email address.');
    if (!trimmedPhone || trimmedPhone.replace(/\D/g, '').length < 10) throw new Error('Please enter a valid 10-digit mobile number.');
    if (!trimmedRegNo) throw new Error('Please enter your Medical Registration Number (State/National Council).');
    if (!trimmedFacility) throw new Error('Please enter your assigned Healthcare Facility / PHC.');
    if (trimmedPassword.length < 6) throw new Error('Password must be at least 6 characters in length.');

    const message = `Doctor registration submitted successfully! Your credentials (Medical Reg No: ${trimmedRegNo}) are pending administrative verification by the PHC Medical Superintendent before patient records can be accessed.`;

    // 1. SUPABASE CLOUD REGISTRATION
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password: trimmedPassword,
        options: {
          data: {
            role: 'doctor',
            full_name: trimmedName,
            phone: trimmedPhone,
            medical_reg_no: trimmedRegNo,
            hospital_affiliation: trimmedFacility,
            account_status: 'pending_approval'
          }
        }
      });

      if (error || !data.user) {
        throw new Error(error?.message || 'Failed to submit doctor registration.');
      }

      const userObj: User = {
        id: data.user.id,
        name: trimmedName.startsWith('Dr.') ? trimmedName : `Dr. ${trimmedName}`,
        role: 'doctor',
        designation: 'Medical Officer (Verification Pending)',
        location: trimmedFacility,
        phone: trimmedPhone,
        avatar: '🩺',
        accountStatus: 'pending_approval',
        medicalRegNo: trimmedRegNo,
        hospitalAffiliation: trimmedFacility,
        associatedPhc: trimmedFacility,
        registrationDate: new Date().toISOString()
      };

      const session: AuthSession = {
        token: data.session?.access_token || generateRandomHex(32),
        user: userObj,
        role: 'doctor',
        expiresAt: Date.now() + SESSION_DURATION_MS
      };

      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
      return { user: userObj, session, message };
    }

    // 2. LOCAL SECURE CRYPTOGRAPHIC REGISTRATION
    const accounts = await initializeLocalAccounts();
    const exists = accounts.some(acc => acc.email.toLowerCase() === trimmedEmail);
    if (exists) {
      throw new Error('An account with this email address is already registered. Please sign in instead.');
    }

    const salt = generateRandomHex(16);
    const passwordHash = await hashPassword(trimmedPassword, salt);
    const newUserId = 'usr_doc_' + generateRandomHex(8);

    const newAccount: StoredAccount = {
      id: newUserId,
      email: trimmedEmail,
      passwordHash,
      salt,
      role: 'doctor',
      fullName: trimmedName.startsWith('Dr.') ? trimmedName : `Dr. ${trimmedName}`,
      designation: 'Medical Officer (Verification Pending)',
      location: trimmedFacility,
      phone: trimmedPhone,
      accountStatus: 'pending_approval',
      medicalRegNo: trimmedRegNo,
      hospitalAffiliation: trimmedFacility,
      associatedPhc: trimmedFacility,
      createdAt: new Date().toISOString()
    };

    accounts.push(newAccount);
    localStorage.setItem(STORAGE_KEY_LOCAL_ACCOUNTS, JSON.stringify(accounts));

    const userObj: User = {
      id: newUserId,
      name: newAccount.fullName,
      role: 'doctor',
      designation: newAccount.designation,
      location: newAccount.location,
      phone: newAccount.phone,
      avatar: '🩺',
      accountStatus: 'pending_approval',
      medicalRegNo: trimmedRegNo,
      hospitalAffiliation: trimmedFacility,
      associatedPhc: trimmedFacility,
      registrationDate: newAccount.createdAt
    };

    const session: AuthSession = {
      token: generateRandomHex(32),
      user: userObj,
      role: 'doctor',
      expiresAt: Date.now() + SESSION_DURATION_MS
    };

    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
    return { user: userObj, session, message };
  },

  /**
   * Register a new ASHA Worker account
   * Creates an account with pending-verification status.
   */
  async registerAsha(input: RegisterAshaInput): Promise<{ user: User; session: AuthSession; message: string }> {
    const trimmedEmail = input.email.trim().toLowerCase();
    const trimmedPassword = input.password.trim();
    const trimmedName = input.fullName.trim();
    const trimmedPhone = input.phone.trim();
    const trimmedVillage = input.assignedVillage.trim();
    const trimmedPhc = input.associatedPhc.trim();
    const trimmedId = (input.ashaWorkerId || '').trim();

    if (!trimmedName) throw new Error('Please enter your full name.');
    if (!trimmedEmail || !trimmedEmail.includes('@')) throw new Error('Please enter a valid email address.');
    if (!trimmedPhone || trimmedPhone.replace(/\D/g, '').length < 10) throw new Error('Please enter a valid 10-digit mobile number.');
    if (!trimmedVillage) throw new Error('Please enter your assigned Village / Area.');
    if (!trimmedPhc) throw new Error('Please enter your associated PHC / Health Sub-Centre.');
    if (trimmedPassword.length < 6) throw new Error('Password must be at least 6 characters in length.');

    const message = `ASHA Worker registration submitted successfully! Your account is pending Sub-Centre jurisdiction verification by the PHC Medical Officer before field records can be accessed.`;

    // 1. SUPABASE CLOUD REGISTRATION
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password: trimmedPassword,
        options: {
          data: {
            role: 'asha',
            full_name: trimmedName,
            phone: trimmedPhone,
            asha_worker_id: trimmedId || 'PENDING',
            assigned_village: trimmedVillage,
            associated_phc: trimmedPhc,
            account_status: 'pending_approval'
          }
        }
      });

      if (error || !data.user) {
        throw new Error(error?.message || 'Failed to submit ASHA registration.');
      }

      const userObj: User = {
        id: data.user.id,
        name: trimmedName,
        role: 'asha',
        designation: 'ASHA Field Worker (Verification Pending)',
        location: `${trimmedVillage}, ${trimmedPhc}`,
        phone: trimmedPhone,
        avatar: '👩‍⚕️',
        accountStatus: 'pending_approval',
        ashaWorkerId: trimmedId || undefined,
        assignedVillage: trimmedVillage,
        associatedPhc: trimmedPhc,
        registrationDate: new Date().toISOString()
      };

      const session: AuthSession = {
        token: data.session?.access_token || generateRandomHex(32),
        user: userObj,
        role: 'asha',
        expiresAt: Date.now() + SESSION_DURATION_MS
      };

      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
      return { user: userObj, session, message };
    }

    // 2. LOCAL SECURE CRYPTOGRAPHIC REGISTRATION
    const accounts = await initializeLocalAccounts();
    const exists = accounts.some(acc => acc.email.toLowerCase() === trimmedEmail);
    if (exists) {
      throw new Error('An account with this email address is already registered. Please sign in instead.');
    }

    const salt = generateRandomHex(16);
    const passwordHash = await hashPassword(trimmedPassword, salt);
    const newUserId = 'usr_asha_' + generateRandomHex(8);

    const newAccount: StoredAccount = {
      id: newUserId,
      email: trimmedEmail,
      passwordHash,
      salt,
      role: 'asha',
      fullName: trimmedName,
      designation: 'ASHA Field Worker (Verification Pending)',
      location: `${trimmedVillage}, ${trimmedPhc}`,
      phone: trimmedPhone,
      accountStatus: 'pending_approval',
      ashaWorkerId: trimmedId || `ASHA-PENDING-${Math.floor(1000 + Math.random() * 9000)}`,
      assignedVillage: trimmedVillage,
      associatedPhc: trimmedPhc,
      createdAt: new Date().toISOString()
    };

    accounts.push(newAccount);
    localStorage.setItem(STORAGE_KEY_LOCAL_ACCOUNTS, JSON.stringify(accounts));

    const userObj: User = {
      id: newUserId,
      name: newAccount.fullName,
      role: 'asha',
      designation: newAccount.designation,
      location: newAccount.location,
      phone: newAccount.phone,
      avatar: '👩‍⚕️',
      accountStatus: 'pending_approval',
      ashaWorkerId: newAccount.ashaWorkerId,
      assignedVillage: trimmedVillage,
      associatedPhc: trimmedPhc,
      registrationDate: newAccount.createdAt
    };

    const session: AuthSession = {
      token: generateRandomHex(32),
      user: userObj,
      role: 'asha',
      expiresAt: Date.now() + SESSION_DURATION_MS
    };

    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
    return { user: userObj, session, message };
  },

  /**
   * Retrieve list of accounts pending institutional verification
   */
  async getPendingAccounts(): Promise<User[]> {
    // Shared database: only verified doctors can read other people's profiles
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('account_status', 'pending_approval')
        .in('role', ['doctor', 'asha'])
        .order('created_at', { ascending: true });
      if (error) return [];
      return (data || []).map(profileRowToUser);
    }
    const accounts = await initializeLocalAccounts();
    return accounts
      .filter(acc => acc.accountStatus === 'pending_approval')
      .map(acc => ({
        id: acc.id,
        name: acc.fullName,
        role: acc.role,
        designation: acc.designation,
        location: acc.location,
        phone: acc.phone,
        avatar: acc.role === 'doctor' ? '🩺' : '👩‍⚕️',
        accountStatus: acc.accountStatus,
        medicalRegNo: acc.medicalRegNo,
        hospitalAffiliation: acc.hospitalAffiliation,
        ashaWorkerId: acc.ashaWorkerId,
        assignedVillage: acc.assignedVillage,
        associatedPhc: acc.associatedPhc,
        registrationDate: acc.createdAt
      }));
  },

  /**
   * Institutional approval workflow: Authorize a pending Doctor or ASHA account
   */
  async approveAccount(accountId: string, approvedBy: string): Promise<User> {
    // Shared database: activate the account so the worker can see the shared patient records
    if (isSupabaseConfigured() && supabase) {
      const { data: existing } = await supabase.from('profiles').select('role').eq('id', accountId).maybeSingle();
      const designation = existing?.role === 'doctor' ? 'Verified Medical Officer' : 'Accredited ASHA Field Worker';
      const { data, error } = await supabase
        .from('profiles')
        .update({
          account_status: 'active',
          verified_at: new Date().toISOString(),
          verified_by: approvedBy,
          designation
        })
        .eq('id', accountId)
        .select('*')
        .maybeSingle();
      if (error) throw new Error(error.message || 'Could not approve this account.');
      if (!data) throw new Error('Only a verified doctor can approve accounts, or the account was not found.');
      return profileRowToUser(data);
    }
    const accounts = await initializeLocalAccounts();
    const idx = accounts.findIndex(acc => acc.id === accountId);
    if (idx === -1) {
      throw new Error('Account record not found.');
    }

    const target = accounts[idx];
    target.accountStatus = 'active';
    target.verifiedAt = new Date().toISOString();
    target.verifiedBy = approvedBy;
    if (target.role === 'doctor') {
      target.designation = 'Verified Medical Officer';
    } else if (target.role === 'asha') {
      target.designation = 'Accredited ASHA Field Worker';
    }

    accounts[idx] = target;
    localStorage.setItem(STORAGE_KEY_LOCAL_ACCOUNTS, JSON.stringify(accounts));

    // If current session belongs to this user, update session as well
    const currentSession = await this.getCurrentSession();
    if (currentSession && currentSession.user.id === accountId) {
      currentSession.user.accountStatus = 'active';
      currentSession.user.designation = target.designation;
      currentSession.user.verifiedAt = target.verifiedAt;
      currentSession.user.verifiedBy = target.verifiedBy;
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(currentSession));
    }

    return {
      id: target.id,
      name: target.fullName,
      role: target.role,
      designation: target.designation,
      location: target.location,
      phone: target.phone,
      avatar: target.role === 'doctor' ? '🩺' : '👩‍⚕️',
      accountStatus: 'active',
      medicalRegNo: target.medicalRegNo,
      hospitalAffiliation: target.hospitalAffiliation,
      ashaWorkerId: target.ashaWorkerId,
      assignedVillage: target.assignedVillage,
      associatedPhc: target.associatedPhc,
      registrationDate: target.createdAt,
      verifiedAt: target.verifiedAt,
      verifiedBy: target.verifiedBy
    };
  },

  /**
   * Institutional rejection workflow
   */
  async rejectAccount(accountId: string): Promise<void> {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('profiles').update({ account_status: 'rejected' }).eq('id', accountId);
      if (error) throw new Error(error.message || 'Could not reject this account.');
      return;
    }
    const accounts = await initializeLocalAccounts();
    const idx = accounts.findIndex(acc => acc.id === accountId);
    if (idx !== -1) {
      accounts[idx].accountStatus = 'rejected';
      localStorage.setItem(STORAGE_KEY_LOCAL_ACCOUNTS, JSON.stringify(accounts));
    }
  },

  /**
   * Retrieve and validate the current authenticated session across page refreshes
   */
  async getCurrentSession(): Promise<AuthSession | null> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SESSION);
      if (!stored) return null;

      const session: AuthSession = JSON.parse(stored);
      if (!session || !session.user || !session.expiresAt) {
        localStorage.removeItem(STORAGE_KEY_SESSION);
        return null;
      }

      // Check session expiration
      if (Date.now() > session.expiresAt) {
        localStorage.removeItem(STORAGE_KEY_SESSION);
        return null;
      }

      // If Supabase is active, check Supabase session validity
      if (isSupabaseConfigured() && supabase) {
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          localStorage.removeItem(STORAGE_KEY_SESSION);
          return null;
        }
      }

      return session;
    } catch {
      localStorage.removeItem(STORAGE_KEY_SESSION);
      return null;
    }
  },

  /**
   * Securely sign out the active user and terminate the session
   */
  async logout(): Promise<void> {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut().catch(() => {});
    }
    localStorage.removeItem(STORAGE_KEY_SESSION);
  },

  /**
   * Password recovery request
   */
  async requestPasswordReset(email: string): Promise<string> {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(trimmed, {
        redirectTo: window.location.origin + '/reset-password',
      });
      if (error) throw new Error(error.message);
      return 'Password reset link has been dispatched to your email address.';
    }

    // When in local verification mode
    const accounts = await initializeLocalAccounts();
    const account = accounts.find(a => a.email.toLowerCase() === trimmed);
    if (!account) {
      throw new Error('No registered account was found with this email address.');
    }

    return `Password reset request verified for ${account.fullName}. For institutional security, please contact your District Health Society administrator or PHC Medical Officer to complete credential reissue.`;
  }
};

