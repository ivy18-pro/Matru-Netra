import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useCare } from '../context/CareContext';
import { 
  Heart, 
  Users, 
  Stethoscope, 
  Baby, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Wifi, 
  WifiOff, 
  Database, 
  RefreshCw, 
  Sparkles, 
  Calendar, 
  Activity, 
  Clock, 
  Compass, 
  ChevronDown, 
  ChevronRight, 
  Zap, 
  Play, 
  RotateCcw,
  Sliders,
  Check,
  AlertTriangle
} from 'lucide-react';

export const ScrollStorytelling: React.FC = () => {
  const { openLoginForRole, setLoginModalOpen, currentUser, currentRole, setActiveView } = useCare();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  // Detect reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Real-time, continuous scroll listener
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!containerRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const totalScrollable = rect.height - window.innerHeight;
          if (totalScrollable > 0) {
            const currentScroll = -rect.top;
            const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
            setScrollProgress(progress);

            // Determine active scene (0 to 6)
            if (progress < 0.15) setActiveSceneIndex(0);
            else if (progress < 0.30) setActiveSceneIndex(1);
            else if (progress < 0.45) setActiveSceneIndex(2);
            else if (progress < 0.60) setActiveSceneIndex(3);
            else if (progress < 0.74) setActiveSceneIndex(4);
            else if (progress < 0.88) setActiveSceneIndex(5);
            else setActiveSceneIndex(6);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Jump to specific scene helper
  const jumpToScene = (sceneIndex: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalScrollable = rect.height - window.innerHeight;

    // Target progress for each scene
    const targets = [0.03, 0.22, 0.37, 0.52, 0.66, 0.80, 0.95];
    const targetScroll = containerTop + (targets[sceneIndex] * totalScrollable);
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  // Helper to calculate clamped sub-progress within an interval
  const calcP = (start: number, end: number) => {
    if (scrollProgress <= start) return 0;
    if (scrollProgress >= end) return 1;
    return (scrollProgress - start) / (end - start);
  };

  // Scene Progress metrics
  const s1Progress = calcP(0.0, 0.16); // Scene 1
  const s2Progress = calcP(0.14, 0.31); // Scene 2
  const s3Progress = calcP(0.29, 0.46); // Scene 3 (Transition to Motherhood)
  const s4Progress = calcP(0.44, 0.61); // Scene 4 (Newborn Care)
  const s5Progress = calcP(0.59, 0.75); // Scene 5 (Triad Network)
  const s6Progress = calcP(0.73, 0.89); // Scene 6 (Offline Reality)
  const s7Progress = calcP(0.87, 1.00); // Scene 7 (Enter Application)

  // Scene Opacities for smooth cross-fading
  const s1Opacity = scrollProgress < 0.14 ? 1 : Math.max(0, 1 - (scrollProgress - 0.14) / 0.05);
  const s2Opacity = scrollProgress < 0.14 ? Math.max(0, (scrollProgress - 0.11) / 0.04) : (scrollProgress > 0.29 ? Math.max(0, 1 - (scrollProgress - 0.29) / 0.04) : 1);
  const s3Opacity = scrollProgress < 0.29 ? Math.max(0, (scrollProgress - 0.26) / 0.04) : (scrollProgress > 0.44 ? Math.max(0, 1 - (scrollProgress - 0.44) / 0.04) : 1);
  const s4Opacity = scrollProgress < 0.44 ? Math.max(0, (scrollProgress - 0.41) / 0.04) : (scrollProgress > 0.59 ? Math.max(0, 1 - (scrollProgress - 0.59) / 0.04) : 1);
  const s5Opacity = scrollProgress < 0.59 ? Math.max(0, (scrollProgress - 0.56) / 0.04) : (scrollProgress > 0.73 ? Math.max(0, 1 - (scrollProgress - 0.73) / 0.04) : 1);
  const s6Opacity = scrollProgress < 0.73 ? Math.max(0, (scrollProgress - 0.70) / 0.04) : (scrollProgress > 0.87 ? Math.max(0, 1 - (scrollProgress - 0.87) / 0.04) : 1);
  const s7Opacity = scrollProgress < 0.87 ? Math.max(0, (scrollProgress - 0.85) / 0.03) : 1;

  // Scene 3: The Pregnancy-to-Motherhood Transition
  // Iris Mask expands from 0% to 150% radius
  const motherhoodIrisRadius = Math.min(150, Math.max(0, (s3Progress * 150)));

  // Scene 6: Offline State Machine stages (0 to 5)
  const offlineStep = useMemo(() => {
    if (s6Progress < 0.16) return 0; // Connected
    if (s6Progress < 0.33) return 1; // Offline
    if (s6Progress < 0.50) return 2; // Record Saved
    if (s6Progress < 0.68) return 3; // Sync Pending
    if (s6Progress < 0.84) return 4; // Connection Restored
    return 5; // Sync Complete
  }, [s6Progress]);

  const sceneTitles = [
    { num: '01', title: "A Mother's Journey Begins", label: "Dawn & Hope" },
    { num: '02', title: "The Pregnancy Journey", label: "Check-ups (ANC)" },
    { num: '03', title: "The Transition to Motherhood", label: "A New Life" },
    { num: '04', title: "Newborn Care & Follow-ups", label: "Postnatal (PNC)" },
    { num: '05', title: "Three People, One Care Journey", label: "The Care Triad" },
    { num: '06', title: "Built for Rural Realities", label: "Offline Mesh" },
    { num: '07', title: "Enter the Real Application", label: "Choose Role" }
  ];

  return (
    <div 
      ref={containerRef}
      className="scroll-driven-story-container"
      style={{
        position: 'relative',
        height: '750vh', // 7.5 Viewports of continuous scroll space
        background: '#071529'
      }}
    >
      {/* ========================================================
          STICKY CINEMATIC VIEWPORT (Stays pinned for entire scroll)
          ======================================================== */}
      <div 
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        
        {/* ========================================================
            TOP PROGRESS HUD
            ======================================================== */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            zIndex: 100
          }}
        >
          <div 
            style={{
              height: '100%',
              width: `${scrollProgress * 100}%`,
              background: 'linear-gradient(90deg, #14B8A6 0%, #F59E0B 50%, #FB7185 100%)',
              boxShadow: '0 0 10px rgba(20, 184, 166, 0.8)',
              transition: 'width 0.05s linear'
            }}
          />
        </div>

        {/* Ambient Top Bar with Chapter Tracker */}
        <div 
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1.5rem',
            right: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 90,
            pointerEvents: 'none'
          }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(11, 30, 54, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              fontSize: '0.78rem',
              fontWeight: 700,
              pointerEvents: 'auto'
            }}
          >
            <span style={{ color: '#14B8A6' }}>SCENE {sceneTitles[activeSceneIndex].num} / 07</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
            <span style={{ color: '#FDE68A' }}>{sceneTitles[activeSceneIndex].title}</span>
          </div>

          {/* Quick Scene Jumper Pill */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.3rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(11, 30, 54, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              pointerEvents: 'auto'
            }}
          >
            {sceneTitles.map((scene, idx) => (
              <button
                key={idx}
                onClick={() => jumpToScene(idx)}
                title={`Jump to Scene ${scene.num}: ${scene.title}`}
                style={{
                  width: idx === activeSceneIndex ? '28px' : '9px',
                  height: '9px',
                  borderRadius: '9999px',
                  border: 'none',
                  background: idx === activeSceneIndex ? '#14B8A6' : 'rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  padding: 0
                }}
              />
            ))}
          </div>
        </div>

        {/* Scroll Prompt (Fades out when scrolled) */}
        <div 
          style={{
            position: 'absolute',
            bottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#FFFFFF',
            zIndex: 90,
            opacity: Math.max(0, 1 - scrollProgress * 15),
            transform: `translateY(${scrollProgress * 20}px)`,
            pointerEvents: 'none',
            transition: 'opacity 0.2s ease'
          }}
        >
          <span style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FDE68A', fontWeight: 700 }}>
            Scroll to Advance the Story
          </span>
          <div 
            style={{
              width: '24px',
              height: '36px',
              borderRadius: '12px',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '6px'
            }}
          >
            <div 
              style={{
                width: '4px',
                height: '8px',
                borderRadius: '2px',
                background: '#14B8A6',
                animation: 'bounce 1.5s infinite'
              }}
            />
          </div>
        </div>

        {/* ========================================================
            SCENE 1: A MOTHER'S JOURNEY BEGINS (0.00 – 0.16)
            ======================================================== */}
        <div 
          className="scene scene-1"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: s1Opacity,
            pointerEvents: activeSceneIndex === 0 ? 'auto' : 'none',
            display: s1Opacity > 0 ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Rural Landscape Background with Parallax Camera Push */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('/assets/hero_pregnant_sunrise.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 40%',
              transform: prefersReducedMotion ? 'none' : `scale(${1 + s1Progress * 0.18}) translate3d(0, ${s1Progress * -25}px, 0)`,
              transition: prefersReducedMotion ? 'none' : 'transform 0.05s linear'
            }}
          />

          {/* Warm Golden Sunrise Overlay Gradient */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at 65% 25%, rgba(245, 158, 11, ${0.35 + s1Progress * 0.15}) 0%, rgba(11, 30, 54, 0.65) 60%, rgba(7, 21, 41, 0.95) 100%)`
            }}
          />

          {/* Golden Rays */}
          <div 
            style={{
              position: 'absolute',
              top: '-15%',
              right: '10%',
              width: '650px',
              height: '650px',
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.28) 0%, transparent 70%)',
              filter: 'blur(70px)',
              pointerEvents: 'none'
            }}
          />

          {/* Scene 1 Editorial Text Layer */}
          <div 
            className="container"
            style={{
              position: 'relative',
              zIndex: 10,
              textAlign: 'center',
              maxWidth: '940px',
              padding: '0 1.5rem',
              transform: prefersReducedMotion ? 'none' : `translate3d(0, ${-s1Progress * 40}px, 0)`,
              opacity: Math.max(0, 1 - (s1Progress > 0.7 ? (s1Progress - 0.7) / 0.3 : 0))
            }}
          >
            {/* National Initiative Badge */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.14)',
                backdropFilter: 'blur(14px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#FDE68A',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1.75rem'
              }}
            >
              <Sparkles size={16} color="#F59E0B" />
              Rural India Maternal & Newborn Care Net-Grid
            </div>

            {/* Main Headline */}
            <h1 
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)',
                fontWeight: 800,
                lineHeight: 1.12,
                color: '#FFFFFF',
                textShadow: '0 4px 25px rgba(0, 0, 0, 0.8)',
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em'
              }}
            >
              EVERY MOTHER DESERVES <br />
              <span style={{ color: '#14B8A6', textShadow: '0 0 35px rgba(20, 184, 166, 0.6)' }}>
                CONNECTED CARE.
              </span>
            </h1>

            {/* Supporting Text */}
            <p 
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                color: '#E2E8F0',
                maxWidth: '720px',
                margin: '0 auto 2.5rem',
                lineHeight: 1.6,
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.6)'
              }}
            >
              "From pregnancy to newborn care, every stage of the journey matters."
            </p>

            {/* Subtle Pill indicator */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.85rem',
                  color: '#CBD5E1',
                  background: 'rgba(11, 30, 54, 0.6)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <Heart size={14} color="#FB7185" />
                <span>Maternal Safety</span>
              </div>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.85rem',
                  color: '#CBD5E1',
                  background: 'rgba(11, 30, 54, 0.6)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <Baby size={14} color="#38BDF8" />
                <span>Newborn Continuity</span>
              </div>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.85rem',
                  color: '#CBD5E1',
                  background: 'rgba(11, 30, 54, 0.6)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <WifiOff size={14} color="#F59E0B" />
                <span>Zero-Connectivity Resilient</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            SCENE 2: THE PREGNANCY JOURNEY (0.14 – 0.31)
            ======================================================== */}
        <div 
          className="scene scene-2"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: s2Opacity,
            pointerEvents: activeSceneIndex === 1 ? 'auto' : 'none',
            display: s2Opacity > 0 ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          {/* Background: Doorstep Visit Image with ASHA Worker and Mother */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('/assets/asha_home_visit.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 45%',
              transform: prefersReducedMotion ? 'none' : `scale(${1.08 - s2Progress * 0.06})`,
              transition: prefersReducedMotion ? 'none' : 'transform 0.05s linear'
            }}
          />

          {/* Contrast & Depth Vignette */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(7, 21, 41, 0.85) 0%, rgba(11, 30, 54, 0.7) 45%, rgba(7, 21, 41, 0.94) 100%)'
            }}
          />

          <div 
            className="container"
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              maxWidth: '1100px'
            }}
          >
            {/* Scene 2 Header */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: '#14B8A6',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '0.6rem'
                }}
              >
                <Calendar size={16} /> Section 02 • Antenatal Care (ANC 1–4)
              </div>
              <h2 
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.15,
                  marginBottom: '0.75rem'
                }}
              >
                EVERY CHECK-UP MATTERS.
              </h2>
              <p 
                style={{
                  fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                  color: '#CBD5E1',
                  maxWidth: '680px',
                  margin: '0 auto'
                }}
              >
                "Organising antenatal visits and follow-ups can help keep the care journey on track."
              </p>
            </div>

            {/* Scroll-Drawn Antenatal Timeline */}
            <div 
              style={{
                background: 'rgba(11, 30, 54, 0.88)',
                backdropFilter: 'blur(16px)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                padding: '2.5rem 2rem 2rem',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Dynamic SVG Timeline Line */}
              <div style={{ position: 'relative', marginBottom: '2.5rem', padding: '0 1.5rem' }}>
                <svg width="100%" height="28" style={{ overflow: 'visible' }}>
                  {/* Background Track */}
                  <line 
                    x1="0%" 
                    y1="14" 
                    x2="100%" 
                    y2="14" 
                    stroke="rgba(255, 255, 255, 0.2)" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                  />
                  {/* Active Animated Scroll Stroke */}
                  <line 
                    x1="0%" 
                    y1="14" 
                    x2={`${Math.min(100, Math.max(0, s2Progress * 115))}%`} 
                    y2="14" 
                    stroke="#14B8A6" 
                    strokeWidth="5" 
                    strokeLinecap="round" 
                    filter="drop-shadow(0 0 8px rgba(20, 184, 166, 0.8))"
                  />
                </svg>
              </div>

              {/* 4 Milestones Cards that light up as scroll advances */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                  gap: '1.25rem'
                }}
              >
                {[
                  {
                    code: 'ANC 1',
                    timing: 'Week 12',
                    title: 'Early Registration & Baseline',
                    threshold: 0.18,
                    checks: ['MCTS ID issued', 'Hb 10.8 g/dL (Mild Anaemia)', 'BP 118/76 mmHg', 'IFA Supplementation started']
                  },
                  {
                    code: 'ANC 2',
                    timing: 'Week 20',
                    title: 'Anomaly Scan & Protection',
                    threshold: 0.40,
                    checks: ['Ultrasound scan at PHC', 'Tetanus Toxoid 1 given', 'Nutritional weight check', 'High-risk pre-screening']
                  },
                  {
                    code: 'ANC 3',
                    timing: 'Week 28',
                    title: 'Gestational Screening',
                    threshold: 0.65,
                    checks: ['Fundal height monitoring', 'Urine protein test', 'Gestational diabetes check', 'Danger sign education']
                  },
                  {
                    code: 'ANC 4',
                    timing: 'Week 36',
                    title: 'Birth Preparedness Plan',
                    threshold: 0.88,
                    checks: ['Institutional delivery PHC booked', '102 Ambulance number assigned', 'Blood donor standby verified', 'Clean birth kit prepared']
                  }
                ].map((item, index) => {
                  const isUnlocked = s2Progress >= item.threshold;
                  return (
                    <div 
                      key={index}
                      style={{
                        background: isUnlocked ? 'rgba(20, 184, 166, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                        border: isUnlocked ? '1.5px solid #14B8A6' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.25rem 1rem',
                        transform: isUnlocked ? 'translateY(-4px)' : 'none',
                        boxShadow: isUnlocked ? '0 10px 25px rgba(20, 184, 166, 0.2)' : 'none',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                        <span 
                          style={{
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            color: isUnlocked ? '#14B8A6' : '#94A3B8',
                            background: isUnlocked ? 'rgba(20, 184, 166, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                            padding: '0.2rem 0.55rem',
                            borderRadius: 'var(--radius-full)'
                          }}
                        >
                          {item.code}
                        </span>
                        <span style={{ fontSize: '0.76rem', color: '#CBD5E1', fontWeight: 600 }}>
                          {item.timing}
                        </span>
                      </div>

                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#FFFFFF', marginBottom: '0.6rem' }}>
                        {item.title}
                      </div>

                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {item.checks.map((chk, cIdx) => (
                          <li 
                            key={cIdx} 
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '0.35rem', 
                              fontSize: '0.78rem',
                              color: isUnlocked ? '#E2E8F0' : '#64748B' 
                            }}
                          >
                            <CheckCircle2 size={13} color={isUnlocked ? '#14B8A6' : '#475569'} />
                            <span>{chk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ASHA Field Note Pill */}
            <div 
              style={{
                marginTop: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                color: '#FDE68A',
                fontSize: '0.85rem'
              }}
            >
              <Users size={16} />
              <span>ASHA Didi logs observations at the doorstep even when mobile connectivity is zero.</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            SCENE 3: THE TRANSITION TO MOTHERHOOD (0.29 – 0.46)
            Smooth cinematic transition from pregnancy to newborn
            ======================================================== */}
        <div 
          className="scene scene-3"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: s3Opacity,
            pointerEvents: activeSceneIndex === 2 ? 'auto' : 'none',
            display: s3Opacity > 0 ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Base Layer: Pregnant Mother embracing her belly */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('/assets/hero_pregnant_sunrise.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 40%',
              transform: prefersReducedMotion ? 'none' : `scale(${1.15 + s3Progress * 0.08})`,
              filter: `brightness(${1 - s3Progress * 0.25})`
            }}
          />

          {/* Reveal Layer: Mother holding her newborn baby, revealed via continuous radial iris bloom */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('/assets/mother_holding_newborn.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 45%',
              clipPath: prefersReducedMotion ? 'none' : `circle(${motherhoodIrisRadius}% at 50% 50%)`,
              opacity: prefersReducedMotion ? s3Progress : 1,
              transform: prefersReducedMotion ? 'none' : `scale(${1.06 - s3Progress * 0.04})`,
              transition: prefersReducedMotion ? 'opacity 0.2s ease' : 'none'
            }}
          />

          {/* Golden Radiant Bloom Ring that expands around the transition */}
          <div 
            style={{
              position: 'absolute',
              width: `${motherhoodIrisRadius * 2.2}%`,
              height: `${motherhoodIrisRadius * 2.2}%`,
              borderRadius: '50%',
              border: '2px solid rgba(251, 191, 36, 0.4)',
              boxShadow: '0 0 50px rgba(245, 158, 11, 0.5), inset 0 0 50px rgba(245, 158, 11, 0.3)',
              pointerEvents: 'none',
              transform: `rotate(${s3Progress * 60}deg)`
            }}
          />

          {/* Atmospheric Dark & Warm Vignette */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(7, 21, 41, 0.2) 0%, rgba(7, 21, 41, 0.8) 70%, rgba(7, 21, 41, 0.96) 100%)'
            }}
          />

          {/* Heartbeat Wave SVG drawing across the transition */}
          <div 
            style={{
              position: 'absolute',
              top: '20%',
              left: 0,
              right: 0,
              height: '80px',
              pointerEvents: 'none',
              opacity: 0.6
            }}
          >
            <svg width="100%" height="80" preserveAspectRatio="none">
              <path 
                d="M 0 40 Q 200 40 300 40 L 320 15 L 340 65 L 360 25 L 380 40 Q 600 40 800 40 L 820 10 L 840 70 L 860 30 L 880 40 Q 1100 40 1400 40" 
                fill="none" 
                stroke="#FB7185" 
                strokeWidth="2.5" 
                strokeDasharray="1400"
                strokeDashoffset={`${1400 * (1 - s3Progress)}`}
              />
            </svg>
          </div>

          {/* Scene 3 Text Content */}
          <div 
            className="container"
            style={{
              position: 'relative',
              zIndex: 10,
              textAlign: 'center',
              maxWidth: '880px',
              padding: '0 1.5rem'
            }}
          >
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(251, 113, 133, 0.2)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(251, 113, 133, 0.4)',
                color: '#FDA4AF',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem'
              }}
            >
              <Baby size={16} /> Section 03 • The Arrival of New Life
            </div>

            <h2 
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.15,
                textShadow: '0 4px 30px rgba(0, 0, 0, 0.9)',
                marginBottom: '1.25rem'
              }}
            >
              A NEW LIFE BEGINS. <br />
              <span style={{ color: '#FB7185' }}>THE CARE CONTINUES.</span>
            </h2>

            <p 
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                color: '#F1F5F9',
                maxWidth: '740px',
                margin: '0 auto 2.5rem',
                lineHeight: 1.6,
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.8)'
              }}
            >
              "Maternal healthcare does not end at delivery. Mothers and newborns continue to need follow-up care."
            </p>

            {/* Respectful Stat Card */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1.25rem',
                padding: '1rem 1.75rem',
                borderRadius: 'var(--radius-xl)',
                background: 'rgba(11, 30, 54, 0.85)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
                textAlign: 'left'
              }}
            >
              <div 
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(251, 113, 133, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FB7185'
                }}
              >
                <Heart size={24} />
              </div>
              <div>
                <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1rem' }}>
                  The 42-Day Neonatal Continuum
                </div>
                <div style={{ color: '#CBD5E1', fontSize: '0.84rem' }}>
                  6 crucial doorstep checks to prevent postpartum hemorrhage, sepsis, and hypothermia.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            SCENE 4: NEWBORN CARE AND FOLLOW-UPS (0.44 – 0.61)
            ======================================================== */}
        <div 
          className="scene scene-4"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: s4Opacity,
            pointerEvents: activeSceneIndex === 3 ? 'auto' : 'none',
            display: s4Opacity > 0 ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          {/* Background: Home Postnatal Setting */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('/assets/mother_holding_newborn.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 45%',
              transform: prefersReducedMotion ? 'none' : `scale(${1.04 + s4Progress * 0.05})`,
              filter: 'blur(3px) brightness(0.4)'
            }}
          />

          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(7, 21, 41, 0.88) 0%, rgba(11, 30, 54, 0.82) 50%, rgba(7, 21, 41, 0.95) 100%)'
            }}
          />

          <div 
            className="container"
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              maxWidth: '1100px'
            }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: '#38BDF8',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '0.6rem'
                }}
              >
                <Activity size={16} /> Section 04 • Postnatal Continuum (PNC 42 Days)
              </div>
              <h2 
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.15,
                  marginBottom: '0.75rem'
                }}
              >
                CARE THAT REACHES BEYOND THE CLINIC.
              </h2>
              <p 
                style={{
                  fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                  color: '#CBD5E1',
                  maxWidth: '720px',
                  margin: '0 auto'
                }}
              >
                "MATRU-NETRA is designed to help organise follow-ups and connect the people involved in rural maternal and newborn care."
              </p>
            </div>

            {/* Narrative Follow-up Dashboard Grid */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem',
                alignItems: 'center'
              }}
            >
              {/* Left Column: Postnatal Milestones Timeline */}
              <div 
                style={{
                  background: 'rgba(11, 30, 54, 0.88)',
                  backdropFilter: 'blur(16px)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  padding: '2rem'
                }}
              >
                <div style={{ color: '#FDE68A', fontWeight: 800, fontSize: '0.92rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={16} /> SEQUENTIAL PNC VISITS DRAWN BY SCROLL:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { day: 'Day 01', title: 'Thermal & First Hour Feeding', threshold: 0.15, detail: 'Skin-to-skin contact, BCG & OPV-0 vaccines' },
                    { day: 'Day 03', title: 'Umbilical & Feeding Assessment', threshold: 0.35, detail: 'Stump hygiene check, baby warmth 36.8°C' },
                    { day: 'Day 07', title: 'Jaundice & Sepsis Surveillance', threshold: 0.55, detail: 'Eyes/skin yellowness screen, weight check' },
                    { day: 'Day 14', title: 'Growth & Vitals Verification', threshold: 0.75, detail: 'Weight recovery +350g, cry vigor verified' },
                    { day: 'Day 42', title: 'Comprehensive 6-Week Completion', threshold: 0.92, detail: 'Pentavalent-1, Rotavirus, maternal sign-off' }
                  ].map((m, idx) => {
                    const isPassed = s4Progress >= m.threshold;
                    return (
                      <div 
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.85rem',
                          opacity: isPassed ? 1 : 0.4,
                          transform: isPassed ? 'translateX(0)' : 'translateX(-6px)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div 
                          style={{
                            minWidth: '55px',
                            padding: '0.25rem 0.4rem',
                            borderRadius: 'var(--radius-sm)',
                            background: isPassed ? '#0284C7' : 'rgba(255, 255, 255, 0.1)',
                            color: '#FFFFFF',
                            fontSize: '0.74rem',
                            fontWeight: 800,
                            textAlign: 'center'
                          }}
                        >
                          {m.day}
                        </div>
                        <div>
                          <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.88rem' }}>
                            {m.title}
                          </div>
                          <div style={{ color: '#94A3B8', fontSize: '0.78rem' }}>
                            {m.detail}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Live Emerging Care-Record Panel */}
              <div 
                style={{
                  background: 'rgba(15, 23, 42, 0.92)',
                  backdropFilter: 'blur(16px)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1.5px solid rgba(56, 189, 248, 0.35)',
                  padding: '2rem',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={20} color="#38BDF8" />
                    <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '0.95rem' }}>
                      Doorstep Care Record
                    </span>
                  </div>

                  {/* Status Indicator changing with scroll */}
                  <span 
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      background: s4Progress < 0.4 
                        ? 'rgba(245, 158, 11, 0.2)' 
                        : (s4Progress < 0.75 ? 'rgba(2, 132, 199, 0.25)' : 'rgba(16, 185, 129, 0.25)'),
                      color: s4Progress < 0.4 
                        ? '#F59E0B' 
                        : (s4Progress < 0.75 ? '#38BDF8' : '#34D399'),
                      border: '1px solid currentColor'
                    }}
                  >
                    {s4Progress < 0.4 && 'Pending Follow-up'}
                    {s4Progress >= 0.4 && s4Progress < 0.75 && 'ASHA Doorstep Visit Logged'}
                    {s4Progress >= 0.75 && 'PHC Doctor Verified'}
                  </span>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginBottom: '0.2rem' }}>Beneficiary</div>
                  <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1rem' }}>Sunita Devi & Baby (Male, 2.9 kg)</div>
                  <div style={{ fontSize: '0.78rem', color: '#14B8A6' }}>Sub-Centre Kalyanpur • ASHA: Anita Devi</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Current Temp</div>
                    <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.1rem' }}>36.8° C</div>
                    <div style={{ color: '#10B981', fontSize: '0.72rem' }}>Normal Warmth</div>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Weight Gain</div>
                    <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.1rem' }}>+340 g</div>
                    <div style={{ color: '#10B981', fontSize: '0.72rem' }}>Healthy Curve</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#CBD5E1', fontStyle: 'italic', borderLeft: '2px solid #38BDF8', paddingLeft: '0.75rem' }}>
                  "Follow-up tracking is designed to support continuity across home and PHC visits without clinical delay."
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            SCENE 5: THREE PEOPLE, ONE CONNECTED CARE JOURNEY (0.59 – 0.75)
            Triad Network: Mother, ASHA Worker, Doctor
            ======================================================== */}
        <div 
          className="scene scene-5"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: s5Opacity,
            pointerEvents: activeSceneIndex === 4 ? 'auto' : 'none',
            display: s5Opacity > 0 ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          {/* Subtle Network Matrix Background */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 50%, #0F2542 0%, #071529 100%)'
            }}
          />

          <div 
            className="container"
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              maxWidth: '1150px'
            }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: '#14B8A6',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '0.6rem'
                }}
              >
                <Users size={16} /> Section 05 • The Care Triad
              </div>
              <h2 
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.15,
                  marginBottom: '0.75rem'
                }}
              >
                THREE ROLES. ONE CONNECTED CARE JOURNEY.
              </h2>
              <p 
                style={{
                  fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                  color: '#CBD5E1',
                  maxWidth: '740px',
                  margin: '0 auto'
                }}
              >
                "One platform designed to connect mothers, ASHA workers, and doctors through coordinated follow-up workflows."
              </p>
            </div>

            {/* Triad Visual Diagram with SVG Lines */}
            <div style={{ position: 'relative', minHeight: '340px' }}>
              
              {/* Dynamic Connecting SVG Beams */}
              <svg 
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  zIndex: 1
                }}
              >
                {/* Line 1: Mother to ASHA */}
                <line 
                  x1="22%" 
                  y1="50%" 
                  x2="50%" 
                  y2="50%" 
                  stroke="#14B8A6" 
                  strokeWidth="3" 
                  strokeDasharray="6 4"
                  opacity={s5Progress > 0.2 ? 0.8 : 0.2}
                />
                {/* Line 2: ASHA to Doctor */}
                <line 
                  x1="50%" 
                  y1="50%" 
                  x2="78%" 
                  y2="50%" 
                  stroke="#0284C7" 
                  strokeWidth="3" 
                  strokeDasharray="6 4"
                  opacity={s5Progress > 0.5 ? 0.8 : 0.2}
                />

                {/* Traveling Packet (Visit Record traveling from ASHA to Doctor) */}
                {s5Progress > 0.3 && (
                  <circle 
                    cx={`${35 + Math.min(43, (s5Progress - 0.3) * 110)}%`} 
                    cy="50%" 
                    r="8" 
                    fill="#F59E0B"
                    filter="drop-shadow(0 0 8px #F59E0B)"
                  />
                )}
              </svg>

              {/* 3 Node Cards positioned across */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1.5rem',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {/* Node 1: Mother & Newborn */}
                <div 
                  style={{
                    background: 'rgba(11, 30, 54, 0.92)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1.5px solid rgba(251, 113, 133, 0.5)',
                    padding: '1.75rem 1.25rem',
                    textAlign: 'center',
                    transform: prefersReducedMotion ? 'none' : `translateY(${Math.max(0, (1 - s5Progress * 1.5) * 30)}px)`,
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <div 
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: 'rgba(251, 113, 133, 0.2)',
                      color: '#FB7185',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem'
                    }}
                  >
                    <Heart size={28} />
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FB7185', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Beneficiary Role
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                    Mother & Family
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.5 }}>
                    Receives counseling, tracks pregnancy milestones, views verified doctor prescriptions, and calls ASHA Didi.
                  </p>
                  <div style={{ marginTop: '1rem', padding: '0.45rem', borderRadius: 'var(--radius-md)', background: 'rgba(255, 255, 255, 0.05)', fontSize: '0.74rem', color: '#FDA4AF' }}>
                    • Dedicated Beneficiary Dashboard
                  </div>
                </div>

                {/* Node 2: ASHA Worker */}
                <div 
                  style={{
                    background: 'rgba(11, 30, 54, 0.95)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: 'var(--radius-xl)',
                    border: '2px solid #14B8A6',
                    padding: '1.75rem 1.25rem',
                    textAlign: 'center',
                    transform: prefersReducedMotion ? 'none' : `scale(${0.96 + s5Progress * 0.06})`,
                    boxShadow: '0 15px 40px rgba(20, 184, 166, 0.25)'
                  }}
                >
                  <div 
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: 'rgba(20, 184, 166, 0.2)',
                      color: '#14B8A6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem'
                    }}
                  >
                    <Users size={28} />
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#14B8A6', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Doorstep Field Worker
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                    ASHA Worker
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.5 }}>
                    Registers expectant mothers, measures vitals offline, tags high-risk danger signs, and synchronizes automatically.
                  </p>
                  <div style={{ marginTop: '1rem', padding: '0.45rem', borderRadius: 'var(--radius-md)', background: 'rgba(20, 184, 166, 0.15)', fontSize: '0.74rem', color: '#5EEAD4', fontWeight: 700 }}>
                    • Doorstep Field Dashboard
                  </div>
                </div>

                {/* Node 3: Doctor at PHC */}
                <div 
                  style={{
                    background: 'rgba(11, 30, 54, 0.92)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1.5px solid rgba(2, 132, 199, 0.5)',
                    padding: '1.75rem 1.25rem',
                    textAlign: 'center',
                    transform: prefersReducedMotion ? 'none' : `translateY(${Math.max(0, (1 - s5Progress * 1.5) * 30)}px)`,
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <div 
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: 'rgba(2, 132, 199, 0.2)',
                      color: '#38BDF8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem'
                    }}
                  >
                    <Stethoscope size={28} />
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Primary Health Centre
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                    PHC Medical Officer
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.5 }}>
                    Triages flagged high-risk mothers, tracks longitudinal hemoglobin and BP curves, and authorizes hospital referrals.
                  </p>
                  <div style={{ marginTop: '1rem', padding: '0.45rem', borderRadius: 'var(--radius-md)', background: 'rgba(255, 255, 255, 0.05)', fontSize: '0.74rem', color: '#BAE6FD' }}>
                    • Clinical Triage Dashboard
                  </div>
                </div>

              </div>
            </div>

            {/* Note about three distinct login experiences */}
            <div 
              style={{
                marginTop: '2rem',
                textAlign: 'center',
                color: '#FDE68A',
                fontSize: '0.88rem',
                fontWeight: 600
              }}
            >
              ⚡ The application features three distinct authenticated portals tailored specifically for each role.
            </div>
          </div>
        </div>

        {/* ========================================================
            SCENE 6: BUILT FOR RURAL REALITIES (OFFLINE MESH) (0.73 – 0.89)
            Interactive 6-Stage Sync Progression
            ======================================================== */}
        <div 
          className="scene scene-6"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: s6Opacity,
            pointerEvents: activeSceneIndex === 5 ? 'auto' : 'none',
            display: s6Opacity > 0 ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          {/* Background Mesh Image */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('/assets/connectivity_mesh.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.16
            }}
          />

          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(7, 21, 41, 0.94) 0%, rgba(11, 30, 54, 0.88) 50%, rgba(7, 21, 41, 0.98) 100%)'
            }}
          />

          <div 
            className="container"
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              maxWidth: '1050px'
            }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: '#F59E0B',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '0.6rem'
                }}
              >
                <WifiOff size={16} /> Section 06 • Rural Connectivity Architecture
              </div>
              <h2 
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.15,
                  marginBottom: '0.75rem'
                }}
              >
                BUILT FOR RURAL REALITIES.
              </h2>
              <p 
                style={{
                  fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                  color: '#CBD5E1',
                  maxWidth: '740px',
                  margin: '0 auto'
                }}
              >
                "MATRU-NETRA is designed with offline-first operation as a core requirement for areas with unreliable internet connectivity."
              </p>
            </div>

            {/* Fictional Care Record on Phone & 6-Stage Timeline */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2.5rem',
                alignItems: 'center'
              }}
            >
              {/* Handheld Device Mockup */}
              <div 
                style={{
                  background: '#0F172A',
                  borderRadius: '32px',
                  border: '4px solid #334155',
                  padding: '1.25rem',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 25px rgba(20, 184, 166, 0.2)',
                  maxWidth: '380px',
                  margin: '0 auto',
                  width: '100%'
                }}
              >
                {/* Phone Status Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0.5rem 0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '0.75rem' }}>
                  <span style={{ color: '#94A3B8', fontWeight: 600 }}>09:42 AM</span>
                  
                  {/* Cellular Bars changing dynamically with scroll */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {offlineStep === 1 || offlineStep === 2 || offlineStep === 3 ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#EF4444', fontWeight: 700 }}>
                        <WifiOff size={14} /> NO SERVICE
                      </span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#10B981', fontWeight: 700 }}>
                        <Wifi size={14} /> 4G ONLINE
                      </span>
                    )}
                  </div>
                </div>

                {/* Simulated Screen Content */}
                <div style={{ padding: '1rem 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                    <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '0.92rem' }}>
                      Doorstep Visit #MN-8842
                    </div>
                    <span 
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-full)',
                        background: offlineStep >= 5 ? '#10B981' : (offlineStep >= 2 ? '#F59E0B' : '#0284C7'),
                        color: '#FFFFFF'
                      }}
                    >
                      {offlineStep >= 5 ? 'SYNCED' : (offlineStep >= 2 ? 'OFFLINE QUEUED' : 'ACTIVE')}
                    </span>
                  </div>

                  {/* Vitals summary */}
                  <div style={{ background: 'rgba(255, 255, 255, 0.06)', borderRadius: 'var(--radius-md)', padding: '0.85rem', marginBottom: '0.85rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Patient: Sunita Devi (Week 28)</div>
                    <div style={{ fontSize: '0.85rem', color: '#F8FAFC', fontWeight: 700 }}>BP: 138/88 mmHg • Hb: 10.4 g/dL</div>
                    <div style={{ fontSize: '0.74rem', color: '#F59E0B', marginTop: '0.25rem' }}>Flag: Mild Pedal Edema Noted</div>
                  </div>

                  {/* Visual Status Box based on scroll step */}
                  <div 
                    style={{
                      background: 'rgba(11, 30, 54, 0.9)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.85rem',
                      border: '1px solid rgba(255, 255, 255, 0.12)'
                    }}
                  >
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                      State Machine Status:
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FFFFFF', fontWeight: 700, fontSize: '0.88rem' }}>
                      {offlineStep === 0 && <><Wifi size={16} color="#10B981" /> 1. Connected to Central Grid</>}
                      {offlineStep === 1 && <><WifiOff size={16} color="#EF4444" /> 2. Offline: Cellular Drop</>}
                      {offlineStep === 2 && <><Database size={16} color="#14B8A6" /> 3. Record Saved in Local DB</>}
                      {offlineStep === 3 && <><RefreshCw size={16} color="#F59E0B" /> 4. Sync Pending in Queue</>}
                      {offlineStep === 4 && <><Wifi size={16} color="#38BDF8" /> 5. Connectivity Restored</>}
                      {offlineStep === 5 && <><CheckCircle2 size={16} color="#10B981" /> 6. Sync Complete & Verified</>}
                    </div>
                  </div>
                </div>
              </div>

              {/* 6-State Progression List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {[
                  { step: 0, label: 'CONNECTED', desc: 'ASHA operates with normal cellular connectivity at the road.' },
                  { step: 1, label: 'OFFLINE', desc: 'Cellular signals drop completely in remote hamlet behind hills.' },
                  { step: 2, label: 'RECORD SAVED', desc: 'Visit vitals committed instantly to offline sandbox with zero loss.' },
                  { step: 3, label: 'SYNC PENDING', desc: 'Cryptographically hashed visit tagged in persistent offline queue.' },
                  { step: 4, label: 'CONNECTION RESTORED', desc: 'Device automatically detects PHC Wi-Fi or restored cellular tower.' },
                  { step: 5, label: 'SYNC COMPLETE', desc: 'Queue flushes conflict-free. PHC Doctor sees triage flags immediately.' }
                ].map((item, idx) => {
                  const isActive = offlineStep === item.step;
                  return (
                    <div 
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.65rem 1rem',
                        borderRadius: 'var(--radius-lg)',
                        background: isActive ? 'rgba(20, 184, 166, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                        border: isActive ? '1.5px solid #14B8A6' : '1px solid rgba(255, 255, 255, 0.06)',
                        transform: isActive ? 'translateX(8px)' : 'none',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <span 
                        style={{
                          fontWeight: 800,
                          fontSize: '0.78rem',
                          color: isActive ? '#14B8A6' : '#64748B',
                          minWidth: '22px'
                        }}
                      >
                        0{idx + 1}
                      </span>
                      <div>
                        <div style={{ color: isActive ? '#FFFFFF' : '#CBD5E1', fontWeight: 700, fontSize: '0.88rem' }}>
                          {item.label}
                        </div>
                        <div style={{ color: isActive ? '#E2E8F0' : '#64748B', fontSize: '0.76rem' }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Proposed Capability Label */}
            <div 
              style={{
                marginTop: '1.75rem',
                textAlign: 'center',
                color: '#94A3B8',
                fontSize: '0.8rem',
                fontStyle: 'italic'
              }}
            >
              * Proposed and demonstrated offline-first synchronization architecture for national health informatics ideathon.
            </div>
          </div>
        </div>

        {/* ========================================================
            SCENE 7: ENTER THE REAL APPLICATION (0.87 – 1.00)
            Cinematic Transition directly into the 3 Dashboard Portals
            ======================================================== */}
        <div 
          className="scene scene-7"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: s7Opacity,
            pointerEvents: activeSceneIndex === 6 ? 'auto' : 'none',
            display: s7Opacity > 0 ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1.5rem',
            background: 'linear-gradient(180deg, #0B1E36 0%, #F8F5EE 65%, #FDFBF7 100%)',
            transition: 'background 0.5s ease'
          }}
        >
          <div 
            className="container"
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              maxWidth: '1200px'
            }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: 'var(--teal-primary)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '0.6rem'
                }}
              >
                <Zap size={16} /> Section 07 • Live Working Platform
              </div>
              <h2 
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)',
                  fontWeight: 800,
                  color: 'var(--navy-deep)',
                  lineHeight: 1.15,
                  marginBottom: '0.75rem'
                }}
              >
                ONE PLATFORM. <br />
                <span style={{ color: 'var(--teal-primary)' }}>THREE CONNECTED EXPERIENCES.</span>
              </h2>
              <p 
                style={{
                  fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                  color: 'var(--text-secondary)',
                  maxWidth: '750px',
                  margin: '0 auto'
                }}
              >
                The story continues in the live application. Select your role to launch its fully functional workspace.
              </p>
            </div>

            {/* Three Real Dashboard Entry Cards */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
                gap: '1.75rem',
                marginBottom: '2rem'
              }}
            >
              {/* Card 1: ASHA Worker */}
              <div 
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2.25rem 1.75rem',
                  border: '1.5px solid var(--cream-border)',
                  boxShadow: 'var(--shadow-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div 
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '16px',
                        background: 'var(--teal-soft)',
                        color: 'var(--teal-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Users size={26} />
                    </div>
                    <span className="badge badge-normal" style={{ fontSize: '0.72rem' }}>
                      Field Persona
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.4rem', color: 'var(--navy-deep)', marginBottom: '0.4rem' }}>
                    ASHA Worker
                  </h3>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--teal-primary)', marginBottom: '0.75rem' }}>
                    Anita Devi • Sub-Centre Kalyanpur
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    Doorstep ANC/PNC visit recorder, offline vital logs, danger sign red-flagging, and village maternal registry.
                  </p>
                </div>

                <button
                  onClick={() => openLoginForRole('asha')}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.85rem', fontWeight: 700 }}
                >
                  <span>{currentUser && currentRole === 'asha' ? 'Enter ASHA Dashboard' : 'Authenticate as ASHA Worker'}</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Card 2: Doctor / PHC */}
              <div 
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2.25rem 1.75rem',
                  border: '1.5px solid var(--cream-border)',
                  boxShadow: 'var(--shadow-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div 
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '16px',
                        background: '#E0F2FE',
                        color: '#0284C7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Stethoscope size={26} />
                    </div>
                    <span className="badge badge-info" style={{ fontSize: '0.72rem' }}>
                      Clinical Persona
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.4rem', color: 'var(--navy-deep)', marginBottom: '0.4rem' }}>
                    Doctor / PHC
                  </h3>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0284C7', marginBottom: '0.75rem' }}>
                    Dr. Priya Sharma, MBBS, DGO
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    High-risk clinical triage queue, longitudinal blood pressure & hemoglobin trend curves, and referral authorization.
                  </p>
                </div>

                <button
                  onClick={() => openLoginForRole('doctor')}
                  className="btn"
                  style={{ 
                    width: '100%', 
                    padding: '0.85rem', 
                    background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)', 
                    color: '#FFFFFF',
                    fontWeight: 700
                  }}
                >
                  <span>{currentUser && currentRole === 'doctor' ? 'Enter Doctor Dashboard' : 'Authenticate as Doctor'}</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Card 3: Mother / Patient */}
              <div 
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2.25rem 1.75rem',
                  border: '1.5px solid var(--cream-border)',
                  boxShadow: 'var(--shadow-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div 
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '16px',
                        background: '#FFEDD5',
                        color: '#EA580C',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Heart size={26} />
                    </div>
                    <span className="badge badge-warning" style={{ fontSize: '0.72rem' }}>
                      Beneficiary Persona
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.4rem', color: 'var(--navy-deep)', marginBottom: '0.4rem' }}>
                    Mother / Patient
                  </h3>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#EA580C', marginBottom: '0.75rem' }}>
                    Sunita Devi • 28 Weeks Expecting
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    Baby development countdown, verified doctor instructions, nutrition advice, and 1-click ASHA Didi emergency contact.
                  </p>
                </div>

                <button
                  onClick={() => openLoginForRole('mother')}
                  className="btn"
                  style={{ 
                    width: '100%', 
                    padding: '0.85rem', 
                    background: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)', 
                    color: '#FFFFFF',
                    fontWeight: 700
                  }}
                >
                  <span>{currentUser && currentRole === 'mother' ? 'Enter Mother Dashboard' : 'Authenticate / Register as Mother'}</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Quick Secondary Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setLoginModalOpen(true)}
                className="btn btn-outline"
                style={{ fontSize: '0.88rem', padding: '0.65rem 1.25rem' }}
              >
                <Zap size={16} />
                <span>Open Secure Authentication Gateway</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

