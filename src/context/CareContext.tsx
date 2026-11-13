import React, { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { User, UserRole, Mother, VisitRecord, Milestone, OfflineQueueItem, Language } from '../types';
import { INITIAL_MOTHERS, INITIAL_VISITS, SUNITA_MILESTONES } from '../data/mockData';
import { authService, RegisterPatientInput, RegisterDoctorInput, RegisterAshaInput } from '../services/authService';
import { recordsService, newRecordId, isRetryableError } from '../services/recordsService';
import {
  overlayPendingChanges,
  RegisterMotherPayload, RecordVisitPayload, DoctorReviewPayload, UpdateMotherPayload
} from '../services/recordMappers';

interface CareContextType {
  currentUser: User | null;
  currentRole: UserRole;
  activeView: 'landing' | 'portal';
  mothers: Mother[];
  visits: VisitRecord[];
  milestones: Milestone[];
  isOffline: boolean;
  offlineQueue: OfflineQueueItem[];
  isSyncing: boolean;
  lastSyncedTime: string;
  language: Language;
  selectedState: string;
  selectedDistrict: string;
  regionModalOpen: boolean;
  audioPlaying: boolean;
  selectedMotherId: string | null;
  loginModalOpen: boolean;
  authModalDefaultRole: UserRole;
  pendingAccounts: User[];

  // Shared central database
  dataMode: 'cloud' | 'local';
  cloudStatus: 'idle' | 'connecting' | 'live' | 'offline' | 'error';
  cloudError: string;
  refreshSharedRecords: () => Promise<void>;
  
  // Real Authentication & Session Actions
  loginWithCredentials: (email: string, password: string, intendedRole: UserRole) => Promise<void>;
  registerMotherPatient: (input: RegisterPatientInput) => Promise<void>;
  registerDoctor: (input: RegisterDoctorInput) => Promise<string>;
  registerAsha: (input: RegisterAshaInput) => Promise<string>;
  approveAccount: (accountId: string) => Promise<void>;
  rejectAccount: (accountId: string) => Promise<void>;
  refreshPendingAccounts: () => Promise<void>;
  logout: () => Promise<void>;
  openLoginForRole: (role: UserRole) => void;
  requestPasswordReset: (email: string) => Promise<string>;
  
  // View & UI Navigation
  setActiveView: (view: 'landing' | 'portal') => void;
  setSelectedMotherId: (id: string | null) => void;
  setLoginModalOpen: (open: boolean) => void;
  setRegionModalOpen: (open: boolean) => void;
  setLanguage: (lang: Language) => void;
  setRegionAndLanguage: (state: string, district: string, lang: Language) => void;
  updateMotherLanguageByAsha: (motherId: string, lang: Language, notes?: string) => void;
  toggleOfflineMode: (force?: boolean) => void;
  syncOfflineQueue: () => Promise<void>;
  toggleAudio: () => void;
  
  // Clinical & Field Workflows
  recordVisit: (visitData: Omit<VisitRecord, 'id' | 'createdAt' | 'syncStatus'>) => void;
  doctorReviewVisit: (visitId: string, review: {
    clinicalNote: string;
    actionCategory: 'Prescription' | 'Diagnostic' | 'Urgent Referral' | 'Routine Monitoring';
    actionDetails: string;
    transportVoucherIssued?: boolean;
    nextDoctorVisitDate?: string;
  }) => void;
  registerMother: (data: {
    name: string;
    age: number;
    husbandName: string;
    village: string;
    phone: string;
    lmpDate: string;
    gravida: number;
    para: number;
    bloodGroup: string;
  }) => void;
  resetDemoData: () => void;
}

const CareContext = createContext<CareContextType | undefined>(undefined);

// LocalStorage Keys
// When the shared cloud database is configured, records live in the cloud and
// these keys hold only an offline read-cache + the not-yet-uploaded queue.
const CLOUD = recordsService.enabled();
const STORAGE_KEY_MOTHERS = CLOUD ? 'matru_netra_cloud_mothers_v1' : 'matru_netra_mothers_v2';
const STORAGE_KEY_VISITS = CLOUD ? 'matru_netra_cloud_visits_v1' : 'matru_netra_visits_v2';
const STORAGE_KEY_MILESTONES = 'matru_netra_milestones_v2';
const STORAGE_KEY_QUEUE = CLOUD ? 'matru_netra_cloud_queue_v1' : 'matru_netra_queue_v2';
const SYNC_POLL_MS = Number(import.meta.env.VITE_SYNC_POLL_MS) || 30000;

export const CareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage
  const [mothers, setMothers] = useState<Mother[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MOTHERS);
      return saved ? JSON.parse(saved) : (CLOUD ? [] : INITIAL_MOTHERS);
    } catch {
      return CLOUD ? [] : INITIAL_MOTHERS;
    }
  });

  const [visits, setVisits] = useState<VisitRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VISITS);
      return saved ? JSON.parse(saved) : (CLOUD ? [] : INITIAL_VISITS);
    } catch {
      return CLOUD ? [] : INITIAL_VISITS;
    }
  });

  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MILESTONES);
      return saved ? JSON.parse(saved) : SUNITA_MILESTONES;
    } catch {
      return SUNITA_MILESTONES;
    }
  });

  const [offlineQueue, setOfflineQueue] = useState<OfflineQueueItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUEUE);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // REAL AUTHENTICATION: Initialized to null and guest. NO demo auto-login!
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>('guest');
  const [activeView, setActiveView] = useState<'landing' | 'portal'>('landing');
  const [authModalDefaultRole, setAuthModalDefaultRole] = useState<UserRole>('asha');
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [pendingAccounts, setPendingAccounts] = useState<User[]>([]);

  // ===== Shared central database engine =====
  const [cloudStatus, setCloudStatus] = useState<'idle' | 'connecting' | 'live' | 'offline' | 'error'>('idle');
  const [cloudError, setCloudError] = useState<string>('');
  const userRef = useRef<User | null>(null);
  const queueRef = useRef<OfflineQueueItem[]>(offlineQueue);
  const isOfflineRef = useRef<boolean>(false);
  const fetchSeqRef = useRef(0);
  const lastWriteRef = useRef(0);
  const syncingRef = useRef(false);
  queueRef.current = offlineQueue;

  // Field & Clinical states
  const [isOffline, setIsOffline] = useState<boolean>(false);
  isOfflineRef.current = isOffline;
  userRef.current = currentUser;
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('Just now');
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      return (localStorage.getItem('matru_netra_language_v2') as Language) || 'hi';
    } catch {
      return 'hi';
    }
  });
  const [selectedState, setSelectedState] = useState<string>(() => {
    try {
      return localStorage.getItem('matru_netra_selected_state_v2') || 'West Bengal';
    } catch {
      return 'West Bengal';
    }
  });
  const [selectedDistrict, setSelectedDistrict] = useState<string>(() => {
    try {
      return localStorage.getItem('matru_netra_selected_district_v2') || 'Nadia';
    } catch {
      return 'Nadia';
    }
  });
  const [regionModalOpen, setRegionModalOpen] = useState<boolean>(false);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [selectedMotherId, setSelectedMotherId] = useState<string | null>(null);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('matru_netra_language_v2', lang);
    } catch (e) {
      console.warn('Could not persist language', e);
    }
  };

  const setRegionAndLanguage = (state: string, district: string, lang: Language) => {
    setSelectedState(state);
    setSelectedDistrict(district);
    setLanguage(lang);
    try {
      localStorage.setItem('matru_netra_selected_state_v2', state);
      localStorage.setItem('matru_netra_selected_district_v2', district);
    } catch (e) {
      console.warn('Could not persist region', e);
    }

    if (currentUser && currentUser.role === 'mother') {
      setMothers((prev) =>
        prev.map((m) => {
          if (m.id === currentUser.motherProfileId || m.id === selectedMotherId) {
            return {
              ...m,
              selectedState: state,
              selectedDistrict: district,
              preferredLanguage: lang,
              languageOnboardingCompleted: true
            };
          }
          return m;
        })
      );
    }
  };

  const updateMotherLanguageByAsha = (motherId: string, lang: Language, notes?: string) => {
    const ashaName = currentUser?.name || 'Anita Devi';
    const patch: Partial<Mother> = {
      preferredLanguage: lang,
      languageOnboardingCompleted: true,
      ashaAssistedOnboarding: {
        assistedBy: ashaName,
        assistedAt: new Date().toISOString(),
        notes: notes || 'Language preference configured with ASHA facilitation'
      }
    };
    setMothers((prev) => prev.map((m) => (m.id === motherId ? { ...m, ...patch } : m)));

    if (CLOUD && currentUser) {
      commitToCloud(
        makeQueueItem('UPDATE_MOTHER', `Language preference updated (${lang.toUpperCase()})`, {
          actorId: currentUser.id,
          motherId,
          patch
        } as UpdateMotherPayload),
        undefined,
        motherId
      );
    }
  };

  // Restore authenticated session on page load across refreshes
  useEffect(() => {
    authService.getCurrentSession().then((session) => {
      if (session) {
        setCurrentUser(session.user);
        setCurrentRole(session.role);
        if (session.user.preferredLanguage) {
          setLanguage(session.user.preferredLanguage);
        }
        if (session.role === 'mother' && session.user.motherProfileId) {
          setSelectedMotherId(session.user.motherProfileId);
        } else {
          setSelectedMotherId('MOM-001');
        }
      } else {
        setCurrentUser(null);
        setCurrentRole('guest');
        setSelectedMotherId(null);
      }
    });
  }, []);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MOTHERS, JSON.stringify(mothers));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [mothers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_VISITS, JSON.stringify(visits));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [visits]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MILESTONES, JSON.stringify(milestones));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [milestones]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUEUE, JSON.stringify(offlineQueue));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [offlineQueue]);

  // Handle hardware online/offline events
  useEffect(() => {
    const handleOnline = () => {
      isOfflineRef.current = false;
      setIsOffline(false);
      if (offlineQueue.length > 0) {
        syncOfflineQueue();
      } else if (CLOUD) {
        void refreshSharedRecords();
      }
    };
    const handleOffline = () => {
      isOfflineRef.current = true;
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [offlineQueue]);

  // ---- Shared database: download + merge ----
  const refreshSharedRecords = useCallback(async () => {
    if (!CLOUD) return;
    const user = userRef.current;
    if (!user || (user.accountStatus && user.accountStatus !== 'active')) return;
    if (isOfflineRef.current || (typeof navigator !== 'undefined' && navigator.onLine === false)) {
      setCloudStatus('offline');
      return;
    }

    const seq = ++fetchSeqRef.current;
    const startedAt = Date.now();
    setCloudStatus((prev) => (prev === 'live' ? 'live' : 'connecting'));
    try {
      const { mothers: sm, visits: sv } = await recordsService.fetchAll();
      // A newer download started, or we saved something while this one was in flight:
      // this snapshot may be stale, so discard it and download again.
      if (seq !== fetchSeqRef.current) return;
      if (lastWriteRef.current > startedAt) {
        setTimeout(() => { void refreshSharedRecords(); }, 250);
        return;
      }
      const merged = overlayPendingChanges(sm, sv, queueRef.current, user.id);
      setMothers(merged.mothers);
      setVisits(merged.visits);
      setCloudStatus('live');
      setCloudError('');
      setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      if (user.role === 'mother') {
        const mine = merged.mothers.find((m) => m.userId === user.id) || merged.mothers[0];
        if (mine) setSelectedMotherId(mine.id);
      }
    } catch (err: any) {
      if (seq !== fetchSeqRef.current) return;
      setCloudStatus(isRetryableError(err) ? 'offline' : 'error');
      setCloudError(err?.message || 'Could not reach the shared database.');
    }
  }, []);

  // Keep this device up to date while signed in: live push + polling + on focus
  useEffect(() => {
    if (!CLOUD || !currentUser) return;
    if (currentUser.accountStatus && currentUser.accountStatus !== 'active') return;

    void refreshSharedRecords();

    let debounce: ReturnType<typeof setTimeout> | undefined;
    const onRemoteChange = () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => { void refreshSharedRecords(); }, 400);
    };
    const unsubscribe = recordsService.subscribe(onRemoteChange);
    const poll = setInterval(() => { void refreshSharedRecords(); }, SYNC_POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === 'visible') void refreshSharedRecords();
    };
    window.addEventListener('focus', onVisible);
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      clearTimeout(debounce);
      clearInterval(poll);
      unsubscribe();
      window.removeEventListener('focus', onVisible);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [currentUser?.id, currentUser?.accountStatus, refreshSharedRecords]);

  // ---- Shared database: upload (or queue when offline) ----
  const makeQueueItem = (type: OfflineQueueItem['type'], summary: string, payload: any): OfflineQueueItem => ({
    id: `Q-${newRecordId()}`,
    type,
    timestamp: new Date().toISOString(),
    summary,
    payload,
    status: 'queued'
  });

  const uploadQueueItem = async (item: OfflineQueueItem): Promise<void> => {
    switch (item.type) {
      case 'REGISTER_MOTHER': {
        const p = item.payload as RegisterMotherPayload;
        await recordsService.registerMother(p.mother, p.actorId);
        break;
      }
      case 'RECORD_VISIT': {
        const p = item.payload as RecordVisitPayload;
        await recordsService.recordVisit(p.visit, p.motherPatch, p.actorId);
        break;
      }
      case 'DOCTOR_REVIEW': {
        const p = item.payload as DoctorReviewPayload;
        await recordsService.saveDoctorReview(p.visitId, p.review, p.motherId, p.motherPatch);
        break;
      }
      case 'UPDATE_MOTHER': {
        const p = item.payload as UpdateMotherPayload;
        await recordsService.updateMother(p.motherId, p.patch);
        break;
      }
      default:
        break;
    }
  };

  const markRecordsPending = (visitId?: string, motherId?: string) => {
    if (visitId) {
      setVisits((prev) => prev.map((v) => (v.id === visitId ? { ...v, syncStatus: 'Pending synchronisation' } : v)));
    }
    if (motherId) {
      setMothers((prev) => prev.map((m) => (m.id === motherId ? { ...m, syncStatus: 'Pending synchronisation' } : m)));
    }
  };

  /** Send a change to the shared database now, or keep it in the offline queue until we can. */
  const commitToCloud = (item: OfflineQueueItem, visitId?: string, motherId?: string) => {
    if (isOfflineRef.current || (typeof navigator !== 'undefined' && navigator.onLine === false)) {
      setOfflineQueue((prev) => [...prev, item]);
      markRecordsPending(visitId, motherId);
      return;
    }
    lastWriteRef.current = Date.now();
    uploadQueueItem(item)
      .then(() => {
        lastWriteRef.current = Date.now();
        setCloudStatus('live');
        setCloudError('');
        setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      })
      .catch((err: any) => {
        lastWriteRef.current = Date.now();
        if (isRetryableError(err)) {
          setOfflineQueue((prev) => [...prev, item]);
          setCloudStatus('offline');
        } else {
          setOfflineQueue((prev) => [...prev, { ...item, status: 'failed', error: err?.message }]);
          setCloudStatus('error');
          setCloudError(err?.message || 'The shared database rejected this change.');
        }
        markRecordsPending(visitId, motherId);
      });
  };

  // Audio synthesizer for ambient village mood
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const toggleAudio = () => {
    if (!audioPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
        masterGain.connect(ctx.destination);

        const freqs = [261.63, 329.63, 392.00, 523.25];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.value = 450 + idx * 80;

          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.value = 0.2 + idx * 0.1;
          lfoGain.gain.value = 2.0;
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();

          osc.type = 'sine';
          osc.frequency.value = freq;
          osc.connect(filter);
          filter.connect(masterGain);
          osc.start();
        });

        setAudioContext(ctx);
        setAudioPlaying(true);
      } catch (e) {
        console.warn('Audio playback error', e);
      }
    } else {
      if (audioContext) {
        audioContext.close().catch(() => {});
        setAudioContext(null);
      }
      setAudioPlaying(false);
    }
  };

  /**
   * Real Authentication: Authenticates against back end / secure cryptographic store,
   * verifying role permissions strictly.
   */
  const loginWithCredentials = async (email: string, password: string, intendedRole: UserRole) => {
    const { user, session } = await authService.login(email, password, intendedRole);
    setCurrentUser(user);
    setCurrentRole(session.role);
    setActiveView('portal');
    setLoginModalOpen(false);

    if (session.role === 'mother') {
      setSelectedMotherId(user.motherProfileId || 'MOM-001');
    } else {
      setSelectedMotherId('MOM-001');
    }
  };

  /**
   * Real Patient Registration: Registers a new expectant mother
   */
  const registerMotherPatient = async (input: RegisterPatientInput) => {
    const { user, session } = await authService.registerPatient(input);
    
    // Create new patient record for this mother in state
    const edd = new Date();
    edd.setDate(edd.getDate() + (40 - (input.gestationalWeeks || 12)) * 7);

    const newMotherRecord: Mother = {
      id: CLOUD ? newRecordId() : (user.motherProfileId || `MOM-${Math.floor(100 + Math.random() * 900)}`),
      userId: CLOUD ? user.id : undefined,
      name: input.fullName,
      age: input.age || 24,
      husbandName: input.husbandName || '',
      village: input.village || 'Rampur',
      subCentre: 'Sub-Centre Kalyanpur',
      phcName: 'PHC Rampur',
      phone: input.phone,
      lmpDate: input.lmpDate || new Date(Date.now() - (input.gestationalWeeks || 12) * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      eddDate: edd.toISOString().split('T')[0],
      gestationalWeeks: input.gestationalWeeks || 12,
      gravida: 1,
      para: 0,
      bloodGroup: 'B Positive',
      riskLevel: 'normal',
      riskReasons: [],
      status: 'Scheduled',
      assignedAshaId: CLOUD ? '' : 'usr_asha_kalyanpur_01',
      assignedAshaName: CLOUD ? 'To be assigned' : 'Anita Devi',
      assignedAshaPhone: CLOUD ? '' : '+91 98765-43210',
      assignedDoctorId: CLOUD ? '' : 'usr_doc_rampur_01',
      assignedDoctorName: CLOUD ? 'PHC Medical Officer' : 'Dr. Priya Sharma',
      nextScheduledDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      nextScheduledType: 'ANC-1 Baseline Checkup',
      syncStatus: 'Synchronised'
    };

    setMothers((prev) => [newMotherRecord, ...prev]);
    if (CLOUD) {
      commitToCloud(
        makeQueueItem('REGISTER_MOTHER', `Self-registration: ${newMotherRecord.name}`, {
          actorId: user.id,
          mother: newMotherRecord
        } as RegisterMotherPayload),
        undefined,
        newMotherRecord.id
      );
    }
    setCurrentUser(user);
    setCurrentRole('mother');
    setSelectedMotherId(newMotherRecord.id);
    setActiveView('portal');
    setLoginModalOpen(false);
  };

  /**
   * Real Doctor Registration: Registers a new Medical Officer
   * Account starts in pending_approval status awaiting administrative verification.
   */
  const registerDoctor = async (input: RegisterDoctorInput): Promise<string> => {
    const { user, message } = await authService.registerDoctor(input);
    setCurrentUser(user);
    setCurrentRole('doctor');
    setActiveView('portal');
    setLoginModalOpen(false);
    await refreshPendingAccounts();
    return message;
  };

  /**
   * Real ASHA Worker Registration: Registers a frontline health worker
   * Account starts in pending_approval status awaiting Sub-Centre / PHC verification.
   */
  const registerAsha = async (input: RegisterAshaInput): Promise<string> => {
    const { user, message } = await authService.registerAsha(input);
    setCurrentUser(user);
    setCurrentRole('asha');
    setActiveView('portal');
    setLoginModalOpen(false);
    await refreshPendingAccounts();
    return message;
  };

  /**
   * Fetch all accounts awaiting institutional verification
   */
  const refreshPendingAccounts = async () => {
    try {
      const list = await authService.getPendingAccounts();
      setPendingAccounts(list);
    } catch (e) {
      console.warn('Could not refresh pending accounts:', e);
    }
  };

  /**
   * Administrative Approval Workflow
   */
  const approveAccount = async (accountId: string): Promise<void> => {
    const approver = currentUser?.name || 'Dr. Priya Sharma (Medical Officer In-Charge)';
    const updatedUser = await authService.approveAccount(accountId, approver);
    if (currentUser?.id === accountId) {
      setCurrentUser(updatedUser);
    }
    await refreshPendingAccounts();
  };

  /**
   * Administrative Rejection Workflow
   */
  const rejectAccount = async (accountId: string): Promise<void> => {
    await authService.rejectAccount(accountId);
    if (currentUser?.id === accountId) {
      await logout();
    }
    await refreshPendingAccounts();
  };

  useEffect(() => {
    refreshPendingAccounts();
  }, [currentUser]);

  /**
   * Real Sign Out: Clears active session and revokes access to clinical dashboards
   */
  const logout = async () => {
    await authService.logout();
    if (CLOUD) {
      // Never leave one worker's patient list on the screen / device for the next person
      setMothers([]);
      setVisits([]);
      setCloudStatus('idle');
      setCloudError('');
      try {
        localStorage.removeItem(STORAGE_KEY_MOTHERS);
        localStorage.removeItem(STORAGE_KEY_VISITS);
      } catch { /* ignore */ }
    }
    setCurrentUser(null);
    setCurrentRole('guest');
    setSelectedMotherId(null);
    setActiveView('landing');
  };

  /**
   * Helper to open the login modal focused on a specific intended role
   */
  const openLoginForRole = (role: UserRole) => {
    // If user is already authenticated with this role, take them directly to portal
    if (currentUser && currentRole === role) {
      setActiveView('portal');
      return;
    }
    setAuthModalDefaultRole(role);
    setLoginModalOpen(true);
  };

  const requestPasswordReset = async (email: string) => {
    return authService.requestPasswordReset(email);
  };

  const toggleOfflineMode = (force?: boolean) => {
    const nextState = force !== undefined ? force : !isOffline;
    isOfflineRef.current = nextState;
    setIsOffline(nextState);

    if (!nextState) {
      if (offlineQueue.length > 0) {
        syncOfflineQueue();
      } else if (CLOUD) {
        void refreshSharedRecords();
      }
    }
  };

  const syncOfflineQueue = async () => {
    // ---- Shared database: really upload everything that was saved offline ----
    if (CLOUD) {
      const user = userRef.current;
      if (syncingRef.current) return;
      if (!user) return;
      const pending = queueRef.current;
      if (pending.length === 0) {
        await refreshSharedRecords();
        return;
      }
      syncingRef.current = true;
      setIsSyncing(true);
      lastWriteRef.current = Date.now();

      const remaining: OfflineQueueItem[] = [];
      let blocked = false; // stop at the first network failure so order is preserved
      for (const item of pending) {
        const belongsToOther = item.payload?.actorId && item.payload.actorId !== user.id;
        if (blocked || belongsToOther || item.status === 'failed') {
          remaining.push(item);
          continue;
        }
        try {
          await uploadQueueItem(item);
        } catch (err: any) {
          if (isRetryableError(err)) {
            blocked = true;
            remaining.push(item);
          } else {
            remaining.push({ ...item, status: 'failed', error: err?.message || 'Rejected by the shared database' });
            setCloudError(err?.message || 'The shared database rejected a saved change.');
          }
        }
      }

      queueRef.current = remaining;
      setOfflineQueue(remaining);
      lastWriteRef.current = Date.now();
      setIsSyncing(false);
      syncingRef.current = false;
      setCloudStatus(blocked ? 'offline' : remaining.some((q) => q.status === 'failed') ? 'error' : 'live');
      await refreshSharedRecords();
      return;
    }

    // ---- Local demo mode (no shared database configured) ----
    if (offlineQueue.length === 0) return;
    setIsSyncing(true);

    await new Promise((resolve) => setTimeout(resolve, 1400));

    setVisits((prev) =>
      prev.map((v) => ({ ...v, syncStatus: 'Synchronised' }))
    );
    setMothers((prev) =>
      prev.map((m) => ({ ...m, syncStatus: 'Synchronised' }))
    );

    setOfflineQueue([]);
    setIsSyncing(false);
    const now = new Date();
    setLastSyncedTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  const recordVisit = (visitData: Omit<VisitRecord, 'id' | 'createdAt' | 'syncStatus'>) => {
    const newId = CLOUD ? newRecordId() : `VIS-${Date.now().toString().slice(-4)}`;
    const syncStatus = isOffline ? 'Pending synchronisation' : 'Synchronised';
    
    let decisionAlert: string | undefined = undefined;
    let autoFlag = visitData.flaggedForDoctor;
    let autoReason = visitData.flagReason;

    if (visitData.bpSystolic >= 140 || visitData.bpDiastolic >= 90) {
      decisionAlert = `MoHFW Guideline Alert: Elevated BP (${visitData.bpSystolic}/${visitData.bpDiastolic} mmHg) at ${visitData.gestationalAgeWeeks}w. Recommend PHC Medical Officer screening for gestational hypertension / pre-eclampsia.`;
      autoFlag = true;
      autoReason = autoReason || `Hypertension screening trigger (BP ${visitData.bpSystolic}/${visitData.bpDiastolic})`;
    } else if (visitData.hemoglobin < 9.0) {
      decisionAlert = `MoHFW Guideline Alert: Hemoglobin ${visitData.hemoglobin} g/dL indicates severe anemia requiring clinical review and injectable iron sucrose consideration.`;
      autoFlag = true;
      autoReason = autoReason || `Severe Anemia trigger (Hb ${visitData.hemoglobin} g/dL)`;
    } else if (visitData.dangerSignsReported.length > 0) {
      decisionAlert = `MoHFW Red-Flag Alert: Warning signs detected: ${visitData.dangerSignsReported.join(', ')}. Direct referral to PHC Doctor required.`;
      autoFlag = true;
      autoReason = autoReason || `Reported Warning Signs: ${visitData.dangerSignsReported.join(', ')}`;
    }

    const newRecord: VisitRecord = {
      ...visitData,
      id: newId,
      flaggedForDoctor: autoFlag,
      flagReason: autoReason,
      decisionSupportAlert: decisionAlert,
      syncStatus,
      createdAt: new Date().toISOString()
    };

    setVisits((prev) => [newRecord, ...prev]);

    const target = mothers.find((m) => m.id === visitData.motherId);
    const existingReasons = target?.riskReasons ?? [];
    const motherPatch: Partial<Mother> = {
      lastVisitDate: visitData.date,
      gestationalWeeks: visitData.gestationalAgeWeeks,
      riskLevel: autoFlag ? 'high' : (target?.riskLevel ?? 'normal'),
      riskReasons: autoReason && !existingReasons.includes(autoReason) ? [...existingReasons, autoReason] : existingReasons,
      status: autoFlag ? 'Follow-up required' : 'Completed'
    };

    setMothers((prev) =>
      prev.map((m) =>
        m.id === visitData.motherId
          ? { ...m, ...motherPatch, syncStatus: isOffline ? 'Pending synchronisation' : 'Synchronised' }
          : m
      )
    );

    const queueItem = makeQueueItem('RECORD_VISIT', `${visitData.visitType} for ${visitData.motherName}`, {
      actorId: currentUser?.id || '',
      visit: newRecord,
      motherPatch
    } as RecordVisitPayload);

    if (CLOUD) {
      if (currentUser) commitToCloud(queueItem, newRecord.id, visitData.motherId);
    } else if (isOffline) {
      setOfflineQueue((prev) => [...prev, queueItem]);
    }
  };

  const doctorReviewVisit = (
    visitId: string, 
    review: {
      clinicalNote: string;
      actionCategory: 'Prescription' | 'Diagnostic' | 'Urgent Referral' | 'Routine Monitoring';
      actionDetails: string;
      transportVoucherIssued?: boolean;
      nextDoctorVisitDate?: string;
    }
  ) => {
    const reviewerName = currentUser?.name || 'Dr. Priya Sharma, MBBS, DGO';
    const fullReview = {
      ...review,
      reviewedBy: reviewerName,
      reviewedAt: new Date().toISOString()
    };

    setVisits((prev) =>
      prev.map((v) => (v.id === visitId ? { ...v, doctorReview: fullReview } : v))
    );

    const targetVisit = visits.find((v) => v.id === visitId);
    if (targetVisit) {
      const targetMother = mothers.find((m) => m.id === targetVisit.motherId);
      const motherPatch: Partial<Mother> = {
        status: 'Action recorded',
        nextScheduledDate: review.nextDoctorVisitDate || targetMother?.nextScheduledDate || '',
        nextScheduledType: `Doctor Follow-up: ${review.actionCategory}`
      };
      setMothers((prev) =>
        prev.map((m) => (m.id === targetVisit.motherId ? { ...m, ...motherPatch } : m))
      );

      if (CLOUD && currentUser) {
        commitToCloud(
          makeQueueItem('DOCTOR_REVIEW', `Doctor review for ${targetVisit.motherName}`, {
            actorId: currentUser.id,
            visitId,
            motherId: targetVisit.motherId,
            review: fullReview,
            motherPatch
          } as DoctorReviewPayload),
          visitId,
          targetVisit.motherId
        );
      }
    } else if (CLOUD && currentUser) {
      commitToCloud(
        makeQueueItem('DOCTOR_REVIEW', 'Doctor review', {
          actorId: currentUser.id,
          visitId,
          review: fullReview
        } as DoctorReviewPayload),
        visitId
      );
    }
  };

  const registerMother = (data: {
    name: string;
    age: number;
    husbandName: string;
    village: string;
    phone: string;
    lmpDate: string;
    gravida: number;
    para: number;
    bloodGroup: string;
  }) => {
    const newId = CLOUD ? newRecordId() : `MOM-${(mothers.length + 1).toString().padStart(3, '0')}`;
    const lmp = new Date(data.lmpDate);
    const edd = new Date(lmp);
    edd.setDate(edd.getDate() + 280);

    const now = new Date();
    const diffWeeks = Math.max(1, Math.min(42, Math.floor((now.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24 * 7))));

    const newMother: Mother = {
      id: newId,
      name: data.name,
      age: data.age,
      husbandName: data.husbandName,
      village: data.village,
      subCentre: currentUser?.location?.includes('Sub-Centre') ? currentUser.location : 'Sub-Centre Kalyanpur',
      phcName: (CLOUD && currentUser?.associatedPhc) || 'PHC Rampur',
      phone: data.phone,
      lmpDate: data.lmpDate,
      eddDate: edd.toISOString().split('T')[0],
      gestationalWeeks: diffWeeks,
      gravida: data.gravida,
      para: data.para,
      bloodGroup: data.bloodGroup,
      riskLevel: 'normal',
      riskReasons: [],
      status: 'Due',
      assignedAshaId: currentUser?.id || 'usr_asha_kalyanpur_01',
      assignedAshaName: currentUser?.name || 'Anita Devi',
      assignedAshaPhone: currentUser?.phone || '+91 98765-43210',
      assignedDoctorId: CLOUD ? '' : 'usr_doc_rampur_01',
      assignedDoctorName: CLOUD ? 'PHC Medical Officer' : 'Dr. Priya Sharma',
      nextScheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      nextScheduledType: 'ANC-1 Complete Baseline Assessment',
      syncStatus: isOffline ? 'Pending synchronisation' : 'Synchronised'
    };

    setMothers((prev) => [newMother, ...prev]);

    const queueItem = makeQueueItem('REGISTER_MOTHER', `New Registration: ${newMother.name} (${newMother.village})`, {
      actorId: currentUser?.id || '',
      mother: newMother
    } as RegisterMotherPayload);

    if (CLOUD) {
      if (currentUser) commitToCloud(queueItem, undefined, newMother.id);
    } else if (isOffline) {
      setOfflineQueue((prev) => [...prev, queueItem]);
    }
  };

  const resetDemoData = () => {
    if (CLOUD) {
      // The shared database holds REAL patient data: never wipe it from a button.
      void refreshSharedRecords();
      return;
    }
    localStorage.removeItem(STORAGE_KEY_MOTHERS);
    localStorage.removeItem(STORAGE_KEY_VISITS);
    localStorage.removeItem(STORAGE_KEY_MILESTONES);
    localStorage.removeItem(STORAGE_KEY_QUEUE);
    setMothers(INITIAL_MOTHERS);
    setVisits(INITIAL_VISITS);
    setMilestones(SUNITA_MILESTONES);
    setOfflineQueue([]);
    setIsOffline(false);
    setSelectedMotherId(null);
  };

  return (
    <CareContext.Provider
      value={{
        currentUser,
        currentRole,
        activeView,
        mothers,
        visits,
        milestones,
        isOffline,
        offlineQueue,
        isSyncing,
        lastSyncedTime,
        language,
        selectedState,
        selectedDistrict,
        regionModalOpen,
        audioPlaying,
        selectedMotherId,
        loginModalOpen,
        authModalDefaultRole,
        pendingAccounts,
        dataMode: CLOUD ? 'cloud' : 'local',
        cloudStatus,
        cloudError,
        refreshSharedRecords,
        loginWithCredentials,
        registerMotherPatient,
        registerDoctor,
        registerAsha,
        approveAccount,
        rejectAccount,
        refreshPendingAccounts,
        logout,
        openLoginForRole,
        requestPasswordReset,
        setActiveView,
        setSelectedMotherId,
        setLoginModalOpen,
        setRegionModalOpen,
        setLanguage,
        setRegionAndLanguage,
        updateMotherLanguageByAsha,
        toggleOfflineMode,
        syncOfflineQueue,
        toggleAudio,
        recordVisit,
        doctorReviewVisit,
        registerMother,
        resetDemoData
      }}
    >
      {children}
    </CareContext.Provider>
  );
};

export const useCare = (): CareContextType => {
  const context = useContext(CareContext);
  if (!context) {
    throw new Error('useCare must be used within a CareProvider');
  }
  return context;
};
