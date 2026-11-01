import React from 'react';
import { useCare } from '../context/CareContext';
import { Users, Stethoscope, Heart, ArrowRight, CheckCircle, ShieldCheck, Zap } from 'lucide-react';

export const AppTransitionSection: React.FC = () => {
  const { openLoginForRole, setLoginModalOpen } = useCare();

  return (
    <section 
      id="app-transition"
      style={{
        padding: '6rem 0',
        background: 'var(--cream-surface)',
        color: 'var(--text-primary)',
        position: 'relative'
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--teal-primary)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            <Zap size={16} /> Section 07 • Enter The Live Platform
          </div>
          <h2 
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: 'var(--navy-deep)',
              lineHeight: 1.15,
              marginBottom: '1.25rem'
            }}
          >
            FROM A CARE STORY TO <br />
            <span style={{ color: 'var(--teal-primary)' }}>A WORKING SOLUTION.</span>
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Meet the digital platform designed to help rural mothers, ASHA workers, and doctors stay 
            connected throughout the maternal-care journey. Select a role below to explore its tailored workspace.
          </p>
        </div>

        {/* Three Role Cards */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Card 1: ASHA Worker */}
          <div 
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem 2rem',
              border: '1px solid var(--cream-border)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.3s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'var(--teal-soft)',
                  color: 'var(--teal-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Users size={28} />
                </div>
                <span className="badge badge-normal" style={{ fontSize: '0.72rem' }}>
                  Field Coordinator
                </span>
              </div>

              <h3 style={{ fontSize: '1.5rem', color: 'var(--navy-deep)', marginBottom: '0.5rem' }}>
                ASHA Worker Portal
              </h3>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--teal-primary)', marginBottom: '1rem' }}>
                Field Persona: Anita Devi (Sub-Centre Kalyanpur)
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Register expectant mothers, log ANC/PNC visits offline, screen for high-risk warning signs, and manage village follow-up checklists.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  <CheckCircle size={15} color="var(--teal-primary)" />
                  <span>Doorstep Offline Visit Recorder</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  <CheckCircle size={15} color="var(--teal-primary)" />
                  <span>Automated Danger Sign Screeners</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  <CheckCircle size={15} color="var(--teal-primary)" />
                  <span>Sub-Centre Roster & New Mother Registration</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openLoginForRole('asha')}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              <span>Authenticate as ASHA Worker</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Card 2: Doctor / PHC */}
          <div 
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem 2rem',
              border: '1px solid var(--cream-border)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.3s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: '#E0F2FE',
                  color: '#0284C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Stethoscope size={28} />
                </div>
                <span className="badge badge-info" style={{ fontSize: '0.72rem' }}>
                  Medical Officer
                </span>
              </div>

              <h3 style={{ fontSize: '1.5rem', color: 'var(--navy-deep)', marginBottom: '0.5rem' }}>
                Doctor / PHC Portal
              </h3>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0284C7', marginBottom: '1rem' }}>
                Clinical Persona: Dr. Priya Sharma, MBBS, DGO
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Review high-priority triage cases flagged by field ASHAs, evaluate longitudinal vitals trends, enter clinical notes, and coordinate hospital referrals.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  <CheckCircle size={15} color="#0284C7" />
                  <span>High-Risk Case Triage Queue</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  <CheckCircle size={15} color="#0284C7" />
                  <span>Longitudinal BP & Hb Trend Curves</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  <CheckCircle size={15} color="#0284C7" />
                  <span>Prescription & 102 Transport Voucher Authorization</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openLoginForRole('doctor')}
              className="btn"
              style={{ width: '100%', padding: '0.85rem', background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)', color: '#FFFFFF' }}
            >
              <span>Authenticate as Doctor</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Card 3: Mother / Patient */}
          <div 
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem 2rem',
              border: '1px solid var(--cream-border)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.3s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: '#FFEDD5',
                  color: '#EA580C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Heart size={28} />
                </div>
                <span className="badge badge-warning" style={{ fontSize: '0.72rem' }}>
                  Beneficiary
                </span>
              </div>

              <h3 style={{ fontSize: '1.5rem', color: 'var(--navy-deep)', marginBottom: '0.5rem' }}>
                Mother & Family Portal
              </h3>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#EA580C', marginBottom: '1rem' }}>
                Beneficiary Persona: Sunita Devi (Week 28)
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Track baby growth with warm visual analogies, view verified checkup dates, read bilingual doctor advice, and access 1-click ASHA Didi lifeline.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  <CheckCircle size={15} color="#EA580C" />
                  <span>Trimester Timeline & Countdown</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  <CheckCircle size={15} color="#EA580C" />
                  <span>Multilingual Support (English, हिंदी, বাংলা)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  <CheckCircle size={15} color="#EA580C" />
                  <span>Verified Doctor Prescription & Danger Signs</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openLoginForRole('mother')}
              className="btn btn-coral"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              <span>Authenticate / Register as Mother</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Guided Tour Banner for Ideathon Evaluators */}
        <div 
          style={{
            background: 'linear-gradient(135deg, var(--navy-deep) 0%, #102A4C 100%)',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem 2.5rem',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#FDE68A', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <Zap size={15} /> National Ideathon Evaluator Shortcut
            </div>
            <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginTop: '0.25rem' }}>
              Want to see the entire 7-step connected workflow in 2 minutes?
            </h3>
            <p style={{ color: '#CBD5E1', fontSize: '0.92rem', maxWidth: '680px', marginTop: '0.35rem' }}>
              Launch our guided interactive walkthrough that tracks Sunita's elevated BP from ASHA field recording, through Dr. Priya's clinical triage, to Sunita's updated care plan.
            </p>
          </div>

          <button
            onClick={() => setLoginModalOpen(true)}
            className="btn btn-gold"
            style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}
          >
            <Zap size={18} />
            <span>Open Authentication Gateway</span>
          </button>
        </div>

      </div>
    </section>
  );
};
