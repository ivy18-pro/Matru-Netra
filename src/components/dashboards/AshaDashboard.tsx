import React, { useState } from 'react';
import { useCare } from '../../context/CareContext';
import { Mother, VisitRecord, Language } from '../../types';
import { 
  Users, 
  UserPlus, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Filter, 
  Search, 
  ChevronRight, 
  FileText, 
  Plus, 
  Heart,
  Baby,
  Activity,
  Globe,
  MapPin,
  Languages,
  Check,
  Edit3,
  Volume2,
  X
} from 'lucide-react';
import { RecordVisitModal } from '../modals/RecordVisitModal';
import { RegisterMotherModal } from '../modals/RegisterMotherModal';
import { SUPPORTED_LANGUAGES, t } from '../../i18n/translations';
import { INDIA_STATES_DATA, getSuggestedLanguagesForRegion } from '../../data/indiaGeoData';

export const AshaDashboard: React.FC = () => {
  const { 
    mothers, 
    visits, 
    currentUser, 
    isOffline, 
    offlineQueue, 
    syncOfflineQueue, 
    isSyncing, 
    selectedMotherId, 
    setSelectedMotherId,
    toggleOfflineMode,
    updateMotherLanguageByAsha,
    language,
    setLanguage
  } = useCare();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('All');
  const [filterRiskOnly, setFilterRiskOnly] = useState(false);
  const [recordVisitModalOpen, setRecordVisitModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [targetMotherForVisit, setTargetMotherForVisit] = useState<Mother | null>(null);

  // ASHA-assisted language onboarding state
  const [languageAssistModalOpen, setLanguageAssistModalOpen] = useState(false);
  const [assistTargetMother, setAssistTargetMother] = useState<Mother | null>(null);
  const [selectedStateForMother, setSelectedStateForMother] = useState('West Bengal');
  const [selectedDistrictForMother, setSelectedDistrictForMother] = useState('South 24 Parganas');
  const [selectedLangForMother, setSelectedLangForMother] = useState<Language>('bn');
  const [languageAssistNotes, setLanguageAssistNotes] = useState('');

  // Filter mothers list
  const filteredMothers = mothers.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.phone.includes(searchQuery);
    const matchesVillage = selectedVillage === 'All' || m.village === selectedVillage;
    const matchesRisk = !filterRiskOnly || m.riskLevel === 'high';
    return matchesSearch && matchesVillage && matchesRisk;
  });

  // Selected mother for detail view
  const currentSelectedMother = mothers.find((m) => m.id === selectedMotherId) || mothers[0];
  const motherVisits = visits.filter((v) => v.motherId === currentSelectedMother?.id);

  const handleOpenRecordVisit = (mother: Mother) => {
    setTargetMotherForVisit(mother);
    setRecordVisitModalOpen(true);
  };

  const handleOpenLanguageAssist = (mother: Mother) => {
    setAssistTargetMother(mother);
    setSelectedLangForMother(mother.preferredLanguage || 'bn');
    setSelectedStateForMother(mother.selectedState || 'West Bengal');
    setSelectedDistrictForMother(mother.selectedDistrict || 'South 24 Parganas');
    setLanguageAssistNotes(mother.ashaAssistedOnboarding?.notes || '');
    setLanguageAssistModalOpen(true);
  };

  const handleSaveLanguageAssist = () => {
    if (!assistTargetMother) return;
    updateMotherLanguageByAsha(
      assistTargetMother.id,
      selectedLangForMother,
      languageAssistNotes || `Configured language preference (${selectedLangForMother.toUpperCase()}) for ${selectedStateForMother}`
    );
    setLanguageAssistModalOpen(false);
  };

  const getLangInfo = (code?: string) => {
    return SUPPORTED_LANGUAGES.find((l) => l.code === code) || SUPPORTED_LANGUAGES[0];
  };

  const highRiskCount = mothers.filter((m) => m.riskLevel === 'high').length;
  const dueVisitsCount = mothers.filter((m) => m.status === 'Due' || m.status === 'Follow-up required').length;

  return (
    <div style={{ padding: '2rem 0', minHeight: 'calc(100vh - 70px)', background: 'var(--cream-bg)' }}>
      <div className="container">
        
        {/* Offline Mode Alert Bar (if currently offline) */}
        {isOffline && (
          <div 
            style={{
              background: '#FFFBEB',
              border: '1.5px solid #F59E0B',
              borderRadius: 'var(--radius-lg)',
              padding: '1rem 1.5rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <WifiOff size={22} color="#D97706" />
              <div>
                <div style={{ fontWeight: 800, color: '#B45309', fontSize: '0.95rem' }}>
                  Offline Field Mode Active (Remote Hamlet Mode)
                </div>
                <div style={{ fontSize: '0.82rem', color: '#78350F' }}>
                  All recorded visits, danger signs, and registrations are securely saved locally on this device.
                </div>
              </div>
            </div>

            <button
              onClick={() => toggleOfflineMode(false)}
              className="btn btn-gold btn-sm"
            >
              <Wifi size={14} /> Reconnect to Grid
            </button>
          </div>
        )}

        {/* Dashboard Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.85rem', color: 'var(--navy-deep)', margin: 0 }}>
                ASHA Care Coordination Workspace
              </h1>
              <span className="badge badge-normal">Sub-Centre Kalyanpur</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Facilitator: <strong>{currentUser?.name || 'Anita Devi'}</strong> • Catchment: Kalyanpur, Sonarpur, Harinagar
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setRegisterModalOpen(true)}
              className="btn btn-primary"
            >
              <UserPlus size={18} />
              <span>Register New Mother</span>
            </button>
          </div>
        </div>

        {/* Metric Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          
          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--cream-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>Assigned Mothers</span>
              <Users size={18} color="var(--teal-primary)" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '0.4rem' }}>
              {mothers.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--teal-primary)', fontWeight: 600 }}>Active rural cohort</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--cream-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>High-Risk Cases</span>
              <AlertTriangle size={18} color="#EF4444" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#DC2626', marginTop: '0.4rem' }}>
              {highRiskCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#DC2626', fontWeight: 600 }}>Flagged for Medical Officer review</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--cream-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>Visits Due This Week</span>
              <Calendar size={18} color="#D97706" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#D97706', marginTop: '0.4rem' }}>
              {dueVisitsCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#D97706', fontWeight: 600 }}>Antenatal & Postnatal appointments</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--cream-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>Offline Queue</span>
              <RefreshCw size={18} color="#4F46E5" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#4F46E5', marginTop: '0.4rem' }}>
              {offlineQueue.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#4F46E5', fontWeight: 600 }}>
              {offlineQueue.length === 0 ? 'All records synchronized' : 'Awaiting upload to grid'}
            </div>
          </div>

        </div>

        {/* Main Content Layout: Left List + Right Detail */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '2rem', alignItems: 'start' }}>
          
          {/* Left Column: Assigned Mothers Roster */}
          <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-xl)', border: '1px solid var(--cream-border)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
            
            {/* Search and Filters */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  placeholder="Search by mother name, village, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem 0.55rem 2.2rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-strong)',
                    fontSize: '0.85rem'
                  }}
                />
                <Search size={15} color="#94A3B8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>

              {/* Village Filter Tags */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                {['All', 'Kalyanpur', 'Sonarpur', 'Harinagar'].map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVillage(v)}
                    style={{
                      padding: '0.3rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: selectedVillage === v ? 'var(--teal-primary)' : 'var(--cream-surface)',
                      color: selectedVillage === v ? '#FFFFFF' : 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    {v}
                  </button>
                ))}

                <button
                  onClick={() => setFilterRiskOnly(!filterRiskOnly)}
                  style={{
                    padding: '0.3rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: filterRiskOnly ? '#EF4444' : 'var(--cream-surface)',
                    color: filterRiskOnly ? '#FFFFFF' : '#DC2626',
                    border: '1px solid #FCA5A5',
                    marginLeft: 'auto'
                  }}
                >
                  ⚠️ High Risk Only
                </button>
              </div>
            </div>

            {/* Mother Cards List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '650px', overflowY: 'auto' }}>
              {filteredMothers.map((m) => {
                const isSelected = currentSelectedMother?.id === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMotherId(m.id)}
                    style={{
                      cursor: 'pointer',
                      padding: '1.1rem',
                      borderRadius: 'var(--radius-lg)',
                      background: isSelected ? 'var(--cream-surface)' : '#FFFFFF',
                      border: isSelected ? '2px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                      boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--navy-deep)' }}>
                        {m.name}
                      </div>
                      
                      {m.riskLevel === 'high' ? (
                        <span className="badge badge-danger">High Risk</span>
                      ) : m.status === 'Completed' ? (
                        <span className="badge badge-normal">Completed</span>
                      ) : (
                        <span className="badge badge-warning">{m.status}</span>
                      )}
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      Age {m.age} • Village {m.village} • G{m.gravida}P{m.para}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.75rem' }}>
                      {m.babyDetails?.isDelivered ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#0F766E', background: '#CCFBF1', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                          <Baby size={13} /> {m.babyDetails.babyName} ({m.babyDetails.gender})
                        </span>
                      ) : (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--navy-deep)', background: '#F1F5F9', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                          <Heart size={13} color="#FB7185" /> {m.gestationalWeeks} Weeks Pregnant
                        </span>
                      )}

                      <span style={{ color: '#D97706', fontWeight: 600 }}>
                        Next: {m.nextScheduledDate}
                      </span>

                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#0369A1', background: '#F0F9FF', border: '1px solid #BAE6FD', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 700 }}>
                        <Globe size={11} /> {getLangInfo(m.preferredLanguage).nativeName}
                      </span>
                    </div>

                    {/* Quick Action Button */}
                    <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenRecordVisit(m);
                          }}
                          className="btn btn-primary btn-sm"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                        >
                          <Plus size={13} /> Visit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenLanguageAssist(m);
                          }}
                          title="Configure Mother's Regional Language Preference"
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.35rem 0.55rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                        >
                          <Languages size={13} /> Lang
                        </button>
                      </div>

                      <div style={{ fontSize: '0.75rem', color: 'var(--teal-primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <span>Open File</span> <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Selected Mother Longitudinal File & History */}
          {currentSelectedMother && (
            <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-xl)', border: '1px solid var(--cream-border)', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
              
              {/* Profile Top Card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <h2 style={{ fontSize: '1.6rem', color: 'var(--navy-deep)', margin: 0 }}>
                      {currentSelectedMother.name}
                    </h2>
                    {currentSelectedMother.riskLevel === 'high' && (
                      <span className="badge badge-danger">High Risk</span>
                    )}
                    <span className="badge badge-info">{currentSelectedMother.bloodGroup}</span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.35rem' }}>
                    Husband: <strong>{currentSelectedMother.husbandName}</strong> • Village: <strong>{currentSelectedMother.village}</strong> • Phone: {currentSelectedMother.phone}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenRecordVisit(currentSelectedMother)}
                  className="btn btn-primary"
                >
                  <Plus size={16} /> Record Today's Visit
                </button>
              </div>

              {/* High Risk Flags (if present) */}
              {currentSelectedMother.riskReasons.length > 0 && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 'var(--radius-lg)', padding: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#991B1B', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    <AlertTriangle size={16} /> Active High-Risk Warnings
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.82rem', color: '#7F1D1D' }}>
                    {currentSelectedMother.riskReasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pregnancy / Newborn Schedule Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--cream-surface)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Gestational Status</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy-deep)', marginTop: '0.2rem' }}>
                    {currentSelectedMother.babyDetails?.isDelivered ? 'Delivered (PNC Active)' : `${currentSelectedMother.gestationalWeeks} Weeks Pregnant`}
                  </div>
                </div>

                <div style={{ background: 'var(--cream-surface)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Estimated Due Date (EDD)</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--teal-primary)', marginTop: '0.2rem' }}>
                    {currentSelectedMother.eddDate}
                  </div>
                </div>

                <div style={{ background: 'var(--cream-surface)', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Assigned PHC Doctor</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0284C7', marginTop: '0.2rem' }}>
                    {currentSelectedMother.assignedDoctorName}
                  </div>
                </div>
              </div>

              {/* PART 8: ASHA-Assisted Language & Regional Voice Profile */}
              <div style={{
                background: '#F0FDFA',
                border: '1.5px solid #5EEAD4',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                boxShadow: '0 2px 8px rgba(13, 148, 136, 0.06)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Languages size={18} color="var(--teal-primary)" />
                    <span style={{ fontWeight: 800, color: 'var(--navy-deep)', fontSize: '0.96rem' }}>
                      Regional Language & Audio Profile
                    </span>
                  </div>

                  {currentSelectedMother.ashaAssistedOnboarding ? (
                    <span className="badge badge-normal" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Check size={12} /> ASHA Configured: {currentSelectedMother.ashaAssistedOnboarding.assistedBy}
                    </span>
                  ) : currentSelectedMother.languageOnboardingCompleted ? (
                    <span className="badge badge-info">Self-configured by Patient</span>
                  ) : (
                    <span className="badge badge-warning">Language Pending Onboarding</span>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
                  <div style={{ background: '#FFFFFF', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #CCFBF1' }}>
                    <div style={{ fontSize: '0.72rem', color: '#0F766E', fontWeight: 700, textTransform: 'uppercase' }}>Spoken & Audio Language</div>
                    <div style={{ fontWeight: 800, color: 'var(--navy-deep)', fontSize: '1rem', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Globe size={15} color="var(--teal-primary)" />
                      {getLangInfo(currentSelectedMother.preferredLanguage).nativeName} ({getLangInfo(currentSelectedMother.preferredLanguage).name})
                    </div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #CCFBF1' }}>
                    <div style={{ fontSize: '0.72rem', color: '#0F766E', fontWeight: 700, textTransform: 'uppercase' }}>Selected State & District</div>
                    <div style={{ fontWeight: 800, color: 'var(--navy-deep)', fontSize: '0.92rem', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <MapPin size={15} color="var(--teal-primary)" />
                      {currentSelectedMother.selectedState || 'West Bengal'} {currentSelectedMother.selectedDistrict ? `• ${currentSelectedMother.selectedDistrict}` : ''}
                    </div>
                  </div>
                </div>

                {currentSelectedMother.ashaAssistedOnboarding?.notes && (
                  <div style={{ background: '#FFFFFF', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px dashed #99F6E4', fontSize: '0.82rem', color: '#115E59', marginBottom: '1rem' }}>
                    <strong>ASHA Field Notes:</strong> "{currentSelectedMother.ashaAssistedOnboarding.notes}"
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button
                    onClick={() => handleOpenLanguageAssist(currentSelectedMother)}
                    className="btn btn-primary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Edit3 size={14} /> Update Mother's Language / Dialect
                  </button>

                  <button
                    onClick={() => {
                      const targetLang = currentSelectedMother.preferredLanguage || 'bn';
                      setLanguage(targetLang);
                    }}
                    className="btn btn-outline btn-sm"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: language === currentSelectedMother.preferredLanguage ? '#ECFDF5' : '#FFFFFF',
                      borderColor: language === currentSelectedMother.preferredLanguage ? '#10B981' : 'var(--border-strong)',
                      color: language === currentSelectedMother.preferredLanguage ? '#065F46' : 'var(--text-secondary)'
                    }}
                  >
                    <Volume2 size={14} />
                    {language === currentSelectedMother.preferredLanguage 
                      ? '✓ App Speaking in Mother\'s Language' 
                      : `Switch App to ${getLangInfo(currentSelectedMother.preferredLanguage).nativeName}`}
                  </button>
                </div>
              </div>

              {/* Past Recorded Visits History */}
              <div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-deep)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={18} color="var(--teal-primary)" />
                  Doorstep Checkup & Vitals History
                </h3>

                {motherVisits.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--cream-surface)', borderRadius: 'var(--radius-lg)' }}>
                    No visits recorded yet. Click "Record Today's Visit" to add one.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {motherVisits.map((v) => (
                      <div
                        key={v.id}
                        style={{
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-lg)',
                          padding: '1.25rem',
                          background: v.flaggedForDoctor ? '#FFFDF5' : '#FFFFFF'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ fontWeight: 800, color: 'var(--navy-deep)', fontSize: '0.98rem' }}>
                              {v.visitType}
                            </span>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                              Date: {v.date}
                            </span>
                            {v.syncStatus === 'Pending synchronisation' ? (
                              <span className="badge badge-offline">Pending Sync</span>
                            ) : (
                              <span className="badge badge-normal">Synced with PHC</span>
                            )}
                          </div>

                          {v.flaggedForDoctor && (
                            <span className="badge badge-danger">Doctor Flagged</span>
                          )}
                        </div>

                        {/* Vitals Summary Pill Grid */}
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.82rem', marginBottom: '0.75rem', background: '#F8FAFC', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)' }}>
                          <div><strong>BP:</strong> {v.bpSystolic}/{v.bpDiastolic} mmHg</div>
                          <div><strong>Weight:</strong> {v.weightKg} kg</div>
                          <div><strong>Hb:</strong> {v.hemoglobin} g/dL</div>
                          {v.fetalHeartRate && <div><strong>FHR:</strong> {v.fetalHeartRate} bpm</div>}
                        </div>

                        <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                          <strong>ASHA Observations:</strong> "{v.ashaObservations}"
                        </div>

                        {/* Doctor's Verified Review (if available) */}
                        {v.doctorReview && (
                          <div style={{ background: '#E0F2FE', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', border: '1px solid #BAE6FD', marginTop: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0369A1', fontWeight: 800, fontSize: '0.78rem' }}>
                              <CheckCircle2 size={14} /> Doctor Clinical Action Recorded
                            </div>
                            <div style={{ fontSize: '0.82rem', color: '#0C4A6E', marginTop: '0.2rem' }}>
                              "{v.doctorReview.clinicalNote}"
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#0284C7', fontWeight: 700, marginTop: '0.35rem' }}>
                              Directive: {v.doctorReview.actionDetails}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Record Visit Modal */}
      {targetMotherForVisit && (
        <RecordVisitModal
          mother={targetMotherForVisit}
          isOpen={recordVisitModalOpen}
          onClose={() => {
            setRecordVisitModalOpen(false);
            setTargetMotherForVisit(null);
          }}
        />
      )}

      {/* Register Mother Modal */}
      <RegisterMotherModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />

      {/* ASHA-Assisted Language & Regional Dialect Onboarding Modal */}
      {languageAssistModalOpen && assistTargetMother && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(11, 30, 54, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            border: '1px solid var(--border-subtle)',
            position: 'relative'
          }}>
            <button
              onClick={() => setLanguageAssistModalOpen(false)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'var(--cream-surface)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-secondary)'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(13, 148, 136, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Languages size={20} color="var(--teal-primary)" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--navy-deep)' }}>
                  Language Onboarding for {assistTargetMother.name}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Village: {assistTargetMother.village} • Age {assistTargetMother.age}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Configure the mother's spoken dialect and home language so door-to-door audio instructions, reminders, and notifications are spoken in a language she understands.
            </p>

            {/* Region / State Selection */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                State / Union Territory
              </label>
              <select
                value={selectedStateForMother}
                onChange={(e) => {
                  const newState = e.target.value;
                  setSelectedStateForMother(newState);
                  const stateData = INDIA_STATES_DATA.find((s) => s.name === newState);
                  if (stateData && stateData.districts.length > 0) {
                    setSelectedDistrictForMother(stateData.districts[0]);
                  }
                  if (stateData && stateData.suggestedLanguages.length > 0) {
                    setSelectedLangForMother(stateData.suggestedLanguages[0].code);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-strong)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                {INDIA_STATES_DATA.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name} ({s.nativeName})
                  </option>
                ))}
              </select>
            </div>

            {/* District Selection */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                District
              </label>
              <select
                value={selectedDistrictForMother}
                onChange={(e) => setSelectedDistrictForMother(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-strong)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                {(INDIA_STATES_DATA.find((s) => s.name === selectedStateForMother)?.districts || ['District']).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Preferred Language Selection (11 Indian Languages) */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                Preferred Dialect / Language
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.5rem' }}>
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSuggested = getSuggestedLanguagesForRegion(selectedStateForMother).some((sl) => sl.code === lang.code);
                  const isSelected = selectedLangForMother === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setSelectedLangForMother(lang.code)}
                      style={{
                        padding: '0.6rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected ? '2px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                        background: isSelected ? '#F0FDFA' : '#FAFAFA',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        position: 'relative'
                      }}
                    >
                      <div style={{ fontWeight: 800, fontSize: '0.92rem', color: isSelected ? 'var(--teal-primary)' : 'var(--navy-deep)' }}>
                        {lang.nativeName}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {lang.name}
                      </div>
                      {isSuggested && (
                        <span style={{ fontSize: '0.64rem', color: '#059669', background: '#DEF7EC', padding: '0.1rem 0.35rem', borderRadius: '4px', marginTop: '0.2rem', display: 'inline-block' }}>
                          Suggested
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field Notes for ASHA */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                Field Worker Observations / Household Literacy Notes
              </label>
              <textarea
                value={languageAssistNotes}
                onChange={(e) => setLanguageAssistNotes(e.target.value)}
                placeholder="e.g. Mother prefers spoken audio guidance over reading; husband assists with SMS; mother understands simple Bengali dialect..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-strong)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setLanguageAssistModalOpen(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveLanguageAssist}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Check size={16} /> Save Mother's Profile
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
