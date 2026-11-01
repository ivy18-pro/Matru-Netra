import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User, UserRole } from '../types';

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
  motherProfileId?: string;
  createdAt: string;
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
      return JSON.parse(existing);
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
      createdAt: new Date().toISOString()
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
      createdAt: new Date().toISOString()
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
      motherProfileId: 'MOM-001',
      createdAt: new Date().toISOString()
    }
  ];

  localStorage.setItem(STORAGE_KEY_LOCAL_ACCOUNTS, JSON.stringify(initialAccounts));
  return initialAccounts;
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
        avatar: profile.role === 'doctor' ? '🩺' : (profile.role === 'asha' ? '👩‍⚕️' : '🤰')
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
      motherProfileId: account.motherProfileId
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
        avatar: '🤰'
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

