import React, { useState, useEffect, useRef } from 'react';
import { useCare } from '../../context/CareContext';
import { Language } from '../../types';
import { 
  INDIA_STATES_DATA, 
  RegionState, 
  getSuggestedLanguagesForRegion, 
  searchStatesAndDistricts 
} from '../../data/indiaGeoData';
import { t, SUPPORTED_LANGUAGES } from '../../i18n/translations';
import { voiceService } from '../../services/voiceService';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  X, 
  MapPin, 
  Search, 
  Globe, 
  Volume2, 
  VolumeX, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Heart, 
  Calendar, 
  Phone, 
  ShieldCheck, 
  HelpCircle,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface RegionLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (state: string, district: string, language: Language) => void;
}

export const RegionLanguageModal: React.FC<RegionLanguageModalProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const { 
    language, 
    setLanguage, 
    currentUser, 
    setActiveView 
  } = useCare();

  // Wizard Steps: 
  // 1 = Region Selection (Map or Searchable List)
  // 2 = Language Confirmation & Alternatives
  // 3 = Voice-First Welcome Experience
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');

  // Selected region states
  const [selectedState, setSelectedState] = useState<RegionState>(INDIA_STATES_DATA[0]); // Default West Bengal
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Nadia');
  const [selectedLang, setSelectedLang] = useState<Language>(language);
  const [showAllLanguages, setShowAllLanguages] = useState<boolean>(false);

  // Search filter for accessible list
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Voice state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Map DOM reference
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polygonLayersRef = useRef<{ [key: string]: L.Polygon }>({});

  // Initialize or update Leaflet Map
  useEffect(() => {
    if (!isOpen || step !== 1 || activeTab !== 'map' || !mapContainerRef.current) {
      return;
    }

    // Clean up previous instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    try {
      // Create map centered on India
      const map = L.map(mapContainerRef.current, {
        center: [22.8, 81.0],
        zoom: 4.8,
        minZoom: 4,
        maxZoom: 9,
        zoomControl: true,
        attributionControl: false
      });

      // CartoDB Positron tiles for high-contrast, clean healthcare mapping
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      // Attribution banner
      L.control.attribution({ position: 'bottomright' })
        .addAttribution('&copy; <a href="https://data.gov.in" target="_blank">Open Data India</a> &copy; Natural Earth')
        .addTo(map);

      polygonLayersRef.current = {};

      // Draw interactive state polygons
      INDIA_STATES_DATA.forEach((st) => {
        const isCurrentSelected = st.id === selectedState.id;

        const polygon = L.polygon(st.polygon, {
          color: isCurrentSelected ? '#EA580C' : '#0D9488',
          weight: isCurrentSelected ? 3 : 1.8,
          fillColor: isCurrentSelected ? '#F97316' : '#14B8A6',
          fillOpacity: isCurrentSelected ? 0.45 : 0.22,
          className: 'state-vector-polygon'
        }).addTo(map);

        // Tooltip label
        polygon.bindTooltip(`<strong>${st.name}</strong><br/><span style="font-size: 0.75rem">${st.nativeName}</span>`, {
          sticky: true,
          direction: 'top',
          className: 'map-state-tooltip'
        });

        // Hover & click interactions
        polygon.on('mouseover', () => {
          if (st.id !== selectedState.id) {
            polygon.setStyle({
              fillOpacity: 0.4,
              weight: 2.5,
              color: '#F59E0B'
            });
          }
        });

        polygon.on('mouseout', () => {
          if (st.id !== selectedState.id) {
            polygon.setStyle({
              fillOpacity: 0.22,
              weight: 1.8,
              color: '#0D9488'
            });
          }
        });

        polygon.on('click', () => {
          handleSelectState(st);
          map.flyTo(st.center, st.zoom, { duration: 0.8 });
        });

        polygonLayersRef.current[st.id] = polygon;
      });

      mapInstanceRef.current = map;

      // Ensure proper container sizing
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    } catch (e) {
      console.warn('Map initialization note:', e);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen, step, activeTab]);

  // Update polygon highlighting when selectedState changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    INDIA_STATES_DATA.forEach((st) => {
      const layer = polygonLayersRef.current[st.id];
      if (layer) {
        const isCurrent = st.id === selectedState.id;
        layer.setStyle({
          color: isCurrent ? '#EA580C' : '#0D9488',
          weight: isCurrent ? 3.5 : 1.8,
          fillColor: isCurrent ? '#F97316' : '#14B8A6',
          fillOpacity: isCurrent ? 0.45 : 0.22
        });
      }
    });
  }, [selectedState]);

  if (!isOpen) return null;

  const handleSelectState = (st: RegionState) => {
    setSelectedState(st);
    setSelectedDistrict(st.districts[0] || 'Main Sub-Centre');
    // Set default suggested language for this region
    setSelectedLang(st.defaultLanguage);
  };

  const handleProceedToLanguage = () => {
    // Determine suggested languages for this state and district
    const suggestions = getSuggestedLanguagesForRegion(selectedState.name, selectedDistrict);
    if (suggestions.length > 0) {
      setSelectedLang(suggestions[0].code);
    }
    setStep(2);
  };

  const handleConfirmLanguage = () => {
    // Apply selected language globally
    setLanguage(selectedLang);
    setStep(3);

    // Speak welcome prompt automatically in selected language
    const welcomeSpeech = t('voiceWelcomeSubtitle', selectedLang);
    voiceService.speak(
      welcomeSpeech, 
      selectedLang, 
      () => setIsSpeaking(true), 
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  const handleFinishOnboarding = (actionType?: 'MY_HEALTH' | 'NEXT_VISIT' | 'HELP') => {
    voiceService.stopSpeaking();
    setIsSpeaking(false);

    if (onComplete) {
      onComplete(selectedState.name, selectedDistrict, selectedLang);
    }

    onClose();

    // If mother is logged in, navigate to portal
    if (currentUser && currentUser.role === 'mother') {
      setActiveView('portal');
    }
  };

  const toggleSpeakWelcome = () => {
    if (isSpeaking) {
      voiceService.stopSpeaking();
      setIsSpeaking(false);
    } else {
      const speech = `${t('voiceWelcomeHeading', selectedLang)}. ${t('voiceWelcomeSubtitle', selectedLang)}. ${t('voiceInstruction', selectedLang)}`;
      voiceService.speak(
        speech,
        selectedLang,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    }
  };

  const searchResults = searchStatesAndDistricts(searchQuery);

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1300,
        background: 'rgba(7, 21, 41, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease'
      }}
    >
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid var(--border-subtle)'
        }}
      >
        {/* Modal Top Bar */}
        <div 
          style={{
            padding: '1.25rem 1.75rem',
            background: 'var(--navy-deep)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#14B8A6', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <Globe size={15} />
              <span>Step 0{step} of 03 • Accessibility & Language System</span>
            </div>
            <h2 style={{ fontSize: '1.35rem', color: '#FFFFFF', margin: '0.2rem 0 0', fontWeight: 800 }}>
              {step === 1 && t('regionHeading', selectedLang)}
              {step === 2 && t('suggestedLanguageTitle', selectedLang)}
              {step === 3 && t('voiceWelcomeHeading', selectedLang)}
            </h2>
          </div>

          <button 
            onClick={onClose}
            title="Close dialog"
            style={{ 
              color: '#94A3B8', 
              padding: '0.45rem', 
              borderRadius: '50%', 
              background: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* ==============================================================
            STEP 1: INTERACTIVE INDIA MAP & REGION SELECTION
            ============================================================== */}
        {step === 1 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            {/* Sub-header instruction */}
            <div style={{ padding: '0.85rem 1.75rem', background: '#F8FAFC', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                {t('regionSubheading', selectedLang)}
              </div>

              {/* View Switcher: Interactive Map vs Searchable List */}
              <div style={{ display: 'flex', background: '#E2E8F0', padding: '3px', borderRadius: 'var(--radius-full)' }}>
                <button
                  type="button"
                  onClick={() => setActiveTab('map')}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    background: activeTab === 'map' ? '#FFFFFF' : 'transparent',
                    color: activeTab === 'map' ? 'var(--navy-deep)' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'map' ? 'var(--shadow-sm)' : 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  🗺️ {t('interactiveMapTab', selectedLang)}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    background: activeTab === 'list' ? '#FFFFFF' : 'transparent',
                    color: activeTab === 'list' ? 'var(--navy-deep)' : 'var(--text-secondary)',
                    boxShadow: activeTab === 'list' ? 'var(--shadow-sm)' : 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  📋 {t('searchListTab', selectedLang)}
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: activeTab === 'map' ? '1fr 320px' : '1fr', overflow: 'hidden', minHeight: '380px' }}>
              
              {/* Tab A: Interactive Leaflet Map View */}
              {activeTab === 'map' ? (
                <div style={{ position: 'relative', height: '100%', minHeight: '380px', background: '#E0F2FE' }}>
                  <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
                  
                  {/* Floating Hint Overlay */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      zIndex: 500,
                      background: 'rgba(11, 30, 54, 0.88)',
                      backdropFilter: 'blur(8px)',
                      color: '#FFFFFF',
                      padding: '0.4rem 0.8rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.75rem',
                      pointerEvents: 'none'
                    }}
                  >
                    👆 Tap or click any state to zoom in & select
                  </div>
                </div>
              ) : (
                /* Tab B: Searchable States & Districts List */
                <div style={{ padding: '1.25rem 1.75rem', overflowY: 'auto', maxHeight: '420px' }}>
                  <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                    <Search size={16} color="#64748B" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      placeholder={t('searchPlaceholder', selectedLang)}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem 0.65rem 2.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-strong)',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem' }}>
                    {searchResults.map(({ state, matchingDistricts }) => {
                      const isSelected = state.id === selectedState.id;
                      return (
                        <div
                          key={state.id}
                          onClick={() => handleSelectState(state)}
                          style={{
                            padding: '0.85rem',
                            borderRadius: 'var(--radius-lg)',
                            border: isSelected ? '2px solid #EA580C' : '1px solid var(--border-subtle)',
                            background: isSelected ? '#FFF7ED' : '#FFFFFF',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <span style={{ fontWeight: 800, color: isSelected ? '#9A3412' : 'var(--navy-deep)', fontSize: '0.95rem' }}>
                              {state.name}
                            </span>
                            <span style={{ fontSize: '0.78rem', color: '#14B8A6', fontWeight: 700 }}>
                              {state.nativeName}
                            </span>
                          </div>

                          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                            Districts: {matchingDistricts.slice(0, 3).join(', ')}...
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Right Panel: Selected State & District Confirmation */}
              <div 
                style={{
                  background: '#F8FAFC',
                  borderLeft: '1px solid var(--border-subtle)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflowY: 'auto'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Selected State
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-deep)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MapPin size={20} color="#EA580C" />
                    <span>{selectedState.name}</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#14B8A6', fontWeight: 700, marginLeft: '1.6rem', marginBottom: '1.25rem' }}>
                    {selectedState.nativeName}
                  </div>

                  {/* District Selection Dropdown */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                      {t('selectDistrictPrompt', selectedLang)}
                    </label>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.6rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-strong)',
                        fontSize: '0.88rem',
                        background: '#FFFFFF'
                      }}
                    >
                      {selectedState.districts.map((d, idx) => (
                        <option key={idx} value={d}>
                          {d} District
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Primary Regional Language preview */}
                  <div style={{ background: '#FFFFFF', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                      Primary Regional Language:
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--teal-primary)' }}>
                      {selectedState.suggestedLanguages[0]?.nativeLabel} ({selectedState.suggestedLanguages[0]?.label})
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleProceedToLanguage}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.85rem', fontWeight: 700 }}
                >
                  <span>Proceed to Language</span>
                  <ArrowRight size={18} />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ==============================================================
            STEP 2: REGION-BASED LANGUAGE SUGGESTIONS & CONFIRMATION
            ============================================================== */}
        {step === 2 && (
          <div style={{ padding: '2rem', overflowY: 'auto', maxHeight: '75vh' }}>
            
            {/* Top Regional Context */}
            <div style={{ background: '#FFF7ED', padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid #FFEDD5', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <MapPin size={22} color="#EA580C" />
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#9A3412' }}>
                    {selectedDistrict}, {selectedState.name} ({selectedState.nativeName})
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#C2410C' }}>
                    Region confirmed. Review language suggestions below.
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(1)}
                style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--teal-primary)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {t('backToMap', selectedLang)}
              </button>
            </div>

            {/* Suggested Languages for this Region */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--navy-deep)', marginBottom: '0.4rem', fontWeight: 800 }}>
                {t('suggestedLanguageTitle', selectedLang)}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                {t('suggestedLanguageNote', selectedLang)}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {selectedState.suggestedLanguages.map((langItem) => {
                  const isChosen = selectedLang === langItem.code;
                  return (
                    <div
                      key={langItem.code}
                      onClick={() => setSelectedLang(langItem.code)}
                      style={{
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-xl)',
                        border: isChosen ? '2.5px solid #0D9488' : '1px solid var(--border-subtle)',
                        background: isChosen ? '#F0FDFA' : '#FFFFFF',
                        cursor: 'pointer',
                        boxShadow: isChosen ? '0 10px 25px rgba(13, 148, 136, 0.18)' : 'var(--shadow-sm)',
                        transform: isChosen ? 'translateY(-2px)' : 'none',
                        transition: 'all 0.2s ease',
                        position: 'relative'
                      }}
                    >
                      {isChosen && (
                        <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#0D9488', color: '#FFFFFF', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Check size={14} />
                        </div>
                      )}
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: isChosen ? '#0F766E' : 'var(--navy-deep)', marginBottom: '0.2rem' }}>
                        {langItem.nativeLabel}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                        {langItem.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Toggle Full Nationwide Language Grid */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy-deep)' }}>
                  Speak another language at home?
                </span>
                <button
                  type="button"
                  onClick={() => setShowAllLanguages(!showAllLanguages)}
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--teal-primary)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {showAllLanguages ? 'Hide All Languages ▲' : 'Show All 11 Indian Languages ▼'}
                </button>
              </div>

              {showAllLanguages && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem', animation: 'fadeIn 0.2s ease' }}>
                  {SUPPORTED_LANGUAGES.map((langItem) => {
                    const isChosen = selectedLang === langItem.code;
                    return (
                      <button
                        key={langItem.code}
                        type="button"
                        onClick={() => setSelectedLang(langItem.code)}
                        style={{
                          padding: '0.75rem',
                          borderRadius: 'var(--radius-md)',
                          border: isChosen ? '2px solid #EA580C' : '1px solid var(--border-subtle)',
                          background: isChosen ? '#FFF7ED' : '#F8FAFC',
                          textAlign: 'left',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: isChosen ? '#9A3412' : 'var(--navy-deep)' }}>
                          {langItem.nativeName}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          {langItem.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Confirmation Action */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn btn-ghost"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleConfirmLanguage}
                className="btn btn-primary"
                style={{ padding: '0.85rem 2rem', fontWeight: 700 }}
              >
                <span>{t('confirmLanguage', selectedLang)}</span>
                <ArrowRight size={18} />
              </button>
            </div>

          </div>
        )}

        {/* ==============================================================
            STEP 3: VOICE-FIRST WELCOME & ACCESSIBLE ONBOARDING
            ============================================================== */}
        {step === 3 && (
          <div style={{ padding: '2.5rem 2rem', textAlign: 'center', overflowY: 'auto' }}>
            
            {/* Language Confirmation Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', background: '#F0FDFA', border: '1px solid #99F6E4', color: '#0F766E', fontSize: '0.82rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              <CheckCircle2 size={16} />
              <span>Language Configured: {SUPPORTED_LANGUAGES.find(l => l.code === selectedLang)?.nativeName} ({selectedState.name})</span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: 'var(--navy-deep)', fontWeight: 800, marginBottom: '0.5rem' }}>
              {t('voiceWelcomeHeading', selectedLang)}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
              {t('voiceWelcomeSubtitle', selectedLang)}
            </p>

            {/* Prominent Speaker Button */}
            <div style={{ marginBottom: '2.5rem' }}>
              <button
                type="button"
                onClick={toggleSpeakWelcome}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2rem',
                  borderRadius: 'var(--radius-full)',
                  background: isSpeaking ? 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)' : 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  boxShadow: isSpeaking ? '0 0 25px rgba(234, 88, 12, 0.5)' : '0 10px 25px rgba(13, 148, 136, 0.35)',
                  cursor: 'pointer',
                  transform: isSpeaking ? 'scale(1.03)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                {isSpeaking ? <VolumeX size={26} /> : <Volume2 size={26} />}
                <span>{isSpeaking ? t('stopSpeaking', selectedLang) : t('speakAloud', selectedLang)}</span>
              </button>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.65rem' }}>
                {t('voiceInstruction', selectedLang)}
              </div>
            </div>

            {/* Three Large Touch Targets for Rural Low-Literacy Mothers */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                maxWidth: '820px',
                margin: '0 auto 2.5rem'
              }}
            >
              {/* Action 1: My Health */}
              <button
                type="button"
                onClick={() => handleFinishOnboarding('MY_HEALTH')}
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #FDBA74',
                  borderRadius: 'var(--radius-xl)',
                  padding: '1.75rem 1.25rem',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-md)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: '#FFEDD5', color: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={32} />
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
                  1. {t('myHealthAction', selectedLang)}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {t('myHealthDesc', selectedLang)}
                </div>
              </button>

              {/* Action 2: My Next Visit */}
              <button
                type="button"
                onClick={() => handleFinishOnboarding('NEXT_VISIT')}
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #99F6E4',
                  borderRadius: 'var(--radius-xl)',
                  padding: '1.75rem 1.25rem',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-md)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: '#CCFBF1', color: '#0D9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={32} />
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
                  2. {t('myNextVisitAction', selectedLang)}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {t('myNextVisitDesc', selectedLang)}
                </div>
              </button>

              {/* Action 3: Help / ASHA Didi */}
              <button
                type="button"
                onClick={() => handleFinishOnboarding('HELP')}
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #BAE6FD',
                  borderRadius: 'var(--radius-xl)',
                  padding: '1.75rem 1.25rem',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-md)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={32} />
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
                  3. {t('helpAction', selectedLang)}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {t('helpDesc', selectedLang)}
                </div>
              </button>
            </div>

            {/* Back button */}
            <div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn btn-ghost"
                style={{ fontSize: '0.85rem' }}
              >
                ← Change Selected Language
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

