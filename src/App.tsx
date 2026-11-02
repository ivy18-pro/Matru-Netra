import React, { useEffect } from 'react';
import { CareProvider, useCare } from './context/CareContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AshaDashboard } from './components/dashboards/AshaDashboard';
import { DoctorDashboard } from './components/dashboards/DoctorDashboard';
import { MotherDashboard } from './components/dashboards/MotherDashboard';
import { AuthModal } from './components/auth/AuthModal';
import { PendingVerificationView } from './components/auth/PendingVerificationView';
import { RegionLanguageModal } from './components/onboarding/RegionLanguageModal';
import { ShieldAlert, ArrowRight } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { 
    activeView, 
    currentRole, 
    currentUser, 
    setActiveView, 
    setLoginModalOpen,
    regionModalOpen,
    setRegionModalOpen,
    setRegionAndLanguage
  } = useCare();

  // Route Guard: If a visitor attempts to access portal view without authentication,
  // safely route them back to landing and trigger the authentication modal.
  useEffect(() => {
    if (activeView === 'portal' && (!currentUser || currentRole === 'guest')) {
      setActiveView('landing');
      setLoginModalOpen(true);
    }
  }, [activeView, currentUser, currentRole, setActiveView, setLoginModalOpen]);

  return (
    <div className="app-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Universal Header with Navigation, Role Badge & User Profile */}
      <Navbar />

      {/* Main Content Area with Protected Routes */}
      <div style={{ flex: 1 }}>
        {activeView === 'landing' ? (
          <LandingPage />
        ) : (
          /* Protected Portal Area: strictly verified against currentUser.role */
          currentUser ? (
            currentUser.accountStatus === 'pending_approval' ? (
              <PendingVerificationView />
            ) : (
              <>
                {currentRole === 'asha' && currentUser.role === 'asha' && <AshaDashboard />}
                {currentRole === 'doctor' && currentUser.role === 'doctor' && <DoctorDashboard />}
                {currentRole === 'mother' && currentUser.role === 'mother' && <MotherDashboard />}

                {/* Guard against mismatched state */}
                {currentRole !== currentUser.role && (
                  <div style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
                    <div style={{ maxWidth: '520px', margin: '0 auto', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 'var(--radius-xl)', padding: '2.5rem' }}>
                      <ShieldAlert size={48} color="#DC2626" style={{ margin: '0 auto 1rem' }} />
                      <h2 style={{ fontSize: '1.4rem', color: '#991B1B', marginBottom: '0.75rem' }}>Access Restricted</h2>
                      <p style={{ color: '#7F1D1D', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                        Your authenticated account does not have permission to access this clinical view.
                      </p>
                      <button
                        onClick={() => setActiveView('landing')}
                        className="btn btn-primary"
                      >
                        Return to Safe Home
                      </button>
                    </div>
                  </div>
                )}
              </>
            )
          ) : (
            /* Unauthenticated fallback banner */
            <div style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
              <div style={{ maxWidth: '520px', margin: '0 auto', background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', boxShadow: 'var(--shadow-lg)' }}>
                <h2 style={{ fontSize: '1.4rem', color: 'var(--navy-deep)', marginBottom: '0.75rem' }}>Authentication Required</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                  Please sign in with your authorized credentials to view clinical patient records.
                </p>
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="btn btn-primary"
                  style={{ padding: '0.85rem 1.5rem' }}
                >
                  <span>Sign In / Register</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {/* Global Authentication Modal (Role-Specific Gateway) */}
      <AuthModal />

      {/* Interactive India Map & Multilingual Voice Onboarding Gateway */}
      <RegionLanguageModal 
        isOpen={regionModalOpen}
        onClose={() => setRegionModalOpen(false)}
        onComplete={(st, dist, lang) => {
          setRegionAndLanguage(st, dist, lang);
          setRegionModalOpen(false);
        }}
      />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CareProvider>
      <MainAppContent />
    </CareProvider>
  );
};

export default App;
