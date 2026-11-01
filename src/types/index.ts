export type UserRole = 'guest' | 'asha' | 'doctor' | 'mother';

export type Language = 
  | 'en' // English
  | 'hi' // हिन्दी (Hindi)
  | 'bn' // বাংলা (Bengali)
  | 'or' // ଓଡ଼ିଆ (Odia)
  | 'mr' // मराठी (Marathi)
  | 'ta' // தமிழ் (Tamil)
  | 'te' // తెలుగు (Telugu)
  | 'gu' // ગુજરાતી (Gujarati)
  | 'pa' // ਪੰਜਾਬੀ (Punjabi)
  | 'ml' // മലയാളം (Malayalam)
  | 'as'; // অসমীয়া (Assamese)

export type RiskLevel = 'normal' | 'moderate' | 'high';

export type RecordStatus = 
  | 'Scheduled' 
  | 'Due' 
  | 'Completed' 
  | 'Follow-up required' 
  | 'Under review' 
  | 'Action recorded' 
  | 'Pending synchronisation' 
  | 'Synchronised';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  designation: string;
  location: string;
  phone?: string;
  avatar?: string;
  motherProfileId?: string; // If role is mother
  preferredLanguage?: Language;
  selectedState?: string;
  selectedDistrict?: string;
  languageOnboardingCompleted?: boolean;
}

export interface Mother {
  id: string;
  name: string;
  age: number;
  husbandName: string;
  village: string;
  subCentre: string;
  phcName: string;
  phone: string;
  lmpDate: string; // Last menstrual period
  eddDate: string; // Estimated due date
  gestationalWeeks: number;
  gravida: number; // number of pregnancies
  para: number; // number of deliveries
  bloodGroup: string;
  riskLevel: RiskLevel;
  riskReasons: string[];
  status: RecordStatus;
  assignedAshaId: string;
  assignedAshaName: string;
  assignedAshaPhone: string;
  assignedDoctorId: string;
  assignedDoctorName: string;
  lastVisitDate?: string;
  nextScheduledDate: string;
  nextScheduledType: string;
  syncStatus: 'Synchronised' | 'Pending synchronisation';
  preferredLanguage?: Language;
  selectedState?: string;
  selectedDistrict?: string;
  languageOnboardingCompleted?: boolean;
  ashaAssistedOnboarding?: {
    assistedBy: string;
    assistedAt: string;
    notes?: string;
  };
  babyDetails?: {
    isDelivered: boolean;
    deliveryDate?: string;
    gender?: 'Baby Boy' | 'Baby Girl';
    babyName?: string;
    birthWeightKg?: number;
    immunizationStatus?: string;
  };
}

export interface VisitRecord {
  id: string;
  motherId: string;
  motherName: string;
  visitType: string; // e.g. "ANC-1", "ANC-2", "ANC-3", "ANC-4", "PNC-1", "PNC-3", "PNC-7", "PNC-14", "PNC-28"
  date: string;
  gestationalAgeWeeks: number;
  bpSystolic: number;
  bpDiastolic: number;
  weightKg: number;
  hemoglobin: number; // g/dL
  fetalHeartRate?: number; // bpm
  babyTempCelsius?: number; // for PNC
  dangerSignsReported: string[];
  ashaObservations: string;
  flaggedForDoctor: boolean;
  flagReason?: string;
  decisionSupportAlert?: string;
  doctorReview?: {
    reviewedBy: string;
    reviewedAt: string;
    clinicalNote: string;
    actionCategory: 'Prescription' | 'Diagnostic' | 'Urgent Referral' | 'Routine Monitoring';
    actionDetails: string;
    transportVoucherIssued?: boolean;
    nextDoctorVisitDate?: string;
  };
  syncStatus: 'Synchronised' | 'Pending synchronisation';
  recordedBy: string;
  createdAt: string;
}

export interface Milestone {
  id: string;
  motherId: string;
  title: string;
  stageName: string;
  timing: string;
  status: 'Scheduled' | 'Due' | 'Completed' | 'Follow-up required';
  dueDate: string;
  completedDate?: string;
  description: string;
  isPnc: boolean;
  keyChecks: string[];
}

export interface OfflineQueueItem {
  id: string;
  type: 'RECORD_VISIT' | 'REGISTER_MOTHER' | 'DOCTOR_REVIEW' | 'UPDATE_MILESTONE';
  timestamp: string;
  summary: string;
  payload: any;
  status: 'queued' | 'syncing' | 'synced' | 'failed';
}
