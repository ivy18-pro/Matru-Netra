import React, { useState } from 'react';
import { Users, Stethoscope, Heart, ArrowRight, ShieldCheck, Activity, CheckCircle2, ChevronRight } from 'lucide-react';

export const CareTriadSection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<'asha' | 'doctor' | 'mother'>('asha');

  return (
    <section 
      id="care-triad"
      style={{
        padding: '6rem 0',
        background: 'var(--cream-bg)',
        color: 'var(--text-primary)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--teal-primary)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            <Users size={16} /> Section 05 • The Care Triad
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
            THREE PEOPLE. <br />
            <span style={{ color: 'var(--teal-primary)' }}>ONE CONNECTED CARE JOURNEY.</span>
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            MATRU-NETRA brings different healthcare responsibilities into one coordinated workflow, 
            helping relevant users track care milestones and follow-up status.
          </p>
        </div>

        {/* 3-Way Triad Interactive Diagram */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          {/* Node 1: ASHA Worker */}
          <div 
            onClick={() => setActiveNode('asha')}
            style={{
              cursor: 'pointer',
              background: activeNode === 'asha' ? '#FFFFFF' : 'var(--cream-surface)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 1.5rem',
              border: activeNode === 'asha' ? '2px solid var(--teal-primary)' : '1px solid var(--cream-border)',
              boxShadow: activeNode === 'asha' ? '0 12px 28px rgba(13, 148, 136, 0.2)' : 'var(--shadow-sm)',
              transform: activeNode === 'asha' ? 'translateY(-4px)' : 'none',
              transition: 'all 0.25s ease',
              position: 'relative'
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'var(--teal-soft)',
              color: 'var(--teal-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Users size={28} />
            </div>

            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              First Responder & Coordinator
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--navy-deep)', margin: '0.25rem 0 0.5rem' }}>
              The ASHA Worker
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Conducts doorstep checkups, enters vitals offline, screens danger signs, and mobilizes institutional deliveries.
            </p>

            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--teal-primary)', fontWeight: 700, fontSize: '0.82rem' }}>
              <span>View Data Flow</span> <ChevronRight size={14} />
            </div>
          </div>

          {/* Node 2: Doctor / PHC */}
          <div 
            onClick={() => setActiveNode('doctor')}
            style={{
              cursor: 'pointer',
              background: activeNode === 'doctor' ? '#FFFFFF' : 'var(--cream-surface)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 1.5rem',
              border: activeNode === 'doctor' ? '2px solid #0284C7' : '1px solid var(--cream-border)',
              boxShadow: activeNode === 'doctor' ? '0 12px 28px rgba(2, 132, 199, 0.2)' : 'var(--shadow-sm)',
              transform: activeNode === 'doctor' ? 'translateY(-4px)' : 'none',
              transition: 'all 0.25s ease',
              position: 'relative'
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: '#E0F2FE',
              color: '#0284C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Stethoscope size={28} />
            </div>

            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0284C7', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Clinical Decision Maker
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--navy-deep)', margin: '0.25rem 0 0.5rem' }}>
              The PHC Doctor
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Reviews automated screening flags, analyzes longitudinal vitals curves, prescribes medicines, and confirms referrals.
            </p>

            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0284C7', fontWeight: 700, fontSize: '0.82rem' }}>
              <span>View Data Flow</span> <ChevronRight size={14} />
            </div>
          </div>

          {/* Node 3: Mother & Family */}
          <div 
            onClick={() => setActiveNode('mother')}
            style={{
              cursor: 'pointer',
              background: activeNode === 'mother' ? '#FFFFFF' : 'var(--cream-surface)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 1.5rem',
              border: activeNode === 'mother' ? '2px solid #EA580C' : '1px solid var(--cream-border)',
              boxShadow: activeNode === 'mother' ? '0 12px 28px rgba(234, 88, 12, 0.2)' : 'var(--shadow-sm)',
              transform: activeNode === 'mother' ? 'translateY(-4px)' : 'none',
              transition: 'all 0.25s ease',
              position: 'relative'
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: '#FFEDD5',
              color: '#EA580C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Heart size={28} />
            </div>

            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#EA580C', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Informed Beneficiary
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--navy-deep)', margin: '0.25rem 0 0.5rem' }}>
              Mother & Newborn
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Receives transparent appointment dates, doctor-approved guidance in local language, and immediate emergency contact.
            </p>

            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#EA580C', fontWeight: 700, fontSize: '0.82rem' }}>
              <span>View Data Flow</span> <ChevronRight size={14} />
            </div>
          </div>
        </div>

        {/* Live Interaction Demonstration Card */}
        <div 
          style={{
            background: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            border: '1px solid var(--cream-border)',
            boxShadow: 'var(--shadow-md)',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '2.5rem',
            alignItems: 'center'
          }}
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--teal-primary)', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              <Activity size={16} /> Closed-Loop Coordinated Care Protocol
            </div>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--navy-deep)', marginBottom: '0.75rem' }}>
              How MATRU-NETRA Synchronizes the Three Roles
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              When ASHA Anita Devi visits Sunita Devi in Kalyanpur village and logs a blood pressure of 142/92 mmHg:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--cream-surface)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--teal-primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800 }}>1</span>
                <span style={{ fontSize: '0.88rem', color: 'var(--navy-deep)' }}>
                  <strong>ASHA logs check-up:</strong> Record saved offline; syncs automatically once in range.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#E0F2FE', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0284C7', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800 }}>2</span>
                <span style={{ fontSize: '0.88rem', color: '#0369A1' }}>
                  <strong>Doctor reviews triage queue:</strong> Dr. Priya at PHC Rampur evaluates BP curve and enters action note.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#FFEDD5', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#EA580C', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800 }}>3</span>
                <span style={{ fontSize: '0.88rem', color: '#9A3412' }}>
                  <strong>Mother receives verified plan:</strong> Sunita sees her updated visit date and simplified care instruction.
                </span>
              </div>
            </div>
          </div>

          {/* Triad Visual Image */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)' }}>
            <img 
              src="/assets/rural_phc_doctor.jpg" 
              alt="Medical Officer at rural PHC reviewing patient care report with ASHA worker" 
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
            <div style={{ padding: '1rem', background: 'var(--navy-deep)', color: '#FFFFFF', fontSize: '0.82rem' }}>
              <div style={{ fontWeight: 700, color: '#14B8A6' }}>PHC Rampur Medical Hub</div>
              <div>Dr. Priya Sharma collaborating directly with field ASHA workers via shared care records.</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
