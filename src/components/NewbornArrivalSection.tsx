import React, { useState } from 'react';
import { Heart, Baby, Shield, Award, Clock, CheckCircle } from 'lucide-react';

export const NewbornArrivalSection: React.FC = () => {
  const [selectedPnc, setSelectedPnc] = useState(2); // Day 7 default

  const pncMilestones = [
    {
      day: 'Day 01',
      title: 'Immediate Newborn Thermal & Feeding Care',
      focus: 'First 24 Hours Post-Delivery',
      checks: ['Skin-to-skin contact for warmth', 'Breastfeeding within 1st hour', 'BCG, OPV-0, Hepatitis B birth vaccines', 'Maternal postpartum bleeding check']
    },
    {
      day: 'Day 03',
      title: 'Neonatal Home Assessment',
      focus: 'Early Home Transition',
      checks: ['Exclusive breastfeeding latch verification', 'Baby body temperature (36.5–37.5°C)', 'Umbilical stump clean & dry check', 'Counseling on newborn danger signs']
    },
    {
      day: 'Day 07',
      title: 'Jaundice & Sepsis Surveillance',
      focus: 'First Week Milestones',
      checks: ['Neonatal jaundice screening (eyes & skin)', 'Infant weight monitoring against birth weight', 'Maternal emotional recovery check', 'Hygiene & cord separation care']
    },
    {
      day: 'Day 14',
      title: 'Growth & Vital Milestones',
      focus: 'Second Week Check-up',
      checks: ['Infant regaining birth weight verification', 'Baby alertness & cry vigor check', 'Postnatal maternal hemoglobin review', 'Family planning counseling initiation']
    },
    {
      day: 'Day 28 & 42',
      title: 'Comprehensive 6-Week Completion',
      focus: 'End of Neonatal Period',
      checks: ['Pentavalent-1, Rotavirus, fIPV immunization', 'Growth milestone assessment', 'Maternal health sign-off', 'Transition to child growth registry']
    }
  ];

  return (
    <section 
      id="newborn-arrival"
      style={{
        padding: '6rem 0',
        background: 'linear-gradient(180deg, var(--navy-deep) 0%, #0F2542 100%)',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#FB7185', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            <Baby size={16} /> Section 04 • Postnatal Care & Beyond
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
            THE JOURNEY CONTINUES <br />
            <span style={{ color: '#FB7185' }}>AFTER BIRTH.</span>
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#CBD5E1', lineHeight: 1.6 }}>
            After delivery, mothers and newborns still need follow-up care. Missed visits and 
            disconnected records can make that journey harder to coordinate.
          </p>
        </div>

        {/* Visual Narrative Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Loving Mother & Newborn Image with Tender Narrative */}
          <div style={{ position: 'relative' }}>
            <div 
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                position: 'relative'
              }}
            >
              <img 
                src="/assets/mother_holding_newborn.jpg" 
                alt="Loving mother holding newborn baby in a warm rural home"
                style={{ width: '100%', height: '420px', objectFit: 'cover' }}
              />

              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(11, 30, 54, 0.92) 0%, rgba(11, 30, 54, 0.2) 60%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '2rem'
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#FDE68A', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  <Heart size={15} fill="#FDE68A" /> Dignified Maternal Continuity
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>
                  Radha Patel & Baby Aarav (Born at PHC Rampur)
                </div>
                <div style={{ fontSize: '0.88rem', color: '#CBD5E1' }}>
                  "Birth is a sacred milestone, not the end of maternal care. Continued visits protect both mother and child."
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Postnatal (PNC) Care Grid */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', color: '#14B8A6', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Government of India Home-Based Newborn Care (HBNC)
              </div>
              <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginTop: '0.25rem' }}>
                The 42-Day Postnatal Lifeline
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {pncMilestones.map((p, idx) => {
                const isSelected = selectedPnc === idx;
                return (
                  <div
                    key={p.day}
                    onClick={() => setSelectedPnc(idx)}
                    style={{
                      cursor: 'pointer',
                      padding: '1.1rem 1.25rem',
                      borderRadius: 'var(--radius-lg)',
                      background: isSelected ? 'rgba(251, 113, 133, 0.16)' : 'rgba(255, 255, 255, 0.05)',
                      border: isSelected ? '1.5px solid #FB7185' : '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ 
                          fontFamily: 'var(--font-heading)', 
                          fontWeight: 800, 
                          color: isSelected ? '#FB7185' : '#FDE68A',
                          fontSize: '1rem',
                          background: 'rgba(0,0,0,0.25)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px'
                        }}>
                          {p.day}
                        </span>
                        <span style={{ fontWeight: 700, fontSize: '0.98rem', color: '#FFFFFF' }}>
                          {p.title}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{p.focus}</span>
                    </div>

                    {isSelected && (
                      <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                          {p.checks.map((chk, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#E2E8F0' }}>
                              <CheckCircle size={14} color="#34D399" />
                              <span>{chk}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
