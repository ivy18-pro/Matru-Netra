import React from 'react';
import { Smartphone, Check, Heart, AlertTriangle, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export const AshaConnectionSection: React.FC = () => {
  return (
    <section 
      id="asha-connection"
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
            <UserCheck size={16} /> Section 03 • The Human Bridge
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
            CARE THAT REACHES <br />
            <span style={{ color: 'var(--teal-primary)' }}>BEYOND THE CLINIC.</span>
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            ASHA workers play an important role in connecting families with maternal and newborn healthcare services. 
            MATRU-NETRA aims to support their work through organised records and clearer follow-up tracking.
          </p>
        </div>

        {/* Content Showcase: Device & Care Record Interaction */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Context Card */}
          <div>
            <div style={{ 
              background: 'var(--cream-card)', 
              borderRadius: 'var(--radius-xl)', 
              padding: '2.5rem',
              border: '1px solid var(--cream-border)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'var(--teal-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--teal-primary)'
                }}>
                  <Smartphone size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--navy-deep)' }}>The ASHA Field Companion</h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Purpose-built for doorstep maternal health visits</div>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                In rural communities, the ASHA worker is often the only direct medical presence before labor. 
                Instead of carrying heavy physical registers through unpaved village roads, MATRU-NETRA gives 
                her an intuitive digital card that runs even when cellphone towers are kilometers away.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--teal-soft)', color: 'var(--teal-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={14} />
                  </div>
                  <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                    <strong>Instant Danger Sign Checks:</strong> Guides through headaches, swelling, reduced fetal kicks, or spotting.
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--teal-soft)', color: 'var(--teal-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={14} />
                  </div>
                  <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                    <strong>Offline Encrypted Storage:</strong> Vitals are saved safely on the smartphone without requiring active internet.
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--teal-soft)', color: 'var(--teal-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={14} />
                  </div>
                  <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                    <strong>Direct Doctor Escalation:</strong> High blood pressure or low hemoglobin automatically queues a case for the Medical Officer.
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={16} color="var(--teal-primary)" />
                <span>All records shown in demonstration are anonymized fictional test profiles.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Illustrated Care Record Mobile UI Mockup */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div 
              style={{
                width: '100%',
                maxWidth: '380px',
                background: '#0B1E36',
                borderRadius: '36px',
                padding: '12px',
                boxShadow: '0 25px 50px -12px rgba(11, 30, 54, 0.4)',
                border: '4px solid #1E3A5F',
                position: 'relative'
              }}
            >
              {/* Phone Speaker Notch */}
              <div style={{ width: '90px', height: '5px', background: '#334155', borderRadius: '10px', margin: '6px auto 14px' }} />

              {/* Mobile Screen Surface */}
              <div 
                style={{
                  background: '#F8FAFC',
                  borderRadius: '26px',
                  padding: '1.25rem',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)'
                }}
              >
                {/* Mobile App Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0F766E', textTransform: 'uppercase' }}>
                      ASHA Mobile • Offline Ready
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>ID: MOM-001</span>
                </div>

                {/* Mother Profile Badge */}
                <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '0.85rem', border: '1px solid #E2E8F0', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--navy-deep)' }}>Sunita Devi</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Age: 24 • Village Kalyanpur (G2P1)</div>
                    </div>
                    <span className="badge badge-danger" style={{ fontSize: '0.68rem' }}>
                      High Risk
                    </span>
                  </div>
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', fontSize: '0.75rem' }}>
                    <span style={{ background: '#F1F5F9', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>28 Wks</span>
                    <span style={{ background: '#F1F5F9', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>EDD: Jan 23, 2027</span>
                  </div>
                </div>

                {/* Vitals Recorded Card */}
                <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '0.85rem', border: '1px solid #E2E8F0', marginBottom: '0.85rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--navy-deep)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Today's Home Check-up Vitals
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.82rem' }}>
                    <div style={{ background: '#FEF2F2', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #FEE2E2' }}>
                      <div style={{ fontSize: '0.68rem', color: '#991B1B', fontWeight: 700 }}>Blood Pressure</div>
                      <div style={{ fontWeight: 800, color: '#B91C1C' }}>142 / 92 mmHg ⚠️</div>
                    </div>
                    <div style={{ background: '#F0FDF4', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #DCFCE7' }}>
                      <div style={{ fontSize: '0.68rem', color: '#166534', fontWeight: 700 }}>Hemoglobin</div>
                      <div style={{ fontWeight: 800, color: '#15803D' }}>10.6 g/dL</div>
                    </div>
                    <div style={{ background: '#F8FAFC', padding: '0.4rem 0.6rem', borderRadius: '6px' }}>
                      <div style={{ fontSize: '0.68rem', color: '#64748B' }}>Weight</div>
                      <div style={{ fontWeight: 700 }}>58.4 kg</div>
                    </div>
                    <div style={{ background: '#F8FAFC', padding: '0.4rem 0.6rem', borderRadius: '6px' }}>
                      <div style={{ fontSize: '0.68rem', color: '#64748B' }}>Fetal Heart</div>
                      <div style={{ fontWeight: 700 }}>144 bpm</div>
                    </div>
                  </div>
                </div>

                {/* Decision Support Triggered Notification */}
                <div style={{ background: '#FFFBEB', borderRadius: 'var(--radius-md)', padding: '0.75rem', border: '1px solid #FDE68A', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#B45309', fontWeight: 700, fontSize: '0.75rem' }}>
                    <AlertTriangle size={14} /> Triage Alert Created
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#78350F', marginTop: '0.2rem' }}>
                    Elevated BP flagged for Dr. Priya Sharma at PHC Rampur. Follow-up consultation scheduled.
                  </div>
                </div>

                {/* Action button */}
                <div 
                  style={{
                    background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
                    color: '#FFFFFF',
                    textAlign: 'center',
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(13, 148, 136, 0.3)'
                  }}
                >
                  Record Saved • Syncs Upon Cellular Range
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
