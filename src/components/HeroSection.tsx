import React from 'react';
import { useCare } from '../context/CareContext';
import { ArrowDown, ShieldCheck, Heart, Sparkles, Activity } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  const { setLoginModalOpen } = useCare();

  return (
    <section 
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: '#FFFFFF'
      }}
    >
      {/* Background Image with Layered Sunrise Gradients */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/assets/hero_pregnant_sunrise.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          transform: 'scale(1.02)',
          transition: 'transform 8s ease'
        }}
      />

      {/* Atmospheric lighting overlay: Warm morning sunrise glow & deep navy contrast */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 65% 25%, rgba(245, 158, 11, 0.28) 0%, rgba(11, 30, 54, 0.65) 60%, rgba(8, 20, 38, 0.94) 100%)'
        }}
      />

      {/* Floating subtle morning golden rays */}
      <div 
        style={{
          position: 'absolute',
          top: '-10%',
          right: '15%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      {/* Content Container */}
      <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '6rem 1rem 4rem' }}>
        
        {/* Sub-badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <span 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.14)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.28)',
              color: '#FDE68A',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}
          >
            <Sparkles size={16} color="#F59E0B" />
            Rural India Maternal & Newborn Care Net-Grid
          </span>
        </div>

        {/* Main Heading */}
        <h1 
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#FFFFFF',
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.7)',
            maxWidth: '1020px',
            margin: '0 auto 1.5rem',
            letterSpacing: '-0.02em'
          }}
        >
          EVERY MOTHER DESERVES <br />
          <span style={{ 
            background: 'linear-gradient(135deg, #FDE68A 0%, #14B8A6 60%, #F59E0B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            CONNECTED CARE.
          </span>
        </h1>

        {/* Supporting Editorial Text */}
        <p 
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
            fontWeight: 400,
            lineHeight: 1.6,
            color: '#E2E8F0',
            maxWidth: '780px',
            margin: '0 auto 2.5rem',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)'
          }}
        >
          From pregnancy to newborn care, MATRU-NETRA helps connect mothers, ASHA workers, 
          and healthcare providers throughout the care journey — even without cellular connectivity.
        </p>

        {/* Call to Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          <button 
            onClick={onExploreClick}
            className="btn btn-gold"
            style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}
          >
            <Heart size={20} />
            Explore the Journey
          </button>

          <button 
            onClick={() => setLoginModalOpen(true)}
            className="btn btn-outline-white"
            style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}
          >
            Sign In / Register
          </button>
        </div>

        {/* Key Credibility Pillars */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            maxWidth: '920px',
            margin: '0 auto',
            textAlign: 'left'
          }}
        >
          <div 
            style={{
              background: 'rgba(11, 30, 54, 0.72)',
              backdropFilter: 'blur(10px)',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.12)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#14B8A6', fontWeight: 700, marginBottom: '0.25rem' }}>
              <ShieldCheck size={18} /> Offline-First Mesh
            </div>
            <div style={{ fontSize: '0.84rem', color: '#CBD5E1' }}>
              Full field record logging without mobile reception; automatic sync upon reconnection.
            </div>
          </div>

          <div 
            style={{
              background: 'rgba(11, 30, 54, 0.72)',
              backdropFilter: 'blur(10px)',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.12)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F59E0B', fontWeight: 700, marginBottom: '0.25rem' }}>
              <Activity size={18} /> Clinical Triage
            </div>
            <div style={{ fontSize: '0.84rem', color: '#CBD5E1' }}>
              Transparent MoHFW guideline screening flags pre-eclampsia & severe anemia for doctors.
            </div>
          </div>

          <div 
            style={{
              background: 'rgba(11, 30, 54, 0.72)',
              backdropFilter: 'blur(10px)',
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.12)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FB7185', fontWeight: 700, marginBottom: '0.25rem' }}>
              <Heart size={18} /> Mother Continuity
            </div>
            <div style={{ fontSize: '0.84rem', color: '#CBD5E1' }}>
              Care does not stop at birth; comprehensive 42-day postnatal (PNC) & newborn care tracking.
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          onClick={onExploreClick}
          style={{
            marginTop: '3.5rem',
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            cursor: 'pointer',
            opacity: 0.85
          }}
        >
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FDE68A' }}>
            Scroll to discover the care journey
          </span>
          <ArrowDown size={18} className="animate-float" color="#FDE68A" />
        </div>

      </div>
    </section>
  );
};
