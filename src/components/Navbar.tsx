import React, { useState } from 'react';
import { useCare } from '../context/CareContext';
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  User, 
  Heart, 
  Stethoscope, 
  Users, 
  LogOut, 
  ChevronDown,
  ShieldCheck,
  LayoutDashboard,
  MapPin,
  Globe
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';

export const Navbar: React.FC = () => {
  const { 
    currentRole, 
    currentUser, 
    activeView, 
    setActiveView, 
    openLoginForRole, 
    logout, 
    isOffline, 
    toggleOfflineMode, 
    offlineQueue, 
    isSyncing, 
    syncOfflineQueue, 
    audioPlaying, 
    toggleAudio,
    language,
    setLanguage,
    setLoginModalOpen,
    selectedState,
    selectedDistrict,
    setRegionModalOpen
  } = useCare();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="navbar-container" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: activeView === 'landing' ? 'rgba(7, 21, 41, 0.94)' : 'rgba(255, 255, 255, 0.96)',
      backdropFilter: 'blur(16px)',
      borderBottom: activeView === 'landing' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E2E8F0',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveView('landing')} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0D9488 0%, #0B1E36 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(13, 148, 136, 0.35)',
            border: '1.5px solid rgba(255, 255, 255, 0.2)'
          }}>
            <Heart size={22} color="#FDFBF7" fill="#14B8A6" />
          </div>
          <div>
            <div style={{ 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 800, 
              fontSize: '1.25rem', 
              letterSpacing: '0.04em',
              color: activeView === 'landing' ? '#FFFFFF' : 'var(--navy-deep)',
              lineHeight: 1.1
            }}>
              MATRU-NETRA
            </div>
            <div style={{ 
              fontSize: '0.68rem', 
              fontWeight: 600, 
              color: activeView === 'landing' ? '#14B8A6' : 'var(--teal-primary)', 
              letterSpacing: '0.08em', 
              textTransform: 'uppercase' 
            }}>
              Maternal Care Net-Grid
            </div>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <button
            onClick={() => setActiveView('landing')}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: activeView === 'landing' ? '#FFFFFF' : 'var(--text-secondary)',
              background: activeView === 'landing' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
              transition: 'var(--transition-fast)'
            }}
          >
            Story Journey
          </button>

          {/* If authenticated: Show direct link to authorized dashboard */}
          {currentUser && (
            <button
              onClick={() => setActiveView('portal')}
              style={{
                padding: '0.45rem 0.95rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.88rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: activeView === 'portal' ? '#FFFFFF' : (activeView === 'landing' ? '#5EEAD4' : 'var(--teal-dark)'),
                background: activeView === 'portal' ? 'var(--teal-primary)' : 'rgba(20, 184, 166, 0.15)',
                transition: 'var(--transition-fast)'
              }}
            >
              <LayoutDashboard size={16} />
              <span>
                {currentUser.accountStatus === 'pending_approval' 
                  ? 'Verification Status' 
                  : (currentRole === 'doctor' ? 'Doctor Station' : (currentRole === 'asha' ? 'ASHA Field Workspace' : 'My Care Portal'))}
              </span>
            </button>
          )}

          {/* If unauthenticated: Show Role-Specific Authentication Gateways */}
          {!currentUser && (
            <>
              <button
                onClick={() => openLoginForRole('doctor')}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: activeView === 'landing' ? '#BAE6FD' : '#0369A1',
                  background: 'transparent',
                  transition: 'var(--transition-fast)'
                }}
              >
                <Stethoscope size={15} /> Doctor
              </button>

              <button
                onClick={() => openLoginForRole('asha')}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: activeView === 'landing' ? '#99F6E4' : 'var(--teal-dark)',
                  background: 'transparent',
                  transition: 'var(--transition-fast)'
                }}
              >
                <Users size={15} /> ASHA
              </button>

              <button
                onClick={() => openLoginForRole('mother')}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: activeView === 'landing' ? '#FED7AA' : '#C2410C',
                  background: 'transparent',
                  transition: 'var(--transition-fast)'
                }}
              >
                <Heart size={15} /> Mother
              </button>
            </>
          )}
        </nav>

        {/* Right Status & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Ambient Rural Flute Sound Toggle */}
          <button
            onClick={toggleAudio}
            title={audioPlaying ? 'Mute Ambient Village Audio' : 'Play Soothing Ambient Village Audio'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: audioPlaying 
                ? 'rgba(217, 119, 6, 0.2)' 
                : (activeView === 'landing' ? 'rgba(255, 255, 255, 0.08)' : 'var(--cream-surface)'),
              border: audioPlaying 
                ? '1px solid #F59E0B' 
                : (activeView === 'landing' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid var(--border-subtle)'),
              color: audioPlaying ? '#F59E0B' : (activeView === 'landing' ? '#E2E8F0' : 'var(--text-secondary)'),
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {audioPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span style={{ fontSize: '0.75rem' }}>
              {audioPlaying ? 'Audio ON' : 'Audio'}
            </span>
          </button>

          {/* Interactive Network Connectivity Toggle Badge */}
          <button
            onClick={() => toggleOfflineMode()}
            title="Click to simulate network disconnection / reconnect"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              background: isOffline ? '#FEF3C7' : '#DEF7EC',
              border: `1px solid ${isOffline ? '#F59E0B' : '#31C48D'}`,
              color: isOffline ? '#92400E' : '#03543F',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: isOffline ? '0 0 10px rgba(245, 158, 11, 0.4)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {isOffline ? <WifiOff size={15} color="#D97706" /> : <Wifi size={15} color="#057A55" />}
            <span>{isOffline ? 'OFFLINE' : 'ONLINE'}</span>
          </button>

          {/* Sync Queue Counter & Manual Trigger */}
          {offlineQueue.length > 0 && (
            <button
              onClick={() => syncOfflineQueue()}
              disabled={isSyncing || isOffline}
              title={isOffline ? 'Cannot sync while offline. Toggle Online first.' : 'Sync queued updates to PHC grid'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                background: '#E0E7FF',
                border: '1px solid #818CF8',
                color: '#3730A3',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: (isSyncing || isOffline) ? 'not-allowed' : 'pointer',
                opacity: isOffline ? 0.7 : 1
              }}
            >
              <RefreshCw size={13} className={isSyncing ? 'animate-spin-slow' : ''} />
              <span>{isSyncing ? 'Syncing...' : `${offlineQueue.length} Pending`}</span>
            </button>
          )}

          {/* Interactive Region & India Map Selector Button */}
          <button
            onClick={() => setRegionModalOpen(true)}
            title="Open Interactive Map of India & Regional Language Onboarding"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: activeView === 'landing' ? 'rgba(20, 184, 166, 0.18)' : '#ECFDF5',
              border: activeView === 'landing' ? '1px solid rgba(45, 212, 191, 0.4)' : '1px solid #A7F3D0',
              color: activeView === 'landing' ? '#5EEAD4' : '#065F46',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <MapPin size={14} color={activeView === 'landing' ? '#2DD4BF' : '#059669'} />
            <span style={{ maxWidth: '140px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {selectedState ? `${selectedState}${selectedDistrict ? ` • ${selectedDistrict}` : ''}` : 'Map / Region'}
            </span>
          </button>

          {/* Multilingual Switcher - 11 Regional Languages */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Globe 
              size={14} 
              style={{ 
                position: 'absolute', 
                left: '0.55rem', 
                pointerEvents: 'none',
                color: activeView === 'landing' ? '#94A3B8' : '#64748B'
              }} 
            />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              aria-label="Select Language"
              style={{
                padding: '0.4rem 0.65rem 0.4rem 1.8rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.78rem',
                fontWeight: 600,
                background: activeView === 'landing' ? 'rgba(255, 255, 255, 0.12)' : 'var(--cream-surface)',
                color: activeView === 'landing' ? '#FFFFFF' : 'var(--navy-deep)',
                border: activeView === 'landing' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid var(--border-subtle)',
                outline: 'none',
                cursor: 'pointer',
                maxWidth: '150px'
              }}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} style={{ color: '#0F172A', background: '#FFFFFF' }}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          {/* User Profile / Real Sign In Button */}
          {currentUser ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  background: activeView === 'landing' ? 'rgba(255, 255, 255, 0.14)' : '#FFFFFF',
                  border: activeView === 'landing' ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid var(--border-strong)',
                  color: activeView === 'landing' ? '#FFFFFF' : 'var(--navy-deep)',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <span>{currentUser.avatar}</span>
                <span>{currentUser.name.split(' ')[0]}</span>
                <span 
                  style={{
                    fontSize: '0.68rem',
                    padding: '0.15rem 0.45rem',
                    borderRadius: 'var(--radius-full)',
                    background: currentUser.accountStatus === 'pending_approval' ? '#D97706' : (currentRole === 'doctor' ? '#0284C7' : (currentRole === 'asha' ? 'var(--teal-primary)' : '#EA580C')),
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                    fontWeight: 800
                  }}
                >
                  {currentUser.accountStatus === 'pending_approval' ? 'Pending Review' : currentRole}
                </span>
                <ChevronDown size={14} />
              </button>

              {userDropdownOpen && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    width: '240px',
                    background: '#FFFFFF',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.65rem',
                    zIndex: 200
                  }}
                >
                  <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #F1F5F9', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                      Authenticated Account
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--navy-deep)' }}>
                      {currentUser.name}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--teal-primary)', fontWeight: 600 }}>
                      {currentUser.designation}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem' }}>
                      {currentUser.location}
                    </div>
                  </div>

                  <button
                    onClick={() => { setActiveView('portal'); setUserDropdownOpen(false); }}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--navy-deep)',
                      background: '#F8FAFC',
                      marginBottom: '0.35rem'
                    }}
                  >
                    <LayoutDashboard size={15} color="var(--teal-primary)" />
                    <span>Go to My Dashboard</span>
                  </button>

                  <button
                    onClick={() => { logout(); setUserDropdownOpen(false); }}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#DC2626',
                      background: 'rgba(239, 68, 68, 0.08)'
                    }}
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setLoginModalOpen(true)}
              className="btn btn-primary"
              style={{
                padding: '0.45rem 1rem',
                fontSize: '0.84rem',
                fontWeight: 700
              }}
            >
              <User size={15} />
              <span>Sign In</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
