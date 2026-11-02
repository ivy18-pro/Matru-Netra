import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, Mother, VisitRecord, Milestone, OfflineQueueItem, Language } from '../types';
import { INITIAL_MOTHERS, INITIAL_VISITS, SUNITA_MILESTONES } from '../data/mockData';
import { authService, RegisterPatientInput, RegisterDoctorInput, RegisterAshaInput } from '../services/authService';

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
const STORAGE_KEY_MOTHERS = 'matru_netra_mothers_v2';
const STORAGE_KEY_VISITS = 'matru_netra_visits_v2';
const STORAGE_KEY_MILESTONES = 'matru_netra_milestones_v2';
const STORAGE_KEY_QUEUE = 'matru_netra_queue_v2';

export const CareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage
  const [mothers, setMothers] = useState<Mother[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MOTHERS);
      return saved ? JSON.parse(saved) : INITIAL_MOTHERS;
    } catch {
      return INITIAL_MOTHERS;
    }
  });

  const [visits, setVisits] = useState<VisitRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VISITS);
      return saved ? JSON.parse(saved) : INITIAL_VISITS;
    } catch {
      return INITIAL_VISITS;
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

  // Field & Clinical states
  const [isOffline, setIsOffline] = useState<boolean>(false);
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
    setMothers((prev) =>
      prev.map((m) => {
        if (m.id === motherId) {
          return {
            ...m,
            preferredLanguage: lang,
            languageOnboardingCompleted: true,
            ashaAssistedOnboarding: {
              assistedBy: ashaName,
              assistedAt: new Date().toISOString(),
              notes: notes || 'Language preference configured with ASHA facilitation'
            }
          };
        }
        return m;
      })
    );
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
      setIsOffline(false);
      if (offlineQueue.length > 0) {
        syncOfflineQueue();
      }
    };
    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [offlineQueue]);

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
      id: user.motherProfileId || `MOM-${Math.floor(100 + Math.random() * 900)}`,
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
      assignedAshaId: 'usr_asha_kalyanpur_01',
      assignedAshaName: 'Anita Devi',
      assignedAshaPhone: '+91 98765-43210',
      assignedDoctorId: 'usr_doc_rampur_01',
      assignedDoctorName: 'Dr. Priya Sharma',
      nextScheduledDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      nextScheduledType: 'ANC-1 Baseline Checkup',
      syncStatus: 'Synchronised'
    };

    setMothers((prev) => [newMotherRecord, ...prev]);
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
    setIsOffline(nextState);

    if (!nextState && offlineQueue.length > 0) {
      syncOfflineQueue();
    }
  };

  const syncOfflineQueue = async () => {
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
    const newId = `VIS-${Date.now().toString().slice(-4)}`;
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

    setMothers((prev) =>
      prev.map((m) => {
        if (m.id === visitData.motherId) {
          const newRisk = autoFlag ? 'high' : m.riskLevel;
          const newReasons = autoReason && !m.riskReasons.includes(autoReason)
            ? [...m.riskReasons, autoReason]
            : m.riskReasons;

          return {
            ...m,
            lastVisitDate: visitData.date,
            gestationalWeeks: visitData.gestationalAgeWeeks,
            riskLevel: newRisk,
            riskReasons: newReasons,
            status: autoFlag ? 'Follow-up required' : 'Completed',
            syncStatus: isOffline ? 'Pending synchronisation' : 'Synchronised'
          };
        }
        return m;
      })
    );

    if (isOffline) {
      setOfflineQueue((prev) => [
        ...prev,
        {
          id: `Q-${Date.now()}`,
          type: 'RECORD_VISIT',
          timestamp: new Date().toISOString(),
          summary: `${visitData.visitType} for ${visitData.motherName}`,
          payload: newRecord,
          status: 'queued'
        }
      ]);
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

    setVisits((prev) =>
      prev.map((v) => {
        if (v.id === visitId) {
          return {
            ...v,
            doctorReview: {
              ...review,
              reviewedBy: reviewerName,
              reviewedAt: new Date().toISOString()
            }
          };
        }
        return v;
      })
    );

    const targetVisit = visits.find((v) => v.id === visitId);
    if (targetVisit) {
      setMothers((prev) =>
        prev.map((m) => {
          if (m.id === targetVisit.motherId) {
            return {
              ...m,
              status: 'Action recorded',
              nextScheduledDate: review.nextDoctorVisitDate || m.nextScheduledDate,
              nextScheduledType: `Doctor Follow-up: ${review.actionCategory}`
            };
          }
          return m;
        })
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
    const newId = `MOM-${(mothers.length + 1).toString().padStart(3, '0')}`;
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
      phcName: 'PHC Rampur',
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
      assignedDoctorId: 'usr_doc_rampur_01',
      assignedDoctorName: 'Dr. Priya Sharma',
      nextScheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      nextScheduledType: 'ANC-1 Complete Baseline Assessment',
      syncStatus: isOffline ? 'Pending synchronisation' : 'Synchronised'
    };

    setMothers((prev) => [newMother, ...prev]);

    if (isOffline) {
      setOfflineQueue((prev) => [
        ...prev,
        {
          id: `Q-${Date.now()}`,
          type: 'REGISTER_MOTHER',
          timestamp: new Date().toISOString(),
          summary: `New Registration: ${newMother.name} (${newMother.village})`,
          payload: newMother,
          status: 'queued'
        }
      ]);
    }
  };

  const resetDemoData = () => {
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
