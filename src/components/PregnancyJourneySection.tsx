import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, AlertCircle, Sparkles, ChevronRight, FileText } from 'lucide-react';

export const PregnancyJourneySection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(2); // Default to ANC-3

  const milestones = [
    {
      id: 0,
      code: 'ANC-1',
      title: 'First Trimester: Registration & Baseline',
      timing: 'Weeks 8–12',
      status: 'Completed',
      focus: 'Early Pregnancy Registration',
      description: 'MCP Card issuance, Blood Group & Rh typing, Baseline Hemoglobin, Urine protein check, TT-1 booster, and 180-day supply of Iron-Folic Acid (IFA) supplements initiated.',
      ashaAction: 'ASHA registers family, logs baseline vitals, and dispenses IFA tablets with dietary guidance.'
    },
    {
      id: 1,
      code: 'ANC-2',
      title: 'Second Trimester: Anomaly Scan & Growth',
      timing: 'Weeks 14–26',
      status: 'Completed',
      focus: 'Fetal Development & Calcium',
      description: 'Second Tetanus Toxoid (TT-2) booster, ultrasound scan at PHC for anomaly screening, gestational weight monitoring, and 500mg daily calcium supplementation.',
      ashaAction: 'ASHA verifies clinic appointment attendance, reviews maternal nutrition, and logs fundal height.'
    },
    {
      id: 2,
      code: 'ANC-3',
      title: 'Third Trimester: BP & Pre-Eclampsia Vigilance',
      timing: 'Weeks 28–32',
      status: 'Follow-up required',
      focus: 'Hypertension & Anemia Screening',
      description: 'Critical screening for gestational hypertension (BP surveillance), fetal heart rate monitoring, spot hemoglobin repeat, and testing for protein in urine.',
      ashaAction: 'ASHA detects elevated BP (142/92), records pedal edema, and triggers an automated screening alert to PHC Doctor.'
    },
    {
      id: 3,
      code: 'ANC-4',
      title: 'Late Third Trimester: Birth Plan & Delivery',
      timing: 'Weeks 36–38',
      status: 'Scheduled',
      focus: 'Institutional Delivery Preparedness',
      description: 'Final institutional delivery confirmation at 24/7 PHC, 102 Janani Express ambulance route verification, birth companion briefing, and emergency blood donor standby.',
      ashaAction: 'ASHA ensures family has emergency transport voucher, clean hospital bag, and 24/7 PHC contact card ready.'
    }
  ];

  return (
    <section 
      id="pregnancy-journey"
      style={{
        padding: '6rem 0',
        background: 'linear-gradient(180deg, var(--navy-dark) 0%, var(--navy-deep) 100%)',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Background Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.22) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#14B8A6', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            <Calendar size={16} /> Section 02 • Antenatal Care Continuum
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
            A JOURNEY THAT NEEDS <br />
            <span style={{ color: '#FDE68A' }}>CONTINUOUS CARE.</span>
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#CBD5E1', lineHeight: 1.6 }}>
            Every stage of pregnancy brings important appointments and follow-ups. MATRU-NETRA is designed 
            to help make those milestones easier to organise and track across rural hamlets.
          </p>
        </div>

        {/* Interactive Timeline Stepper */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            position: 'relative',
            marginBottom: '3rem'
          }}
        >
          {milestones.map((m, idx) => {
            const isSelected = activeStep === idx;
            return (
              <div 
                key={m.id}
                onClick={() => setActiveStep(idx)}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '1.25rem 1rem',
                  borderRadius: 'var(--radius-lg)',
                  background: isSelected ? 'rgba(20, 184, 166, 0.16)' : 'rgba(255, 255, 255, 0.05)',
                  border: isSelected ? '1.5px solid #14B8A6' : '1px solid rgba(255, 255, 255, 0.12)',
                  transition: 'all 0.25s ease',
                  boxShadow: isSelected ? '0 0 20px rgba(20, 184, 166, 0.3)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ 
                    fontFamily: 'var(--font-heading)', 
                    fontWeight: 800, 
                    fontSize: '1.1rem',
                    color: isSelected ? '#FDE68A' : '#FFFFFF' 
                  }}>
                    {m.code}
                  </span>
                  
                  {m.status === 'Completed' ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#34D399', fontSize: '0.75rem', fontWeight: 700 }}>
                      <CheckCircle2 size={14} /> Completed
                    </span>
                  ) : m.status === 'Follow-up required' ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#F87171', fontSize: '0.75rem', fontWeight: 700 }}>
                      <AlertCircle size={14} /> Flagged
                    </span>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#93C5FD', fontSize: '0.75rem', fontWeight: 700 }}>
                      <Clock size={14} /> Scheduled
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '0.25rem' }}>
                  {m.timing}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                  {m.focus}
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestone Detail Inspector */}
        <div 
          style={{
            background: 'rgba(16, 42, 76, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '2.5rem',
            alignItems: 'center'
          }}
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#14B8A6', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <FileText size={16} /> Clinical Parameters & Checkup Roadmap
            </div>
            <h3 style={{ fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
              {milestones[activeStep].title}
            </h3>
            <p style={{ fontSize: '1.05rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {milestones[activeStep].description}
            </p>

            <div 
              style={{
                background: 'rgba(11, 30, 54, 0.7)',
                padding: '1.2rem 1.4rem',
                borderRadius: 'var(--radius-md)',
                borderLeft: '4px solid #14B8A6',
                marginBottom: '1rem'
              }}
            >
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#14B8A6', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Field ASHA Workflow Action
              </div>
              <div style={{ fontSize: '0.92rem', color: '#F1F5F9' }}>
                {milestones[activeStep].ashaAction}
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontStyle: 'italic' }}>
              * Demonstration guideline mapping aligned with Government of India MoHFW RMNCH+A guidelines. MATRU-NETRA coordinates care tracking and clinical review.
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div 
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 20px 30px rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <img 
              src="/assets/asha_home_visit.jpg" 
              alt="ASHA Worker consulting pregnant mother in rural courtyard" 
              style={{ width: '100%', height: '320px', objectFit: 'cover' }}
            />
            <div 
              style={{
                position: 'absolute',
                bottom: 0,
                insetInline: 0,
                background: 'linear-gradient(transparent, rgba(8, 20, 38, 0.95))',
                padding: '1.5rem',
                color: '#FFFFFF'
              }}
            >
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#FDE68A', fontWeight: 700 }}>
                Rural Community Point-of-Care
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                Village Kalyanpur: ASHA Anita Devi reviewing Sunita's ANC-3 schedule
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
