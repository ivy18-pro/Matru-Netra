import React, { useState } from 'react';
import { useCare } from '../context/CareContext';
import { Wifi, WifiOff, RefreshCw, Database, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const OfflineMeshSection: React.FC = () => {
  const { isOffline, toggleOfflineMode, offlineQueue, syncOfflineQueue, isSyncing, lastSyncedTime } = useCare();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: '1. No Cellular Connection',
      icon: <WifiOff size={22} color="#F59E0B" />,
      tag: 'Field Reality',
      description: 'ASHA worker is visiting a remote village hamlet behind hills where 2G/4G cellular reception is completely absent.'
    },
    {
      id: 1,
      title: '2. Record Saved Locally',
      icon: <Database size={22} color="#14B8A6" />,
      tag: 'Local Sandbox',
      description: 'Checkup vitals, danger sign observations, and supplement distribution logs are committed instantly to client storage.'
    },
    {
      id: 2,
      title: '3. Pending Sync Queue',
      icon: <RefreshCw size={22} color="#818CF8" />,
      tag: 'Queue Management',
      description: 'Records are assigned an offline UUID, cryptographically validated, and tagged with "Pending synchronisation".'
    },
    {
      id: 3,
      title: '4. Connectivity Restored',
      icon: <Wifi size={22} color="#10B981" />,
      tag: 'Auto-Detection',
      description: 'When the ASHA worker reaches the main village road or PHC Wi-Fi, the browser detects network restoration.'
    },
    {
      id: 4,
      title: '5. Sync Complete',
      icon: <CheckCircle2 size={22} color="#34D399" />,
      tag: 'PHC Grid Synced',
      description: 'Changes flush conflict-free to the central registry. Triage flags immediately appear on Dr. Priya Sharma’s PHC dashboard.'
    }
  ];

  return (
    <section 
      id="offline-mesh"
      style={{
        padding: '6rem 0',
        background: 'linear-gradient(180deg, var(--navy-dark) 0%, #071529 100%)',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Mesh Image with dark atmospheric overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/assets/connectivity_mesh.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.18,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#14B8A6', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            <Zap size={16} /> Section 06 • Rural Connectivity Architecture
          </div>
          <h2 
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.15,
              marginBottom: '1.25rem'
            }}
          >
            CARE SHOULD NOT DEPEND ON <br />
            <span style={{ color: '#FDE68A' }}>A PERFECT INTERNET CONNECTION.</span>
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#CBD5E1', lineHeight: 1.6 }}>
            MATRU-NETRA is designed around the challenges of rural connectivity, with offline-first 
            operation as a key development priority.
          </p>
        </div>

        {/* 5-Step Offline Sequence Roadmap */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem'
          }}
        >
          {steps.map((st, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <div
                key={st.id}
                onClick={() => setActiveStep(idx)}
                style={{
                  cursor: 'pointer',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  background: isCurrent ? 'rgba(20, 184, 166, 0.2)' : 'rgba(16, 42, 76, 0.65)',
                  border: isCurrent ? '1.5px solid #14B8A6' : '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.25s ease',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {st.icon}
                  </div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.1)', color: '#CBD5E1' }}>
                    {st.tag}
                  </span>
                </div>

                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.35rem' }}>
                  {st.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8', lineHeight: 1.4 }}>
                  {st.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Interactive Offline Simulator Widget */}
        <div 
          style={{
            background: 'rgba(11, 30, 54, 0.88)',
            backdropFilter: 'blur(16px)',
            borderRadius: 'var(--radius-xl)',
            border: '1.5px solid rgba(20, 184, 166, 0.35)',
            padding: '2.5rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', paddingBottom: '1.25rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#FDE68A', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <Zap size={15} /> Real Working Offline-First Engine
              </div>
              <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginTop: '0.25rem' }}>
                Interactive Network & Synchronization Simulator
              </h3>
            </div>

            {/* Hardware / Simulated State Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={() => toggleOfflineMode(!isOffline)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  background: isOffline ? '#F59E0B' : 'rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  cursor: 'pointer'
                }}
              >
                {isOffline ? <WifiOff size={16} /> : <Wifi size={16} />}
                <span>{isOffline ? 'Simulate Reconnect' : 'Simulate Network Drop'}</span>
              </button>

              <button
                onClick={() => syncOfflineQueue()}
                disabled={isSyncing || isOffline || offlineQueue.length === 0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  border: 'none',
                  opacity: (isSyncing || isOffline || offlineQueue.length === 0) ? 0.6 : 1,
                  cursor: (isSyncing || isOffline || offlineQueue.length === 0) ? 'not-allowed' : 'pointer'
                }}
              >
                <RefreshCw size={16} className={isSyncing ? 'animate-spin-slow' : ''} />
                <span>{isSyncing ? 'Syncing...' : 'Force Sync Queue'}</span>
              </button>
            </div>
          </div>

          {/* Current Engine Status Readout */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Network State</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: isOffline ? '#F59E0B' : '#34D399', marginTop: '0.25rem' }}>
                {isOffline ? '🔴 Disconnected (Remote Hamlet)' : '🟢 Connected (PHC Rampur Grid)'}
              </div>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Locally Queued Items</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: offlineQueue.length > 0 ? '#818CF8' : '#FFFFFF', marginTop: '0.25rem' }}>
                {offlineQueue.length} records awaiting upload
              </div>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Last Grid Sync</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FDE68A', marginTop: '0.25rem' }}>
                {lastSyncedTime}
              </div>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Storage Sandbox</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38BDF8', marginTop: '0.25rem' }}>
                Active IndexedDB / LocalStorage
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', fontSize: '0.82rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={16} color="#14B8A6" />
            <span>Try entering the ASHA portal, recording a checkup while offline, and then returning online to observe automatic background sync!</span>
          </div>

        </div>

      </div>
    </section>
  );
};
