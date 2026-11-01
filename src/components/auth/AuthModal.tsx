import React, { useState } from 'react';
import { useCare } from '../../context/CareContext';
import { UserRole } from '../../types';
import { 
  X, 
  Lock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Stethoscope, 
  Users, 
  Heart,
  CheckCircle2,
  Key
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    loginModalOpen, 
    setLoginModalOpen, 
    loginWithCredentials, 
    registerMotherPatient, 
    authModalDefaultRole,
    requestPasswordReset
  } = useCare();

  const [activeTab, setActiveTab] = useState<UserRole>(authModalDefaultRole || 'asha');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);

  // Form states (Clean, zero pre-filled hardcoded credentials)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('');
  const [gestationalWeeks, setGestationalWeeks] = useState(12);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Update active tab when default role changes from open trigger
  React.useEffect(() => {
    if (authModalDefaultRole) {
      setActiveTab(authModalDefaultRole);
      setIsRegistering(false);
      setIsForgotPassword(false);
      setErrorMsg('');
      setSuccessMsg('');
    }
  }, [authModalDefaultRole, loginModalOpen]);

  if (!loginModalOpen) return null;

  const handleTabSelect = (role: UserRole) => {
    setActiveTab(role);
    setErrorMsg('');
    setSuccessMsg('');
    setIsRegistering(false);
    setIsForgotPassword(false);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await loginWithCredentials(email, password, activeTab);
      // Close modal on successful authentication
      setLoginModalOpen(false);
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await registerMotherPatient({
        email,
        password,
        fullName,
        phone,
        village,
        age: 24,
        gestationalWeeks
      });
      setLoginModalOpen(false);
      setEmail('');
      setPassword('');
      setFullName('');
      setPhone('');
      setVillage('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. Please check your information.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const msg = await requestPasswordReset(email);
      setSuccessMsg(msg);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to process password recovery.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        background: 'rgba(7, 21, 41, 0.82)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        animation: 'fadeIn 0.2s ease'
      }}
    >
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '500px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Modal Header */}
        <div 
          style={{
            padding: '1.5rem',
            background: 'var(--navy-deep)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#14B8A6', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
              <ShieldCheck size={16} /> Secure Healthcare Authentication
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', margin: 0, fontWeight: 800 }}>
              {isRegistering ? 'Register Mother Account' : (isForgotPassword ? 'Password Recovery' : 'MATRU-NETRA Sign In')}
            </h3>
          </div>
          <button 
            onClick={() => setLoginModalOpen(false)}
            title="Close dialog"
            style={{ 
              color: '#94A3B8', 
              padding: '0.45rem', 
              borderRadius: '50%', 
              background: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Role Selection Tabs */}
        {!isRegistering && !isForgotPassword && (
          <div>
            <div style={{ padding: '0.65rem 1.25rem 0.35rem', background: '#F8FAFC', fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Select portal role to authenticate:
            </div>
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                background: '#F1F5F9',
                padding: '4px',
                borderBottom: '1px solid var(--border-subtle)'
              }}
            >
              <button
                type="button"
                onClick={() => handleTabSelect('doctor')}
                style={{
                  padding: '0.7rem 0.5rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-md)',
                  background: activeTab === 'doctor' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'doctor' ? '#0284C7' : 'var(--text-secondary)',
                  boxShadow: activeTab === 'doctor' ? 'var(--shadow-sm)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.2s ease',
                  border: activeTab === 'doctor' ? '1px solid #BAE6FD' : '1px solid transparent'
                }}
              >
                <Stethoscope size={15} />
                <span>Doctor / PHC</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabSelect('asha')}
                style={{
                  padding: '0.7rem 0.5rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-md)',
                  background: activeTab === 'asha' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'asha' ? 'var(--teal-primary)' : 'var(--text-secondary)',
                  boxShadow: activeTab === 'asha' ? 'var(--shadow-sm)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.2s ease',
                  border: activeTab === 'asha' ? '1px solid var(--teal-soft)' : '1px solid transparent'
                }}
              >
                <Users size={15} />
                <span>ASHA Worker</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabSelect('mother')}
                style={{
                  padding: '0.7rem 0.5rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-md)',
                  background: activeTab === 'mother' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'mother' ? '#EA580C' : 'var(--text-secondary)',
                  boxShadow: activeTab === 'mother' ? 'var(--shadow-sm)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.2s ease',
                  border: activeTab === 'mother' ? '1px solid #FFEDD5' : '1px solid transparent'
                }}
              >
                <Heart size={15} />
                <span>Mother</span>
              </button>
            </div>
          </div>
        )}

        {/* Modal Form Body */}
        <div style={{ padding: '1.75rem', overflowY: 'auto', maxHeight: '70vh' }}>
          
          {/* Error Message Alert */}
          {errorMsg && (
            <div 
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.65rem',
                background: '#FEF2F2',
                border: '1px solid #FCA5A5',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                color: '#991B1B',
                lineHeight: 1.5,
                marginBottom: '1.25rem'
              }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>{errorMsg}</div>
            </div>
          )}

          {/* Success Message Alert */}
          {successMsg && (
            <div 
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.65rem',
                background: '#ECFDF5',
                border: '1px solid #6EE7B7',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                color: '#065F46',
                lineHeight: 1.5,
                marginBottom: '1.25rem'
              }}
            >
              <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>{successMsg}</div>
            </div>
          )}

          {/* -------------------------------------------------------------
              MODE 1: FORGOT PASSWORD FORM
              ------------------------------------------------------------- */}
          {isForgotPassword ? (
            <form onSubmit={handlePasswordResetSubmit}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                Enter your registered healthcare email address to initiate password recovery.
              </p>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                  Registered Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    required
                    placeholder="e.g. yourname@domain.gov.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.75rem 0.7rem 2.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-strong)',
                      fontSize: '0.88rem'
                    }}
                  />
                  <Mail size={16} color="#64748B" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}
              >
                {isLoading ? 'Processing...' : 'Send Password Reset Request'}
              </button>

              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => { setIsForgotPassword(false); setErrorMsg(''); setSuccessMsg(''); }}
                  style={{ fontSize: '0.82rem', color: 'var(--teal-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          ) : isRegistering ? (
            /* -------------------------------------------------------------
               MODE 2: PATIENT / MOTHER REGISTRATION FORM
               ------------------------------------------------------------- */
            <form onSubmit={handleRegistrationSubmit}>
              <div style={{ background: '#FFF7ED', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #FFEDD5', marginBottom: '1.25rem', fontSize: '0.8rem', color: '#9A3412' }}>
                🤰 Register your maternal care journey to view verified checkups, doctor advice, and child growth records.
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                  Mother's Full Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunita Devi"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.75rem 0.65rem 2.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-strong)',
                      fontSize: '0.88rem'
                    }}
                  />
                  <User size={16} color="#64748B" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                  Email Address *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    required
                    placeholder="e.g. mother@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.75rem 0.65rem 2.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-strong)',
                      fontSize: '0.88rem'
                    }}
                  />
                  <Mail size={16} color="#64748B" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                    Mobile Number *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem 0.65rem 2.25rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-strong)',
                        fontSize: '0.88rem'
                      }}
                    />
                    <Phone size={15} color="#64748B" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                    Village / Hamlet *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kalyanpur"
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.75rem 0.65rem 2.25rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-strong)',
                        fontSize: '0.88rem'
                      }}
                    />
                    <MapPin size={15} color="#64748B" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                  Current Gestational Stage (Weeks Pregnant)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="range"
                    min="4"
                    max="40"
                    value={gestationalWeeks}
                    onChange={(e) => setGestationalWeeks(Number(e.target.value))}
                    style={{ flex: 1, accentColor: '#EA580C' }}
                  />
                  <span style={{ fontWeight: 800, color: '#EA580C', fontSize: '0.9rem', minWidth: '70px' }}>
                    Week {gestationalWeeks}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                  Create Account Password (min 6 characters) *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 2.5rem 0.65rem 2.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-strong)',
                      fontSize: '0.88rem'
                    }}
                  />
                  <Lock size={16} color="#64748B" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem', fontWeight: 700, background: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)', marginBottom: '1rem' }}
              >
                {isLoading ? 'Creating Your Account...' : 'Complete Patient Registration'}
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Already registered? </span>
                <button
                  type="button"
                  onClick={() => { setIsRegistering(false); setErrorMsg(''); setSuccessMsg(''); }}
                  style={{ color: 'var(--teal-primary)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Sign In Here
                </button>
              </div>
            </form>
          ) : (
            /* -------------------------------------------------------------
               MODE 3: ROLE-SPECIFIC SIGN IN FORM
               ------------------------------------------------------------- */
            <form onSubmit={handleLoginSubmit}>
              
              {/* Role Context Pill & Controlled Process Notice */}
              <div 
                style={{
                  background: activeTab === 'doctor' ? '#F0F9FF' : (activeTab === 'asha' ? '#F0FDF4' : '#FFF7ED'),
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  border: `1px solid ${activeTab === 'doctor' ? '#BAE6FD' : (activeTab === 'asha' ? '#BBF7D0' : '#FFEDD5')}`,
                  marginBottom: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 800, fontSize: '0.85rem', color: activeTab === 'doctor' ? '#0369A1' : (activeTab === 'asha' ? '#15803D' : '#C2410C'), marginBottom: '0.2rem' }}>
                  {activeTab === 'doctor' && <><Stethoscope size={16} /> Doctor / PHC Clinical Authentication</>}
                  {activeTab === 'asha' && <><Users size={16} /> ASHA Worker Doorstep Field Authentication</>}
                  {activeTab === 'mother' && <><Heart size={16} /> Beneficiary Mother / Patient Authentication</>}
                </div>

                <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {activeTab === 'doctor' && 'Accredited Medical Officer credentials authorized by District Health Society. Role is verified on authentication.'}
                  {activeTab === 'asha' && 'Accredited Social Health Activist credentials provisioned for Sub-Centre field operation.'}
                  {activeTab === 'mother' && 'Access your personalized maternal health records, prescription notes, and baby growth tracker.'}
                </div>
              </div>

              {/* Email / User ID Input */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                  {activeTab === 'doctor' ? 'Official Health Service Email / User ID' : (activeTab === 'asha' ? 'ASHA Registered Email / Facilitator ID' : 'Registered Email Address')} *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your registered email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.75rem 0.7rem 2.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-strong)',
                      fontSize: '0.88rem'
                    }}
                  />
                  <Mail size={16} color="#64748B" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              {/* Password Input */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)' }}>
                    Password / Security PIN *
                  </label>
                  <button
                    type="button"
                    onClick={() => { setIsForgotPassword(true); setErrorMsg(''); setSuccessMsg(''); }}
                    style={{ fontSize: '0.75rem', color: 'var(--teal-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your account password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7rem 2.5rem 0.7rem 2.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-strong)',
                      fontSize: '0.88rem'
                    }}
                  />
                  <Lock size={16} color="#64748B" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Privileged Account Provisioning Notice */}
              {(activeTab === 'doctor' || activeTab === 'asha') && (
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Key size={13} />
                  <span>Privileged accounts are provisioned by State Health Mission administrators. Public self-registration is restricted.</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
                style={{ 
                  width: '100%', 
                  padding: '0.85rem', 
                  fontWeight: 700,
                  background: activeTab === 'doctor' 
                    ? 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' 
                    : (activeTab === 'mother' ? 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)' : 'linear-gradient(135deg, var(--teal-primary) 0%, var(--teal-dark) 100%)'),
                  marginBottom: '1.25rem'
                }}
              >
                {isLoading ? 'Verifying Credentials...' : `Sign In as ${activeTab === 'doctor' ? 'PHC Doctor' : (activeTab === 'asha' ? 'ASHA Worker' : 'Mother')}`}
                {!isLoading && <ArrowRight size={16} />}
              </button>

              {/* Mother Registration Link (Only for Mother tab) */}
              {activeTab === 'mother' && (
                <div style={{ textAlign: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '1rem', fontSize: '0.82rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Are you an expectant mother without an account? </span>
                  <button
                    type="button"
                    onClick={() => { setIsRegistering(true); setErrorMsg(''); setSuccessMsg(''); }}
                    style={{ color: '#EA580C', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Register Here
                  </button>
                </div>
              )}

            </form>
          )}

        </div>

        {/* Footer */}
        <div style={{ background: '#F8FAFC', padding: '0.85rem 1.75rem', borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748B' }}>
          <span>Role-Based Access Control (RBAC)</span>
          <span>End-to-End Encrypted Session</span>
        </div>

      </div>
    </div>
  );
};

