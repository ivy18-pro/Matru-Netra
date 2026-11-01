import React, { useState, useEffect } from 'react';
import { useCare } from '../../context/CareContext';
import { t, SUPPORTED_LANGUAGES } from '../../i18n/translations';
import { voiceService, VoiceNavigationAction } from '../../services/voiceService';
import { 
  Heart, 
  Calendar, 
  Phone, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Clock, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Globe, 
  Baby, 
  ShieldCheck, 
  ArrowRight,
  Apple,
  Pill,
  Moon,
  Info,
  Check
} from 'lucide-react';

export const MotherDashboard: React.FC = () => {
  const { 
    mothers, 
    visits, 
    milestones, 
    language, 
    setLanguage, 
    currentUser,
    selectedState,
    selectedDistrict,
    setRegionModalOpen
  } = useCare();

  // Find authorized mother record linked to the authenticated user account
  const mother = mothers.find((m) => m.id === currentUser?.motherProfileId || m.phone === currentUser?.phone) || 
                 mothers.find((m) => m.id === 'MOM-001') || 
                 mothers[0];

  // Active section view
  const [activeSection, setActiveSection] = useState<'next-visit' | 'care-journey' | 'reminders' | 'help'>('next-visit');

  // Voice playback & recognition state
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceNotice, setVoiceNotice] = useState<string>('');

  // Calculate days remaining to EDD
  const eddDate = new Date(mother.eddDate);
  const today = new Date();
  const diffDays = Math.max(0, Math.ceil((eddDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  // Cleanup audio when unmounting
  useEffect(() => {
    return () => {
      voiceService.stopSpeaking();
      voiceService.stopListening();
    };
  }, []);

  // Text-to-Speech handler for any text block
  const handleSpeakText = (text: string, identifier: string) => {
    if (speakingText === identifier) {
      voiceService.stopSpeaking();
      setSpeakingText(null);
    } else {
      voiceService.speak(
        text,
        language,
        () => setSpeakingText(identifier),
        () => setSpeakingText(null),
        () => setSpeakingText(null)
      );
    }
  };

  // Voice Navigation listener
  const toggleVoiceAssistant = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
      setVoiceNotice('');
    } else {
      setVoiceNotice(t('voiceListening', language));
      const started = voiceService.startListening(
        language,
        (action: VoiceNavigationAction, transcript: string) => {
          setIsListening(false);
          setVoiceNotice(`"${transcript}"`);

          // Match spoken command to action
          if (action === 'NEXT_VISIT') {
            setActiveSection('next-visit');
            handleSpeakNextVisit();
          } else if (action === 'MY_HEALTH') {
            setActiveSection('care-journey');
          } else if (action === 'HELP') {
            setActiveSection('help');
          } else if (action === 'REMINDERS') {
            setActiveSection('reminders');
          } else if (action === 'CHANGE_LANGUAGE') {
            setRegionModalOpen(true);
          }
        },
        (err) => {
          setIsListening(false);
          setVoiceNotice(err);
        },
        (listening) => setIsListening(listening)
      );

      if (!started) {
        setIsListening(false);
        setVoiceNotice('Voice recognition is not supported on this browser. Please use the on-screen buttons.');
      }
    }
  };

  const handleSpeakNextVisit = () => {
    const textToRead = `${t('nextCheckupTitle', language)}: ${mother.nextScheduledDate}. ${mother.nextScheduledType}. ${t('ashaLifelineTitle', language)} ${mother.assignedAshaName}`;
    handleSpeakText(textToRead, 'NEXT_VISIT_MAIN');
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <div style={{ padding: '1.75rem 0 4rem', minHeight: 'calc(100vh - 70px)', background: 'var(--cream-bg)' }}>
      <div className="container" style={{ maxWidth: '980px' }}>
        
        {/* ==============================================================
            TOP ACCESSIBILITY & REGIONAL BANNER
            ============================================================== */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.25rem',
            background: '#FFFFFF',
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--cream-border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {/* Region & Active Language indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#CCFBF1', color: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Globe size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
                {currentLangObj.nativeName} ({currentLangObj.name})
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Region: {selectedDistrict}, {selectedState}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Quick Voice Assistant Mic Button */}
            <button
              onClick={toggleVoiceAssistant}
              title="Voice Assistant: Tap to speak commands"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 0.95rem',
                borderRadius: 'var(--radius-full)',
                background: isListening ? '#FEF2F2' : '#F0FDFA',
                border: isListening ? '1.5px solid #EF4444' : '1px solid #14B8A6',
                color: isListening ? '#DC2626' : '#0F766E',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: isListening ? '0 0 12px rgba(239, 68, 68, 0.4)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              <span>{isListening ? 'Listening...' : t('voiceTapToSpeak', language)}</span>
            </button>

            {/* Change Language & Region Button */}
            <button
              onClick={() => setRegionModalOpen(true)}
              className="btn btn-outline"
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.8rem',
                fontWeight: 700
              }}
            >
              <Globe size={14} />
              <span>{t('changeLanguage', language)}</span>
            </button>
          </div>
        </div>

        {/* Voice Feedback Banner (when active) */}
        {voiceNotice && (
          <div 
            style={{
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              padding: '0.65rem 1rem',
              borderRadius: 'var(--radius-lg)',
              fontSize: '0.82rem',
              color: '#92400E',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem'
            }}
          >
            <Sparkles size={16} color="#F59E0B" />
            <span>{voiceNotice}</span>
          </div>
        )}

        {/* ==============================================================
            WELCOME HERO & BABY COUNTDOWN CARD
            ============================================================== */}
        <div 
          style={{
            background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem 1.75rem',
            border: '2px solid #FDBA74',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div 
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '20px',
                background: '#EA580C',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(234, 88, 12, 0.35)'
              }}
            >
              <Heart size={36} fill="#FFFFFF" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#9A3412', margin: 0, fontWeight: 800 }}>
                  {t('welcomeMother', language)}, {currentUser?.name || mother.name}
                </h1>
                <span 
                  style={{
                    background: '#EA580C',
                    color: '#FFFFFF',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 800
                  }}
                >
                  {mother.gestationalWeeks} {t('weeksPregnant', language)}
                </span>
              </div>
              <p style={{ color: '#C2410C', fontSize: '0.92rem', marginTop: '0.35rem', margin: 0 }}>
                {t('babyGrowthAnalogy', language)}
              </p>
            </div>
          </div>

          {/* Delivery Countdown Badge */}
          <div 
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '0.85rem 1.25rem',
              border: '1.5px solid #FDBA74',
              textAlign: 'center',
              minWidth: '150px'
            }}
          >
            <div style={{ fontSize: '0.72rem', color: '#9A3412', fontWeight: 800, textTransform: 'uppercase' }}>
              {t('daysRemaining', language)}
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#EA580C', lineHeight: 1.1 }}>
              {diffDays}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              EDD: {mother.eddDate}
            </div>
          </div>
        </div>

        {/* ==============================================================
            FOUR PRIMARY BIG-BUTTON ACTION TABS
            ============================================================== */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.85rem',
            marginBottom: '2rem'
          }}
        >
          {/* Tab 1: My Next Visit */}
          <button
            type="button"
            onClick={() => setActiveSection('next-visit')}
            style={{
              padding: '1rem 0.5rem',
              borderRadius: 'var(--radius-xl)',
              background: activeSection === 'next-visit' ? '#0D9488' : '#FFFFFF',
              color: activeSection === 'next-visit' ? '#FFFFFF' : 'var(--navy-deep)',
              border: activeSection === 'next-visit' ? '2px solid #0F766E' : '1px solid var(--border-subtle)',
              boxShadow: activeSection === 'next-visit' ? '0 10px 20px rgba(13, 148, 136, 0.3)' : 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Calendar size={24} />
            <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>
              {t('myNextVisitAction', language)}
            </span>
          </button>

          {/* Tab 2: My Care Journey */}
          <button
            type="button"
            onClick={() => setActiveSection('care-journey')}
            style={{
              padding: '1rem 0.5rem',
              borderRadius: 'var(--radius-xl)',
              background: activeSection === 'care-journey' ? '#0D9488' : '#FFFFFF',
              color: activeSection === 'care-journey' ? '#FFFFFF' : 'var(--navy-deep)',
              border: activeSection === 'care-journey' ? '2px solid #0F766E' : '1px solid var(--border-subtle)',
              boxShadow: activeSection === 'care-journey' ? '0 10px 20px rgba(13, 148, 136, 0.3)' : 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Baby size={24} />
            <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>
              {t('myHealthAction', language)}
            </span>
          </button>

          {/* Tab 3: Daily Reminders */}
          <button
            type="button"
            onClick={() => setActiveSection('reminders')}
            style={{
              padding: '1rem 0.5rem',
              borderRadius: 'var(--radius-xl)',
              background: activeSection === 'reminders' ? '#0D9488' : '#FFFFFF',
              color: activeSection === 'reminders' ? '#FFFFFF' : 'var(--navy-deep)',
              border: activeSection === 'reminders' ? '2px solid #0F766E' : '1px solid var(--border-subtle)',
              boxShadow: activeSection === 'reminders' ? '0 10px 20px rgba(13, 148, 136, 0.3)' : 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Clock size={24} />
            <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>
              {t('remindersTitle', language)}
            </span>
          </button>

          {/* Tab 4: Help / ASHA Lifeline */}
          <button
            type="button"
            onClick={() => setActiveSection('help')}
            style={{
              padding: '1rem 0.5rem',
              borderRadius: 'var(--radius-xl)',
              background: activeSection === 'help' ? '#EA580C' : '#FFFFFF',
              color: activeSection === 'help' ? '#FFFFFF' : 'var(--navy-deep)',
              border: activeSection === 'help' ? '2px solid #C2410C' : '1px solid var(--border-subtle)',
              boxShadow: activeSection === 'help' ? '0 10px 20px rgba(234, 88, 12, 0.3)' : 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Phone size={24} />
            <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>
              {t('helpAction', language)}
            </span>
          </button>
        </div>

        {/* ==============================================================
            SECTION A: MY NEXT VISIT (With prominent speaker button)
            ============================================================== */}
        {activeSection === 'next-visit' && (
          <div 
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem 2rem',
              border: '2px solid #99F6E4',
              boxShadow: 'var(--shadow-md)',
              marginBottom: '2rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#0D9488', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                  <Calendar size={16} /> Section A • Essential Appointment
                </div>
                <h2 style={{ fontSize: '1.65rem', color: 'var(--navy-deep)', margin: 0, fontWeight: 800 }}>
                  {t('nextCheckupTitle', language)}
                </h2>
              </div>

              {/* Speaker Button to read appointment details aloud */}
              <button
                type="button"
                onClick={handleSpeakNextVisit}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  background: speakingText === 'NEXT_VISIT_MAIN' ? '#EA580C' : '#0D9488',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(13, 148, 136, 0.35)'
                }}
              >
                {speakingText === 'NEXT_VISIT_MAIN' ? <VolumeX size={18} /> : <Volume2 size={18} />}
                <span>{speakingText === 'NEXT_VISIT_MAIN' ? t('stopSpeaking', language) : t('readNextVisitAloud', language)}</span>
              </button>
            </div>

            {/* Next Checkup Big Highlight Box */}
            <div 
              style={{
                background: '#F0FDFA',
                border: '1.5px solid #5EEAD4',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ fontSize: '0.8rem', color: '#0F766E', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                  Confirmed Date
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
                  {mother.nextScheduledDate}
                </div>
                <div style={{ fontSize: '1rem', color: '#0D9488', fontWeight: 700, marginTop: '0.25rem' }}>
                  {mother.nextScheduledType}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span 
                  style={{
                    display: 'inline-block',
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    background: '#0D9488',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    marginBottom: '0.4rem'
                  }}
                >
                  {t('visitScheduled', language)}
                </span>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Sub-Centre: {mother.subCentre}
                </div>
              </div>
            </div>

            {/* Checkup Instructions & Simple Explanation */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '0.25rem' }}>
                  1. Blood Pressure & Hemoglobin
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  ASHA Didi and Dr. Priya will check your arm pressure and blood levels to keep mother and baby safe.
                </div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '0.25rem' }}>
                  2. Calcium & Iron Refill
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Bring your red MCP card to receive fresh monthly IFA nutrition tablets at no cost.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================================
            SECTION B: MY CARE JOURNEY (Visual Milestone Timeline)
            ============================================================== */}
        {activeSection === 'care-journey' && (
          <div 
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem 2rem',
              border: '1px solid var(--cream-border)',
              boxShadow: 'var(--shadow-md)',
              marginBottom: '2rem'
            }}
          >
            <div style={{ marginBottom: '1.75rem' }}>
              <h2 style={{ fontSize: '1.65rem', color: 'var(--navy-deep)', margin: 0, fontWeight: 800 }}>
                {t('careJourneyTitle', language)}
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: '0.35rem 0 0' }}>
                {t('careJourneySub', language)}
              </p>
            </div>

            {/* Visual Timeline Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { step: '01', title: 'Early Checkup & Mother Card', date: 'Week 12 (Completed)', desc: 'Mother-Child Protection (MCP) card issued. Hemoglobin baseline checked.', status: 'completed' },
                { step: '02', title: 'Sonography Scan & Tetanus Shot', date: 'Week 20 (Completed)', desc: 'Baby anomaly scan conducted at PHC. Tetanus Toxoid 1 protection given.', status: 'completed' },
                { step: '03', title: 'Third Trimester BP & Growth Review', date: 'Week 28 (Current Stage)', desc: 'Monitoring blood pressure and baby kick count. Iron supplementation active.', status: 'active' },
                { step: '04', title: 'Institutional Hospital Delivery Plan', date: 'Week 36 (Upcoming)', desc: 'PHC labor room booking and 102 ambulance driver voucher assigned.', status: 'upcoming' },
                { step: '05', title: 'Newborn Care & Birth Vaccines', date: 'Day 01–42 Post-Delivery', desc: 'ASHA doorstep checks for newborn warmth, breast milk latching, and BCG vaccines.', status: 'upcoming' },
              ].map((m, idx) => {
                const isCompleted = m.status === 'completed';
                const isActive = m.status === 'active';
                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1.25rem',
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-lg)',
                      border: isActive ? '2px solid #0D9488' : (isCompleted ? '1px solid #A7F3D0' : '1px solid var(--border-subtle)'),
                      background: isActive ? '#F0FDFA' : (isCompleted ? '#ECFDF5' : '#F8FAFC')
                    }}
                  >
                    <div 
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: isActive ? '#0D9488' : (isCompleted ? '#10B981' : '#E2E8F0'),
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {isCompleted ? <Check size={20} /> : m.step}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.2rem' }}>
                        <div style={{ fontWeight: 800, color: 'var(--navy-deep)', fontSize: '1.05rem' }}>
                          {m.title}
                        </div>
                        <span 
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            padding: '0.2rem 0.55rem',
                            borderRadius: 'var(--radius-full)',
                            background: isActive ? '#0D9488' : (isCompleted ? '#10B981' : '#64748B'),
                            color: '#FFFFFF'
                          }}
                        >
                          {m.date}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {m.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==============================================================
            SECTION C: MY REMINDERS (With Read Aloud Buttons)
            ============================================================== */}
        {activeSection === 'reminders' && (
          <div 
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem 2rem',
              border: '1px solid var(--cream-border)',
              boxShadow: 'var(--shadow-md)',
              marginBottom: '2rem'
            }}
          >
            <div style={{ marginBottom: '1.75rem' }}>
              <h2 style={{ fontSize: '1.65rem', color: 'var(--navy-deep)', margin: 0, fontWeight: 800 }}>
                {t('remindersTitle', language)}
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: '0.35rem 0 0' }}>
                {t('remindersSub', language)}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {/* Reminder 1: Nutrition */}
              <div 
                style={{
                  background: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: '#15803D', fontSize: '1rem' }}>
                    <Apple size={20} />
                    <span>Nutrition Reminder</span>
                  </div>
                  <button
                    onClick={() => handleSpeakText(t('nutritionTip', language), 'REM_NUTRITION')}
                    style={{ background: '#DCFCE7', color: '#15803D', border: 'none', padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <Volume2 size={14} /> Listen
                  </button>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#166534', lineHeight: 1.6 }}>
                  {t('nutritionTip', language)}
                </div>
              </div>

              {/* Reminder 2: Medicine */}
              <div 
                style={{
                  background: '#F0F9FF',
                  border: '1px solid #BAE6FD',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: '#0369A1', fontSize: '1rem' }}>
                    <Pill size={20} />
                    <span>Medicine Routine</span>
                  </div>
                  <button
                    onClick={() => handleSpeakText(t('medicineTip', language), 'REM_MEDICINE')}
                    style={{ background: '#E0F2FE', color: '#0369A1', border: 'none', padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <Volume2 size={14} /> Listen
                  </button>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#075985', lineHeight: 1.6 }}>
                  {t('medicineTip', language)}
                </div>
              </div>

              {/* Reminder 3: Rest */}
              <div 
                style={{
                  background: '#FFF7ED',
                  border: '1px solid #FFEDD5',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: '#C2410C', fontSize: '1rem' }}>
                    <Moon size={20} />
                    <span>Hydration & Rest</span>
                  </div>
                  <button
                    onClick={() => handleSpeakText(t('restTip', language), 'REM_REST')}
                    style={{ background: '#FFEDD5', color: '#C2410C', border: 'none', padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <Volume2 size={14} /> Listen
                  </button>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#9A3412', lineHeight: 1.6 }}>
                  {t('restTip', language)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================================
            SECTION D: HELP & ASHA DIDI LIFELINE
            ============================================================== */}
        {activeSection === 'help' && (
          <div 
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem 2rem',
              border: '2px solid #FCA5A5',
              boxShadow: 'var(--shadow-md)',
              marginBottom: '2rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem', color: '#DC2626' }}>
              <AlertTriangle size={28} />
              <div>
                <h2 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 800 }}>
                  {t('dangerSignsTitle', language)}
                </h2>
                <div style={{ fontSize: '0.82rem', color: '#991B1B' }}>
                  {t('dangerSignsAlert', language)}
                </div>
              </div>
            </div>

            {/* ASHA Didi Contact Card */}
            <div 
              style={{
                background: '#F0FDFA',
                border: '1.5px solid #14B8A6',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ fontSize: '0.78rem', color: '#0F766E', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                  {t('ashaLifelineTitle', language)}
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
                  {mother.assignedAshaName}
                </div>
                <div style={{ fontSize: '0.88rem', color: '#0D9488', fontWeight: 600 }}>
                  Sub-Centre: {mother.subCentre}
                </div>
              </div>

              <a
                href={`tel:${mother.assignedAshaPhone}`}
                className="btn btn-primary"
                style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem', fontWeight: 800 }}
              >
                <Phone size={18} />
                <span>{t('callAshaDidi', language)} ({mother.assignedAshaPhone})</span>
              </a>
            </div>

            {/* Emergency Ambulance 102 Card */}
            <div 
              style={{
                background: '#FEF2F2',
                border: '1px solid #FCA5A5',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ fontWeight: 800, color: '#991B1B', fontSize: '1rem' }}>
                  National Maternal Health Ambulance Service
                </div>
                <div style={{ fontSize: '0.8rem', color: '#7F1D1D' }}>
                  Janani Shishu Suraksha Karyakram (JSSK) Free Transport
                </div>
              </div>

              <a
                href="tel:102"
                className="btn"
                style={{ background: '#DC2626', color: '#FFFFFF', padding: '0.75rem 1.5rem', fontWeight: 800 }}
              >
                <Phone size={18} />
                <span>{t('ambulance102', language)}</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
