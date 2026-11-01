import React from 'react';
import { ScrollStorytelling } from './ScrollStorytelling';
import { useCare } from '../context/CareContext';
import { Heart, ShieldCheck, Activity, Users, Stethoscope, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { openLoginForRole, setLoginModalOpen } = useCare();

  return (
    <main style={{ background: '#071529' }}>
      
      {/* 
        ============================================================
        1. THE CINEMATIC SCROLL-DRIVEN STORYTELLING EXPERIENCE
        Seamless 7-Scene Continuous Scroll Journey:
        Scene 1: A Mother's Journey Begins (Dawn & Hope)
        Scene 2: The Pregnancy Journey (Antenatal ANC 1–4 Timeline)
        Scene 3: The Transition to Motherhood (Smooth Iris Bloom & New Life)
        Scene 4: Newborn Care & Follow-ups (Postnatal PNC 42 Days Continuum)
        Scene 5: Three People, One Connected Journey (Triad Network & Record Transfer)
        Scene 6: Built for Rural Realities (Live 6-Stage Offline Sync Simulator)
        Scene 7: Enter the Real Application (Interactive 3-Role Portals)
        ============================================================
      */}
      <ScrollStorytelling />

      {/* 
        ============================================================
        2. SYSTEM ARCHITECTURE & IDEATHON CREDENTIALS
        ============================================================
      */}
      <section 
        id="technical-overview"
        style={{
          background: 'var(--navy-deep)',
          color: '#FFFFFF',
          padding: '6rem 0 5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative'
        }}
      >
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 4rem' }}>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#14B8A6',
                fontWeight: 700,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.75rem'
              }}
            >
              <Zap size={16} /> Clinical Triad & Network Topology
            </div>
            <h2 
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 3.8vw, 3rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.18,
                marginBottom: '1rem'
              }}
            >
              ENGINEERED FOR CLINICAL IMPACT IN LOW-RESOURCE ENVIRONMENTS
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#CBD5E1', lineHeight: 1.6 }}>
              MATRU-NETRA resolves the gap between rural doorstep field observations and primary health centre doctor review with end-to-end follow-up tracking.
            </p>
          </div>

          {/* 3 Value Pillars */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '4.5rem'
            }}
          >
            <div 
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '2.25rem 1.75rem'
              }}
            >
              <div 
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'rgba(20, 184, 166, 0.2)',
                  color: '#14B8A6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}
              >
                <Activity size={26} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '0.6rem' }}>
                Zero Missed Visits
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.6 }}>
                Longitudinal tracking across ANC 1–4 and PNC Days 1, 3, 7, 14, 28, and 42 guarantees that high-risk warning signs are flagged early rather than discovered in critical emergencies.
              </p>
            </div>

            <div 
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '2.25rem 1.75rem'
              }}
            >
              <div 
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'rgba(245, 158, 11, 0.2)',
                  color: '#F59E0B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}
              >
                <ShieldCheck size={26} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '0.6rem' }}>
                Conflict-Free Offline Storage
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.6 }}>
                ASHA workers commit encrypted health records locally in remote hamlets without cellular tower connection. Records sync automatically when reaching PHC or cellular range.
              </p>
            </div>

            <div 
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '2.25rem 1.75rem'
              }}
            >
              <div 
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'rgba(2, 132, 199, 0.2)',
                  color: '#38BDF8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}
              >
                <Stethoscope size={26} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '0.6rem' }}>
                Direct PHC Clinical Triage
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.6 }}>
                Medical Officers view high-risk maternal alerts on a prioritized dashboard, authorizing Janani Suraksha Yojana ambulance vouchers and emergency referrals instantly.
              </p>
            </div>
          </div>

          {/* National Ideathon Call to Action Banner */}
          <div 
            style={{
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.15) 0%, rgba(11, 30, 54, 0.8) 100%)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(20, 184, 166, 0.35)',
              padding: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}
          >
            <div>
              <div style={{ color: '#FDE68A', fontWeight: 800, fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                National Healthcare Innovation Ideathon 2026
              </div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                Ready to evaluate the live role dashboards?
              </h4>
              <p style={{ color: '#CBD5E1', fontSize: '0.92rem', maxWidth: '640px' }}>
                Test the three authenticated workflows, add doorstep visit records, simulate offline synchronization, and review clinical triage notes.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => openLoginForRole('asha')}
                className="btn btn-primary"
                style={{ padding: '0.85rem 1.4rem' }}
              >
                <span>Sign In as ASHA Worker</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => setLoginModalOpen(true)}
                className="btn btn-gold"
                style={{ padding: '0.85rem 1.4rem' }}
              >
                <Zap size={18} />
                <span>Sign In / Register</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 
        ============================================================
        3. FOOTER
        ============================================================
      */}
      <footer style={{ background: '#050D18', color: '#94A3B8', padding: '4rem 0 2.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#FFFFFF', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                <Heart size={20} fill="#14B8A6" color="#14B8A6" />
                <span>MATRU-NETRA</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#CBD5E1', lineHeight: 1.6 }}>
                Maternal Care Net-Grid: A cinematic, offline-first healthcare platform connecting rural mothers, ASHA workers, and PHC doctors across the complete pregnancy and newborn continuum.
              </p>
            </div>

            <div>
              <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Story & Workflow Navigation
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <li><a href="#technical-overview" style={{ color: '#CBD5E1' }}>Antenatal Continuum (ANC 1–4)</a></li>
                <li><a href="#technical-overview" style={{ color: '#CBD5E1' }}>ASHA Doorstep Technology</a></li>
                <li><a href="#technical-overview" style={{ color: '#CBD5E1' }}>Postnatal Care (PNC 42 Days)</a></li>
                <li><a href="#technical-overview" style={{ color: '#CBD5E1' }}>The Care Triad Model</a></li>
                <li><a href="#technical-overview" style={{ color: '#CBD5E1' }}>Offline Mesh Architecture</a></li>
              </ul>
            </div>

            <div>
              <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Presentation Credentials
              </div>
              <p style={{ fontSize: '0.85rem', color: '#CBD5E1', lineHeight: 1.6 }}>
                Developed for the National Healthcare Innovation Ideathon. Features verifiable offline queueing, clinical risk triage workflows, and maternal care continuity.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.75rem', color: '#14B8A6', fontSize: '0.8rem', fontWeight: 700 }}>
                <ShieldCheck size={16} /> Certified Safe Demonstration Dataset
              </div>
            </div>

          </div>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.78rem' }}>
            <div>
              © 2026 MATRU-NETRA — Maternal Care Net-Grid. All Rights Reserved.
            </div>
            <div>
              Designed with dignity, hope, and technical excellence for rural India.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};
