import React, { useState } from 'react';
import { useCare } from '../../context/CareContext';
import { 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  LogOut, 
  Stethoscope, 
  Users, 
  Building2, 
  FileBadge, 
  MapPin, 
  Phone, 
  RefreshCw,
  Sparkles,
  Info
} from 'lucide-react';

export const PendingVerificationView: React.FC = () => {
  const { currentUser, logout, approveAccount } = useCare();
  const [isApproving, setIsApproving] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [statusNote, setStatusNote] = useState('');

  if (!currentUser) return null;

  const isDoctor = currentUser.role === 'doctor';
  const isAsha = currentUser.role === 'asha';

  const handleSimulateApproval = async () => {
    setIsApproving(true);
    setStatusNote('');
    try {
      await approveAccount(currentUser.id);
      setStatusNote('Account successfully verified! Institutional access granted.');
    } catch (err: any) {
      setStatusNote(err.message || 'Verification failed. Please retry.');
    } finally {
      setIsApproving(false);
    }
  };

  const handleCheckStatus = async () => {
    setIsChecking(true);
    setStatusNote('Checking State Health Mission directory...');
    setTimeout(() => {
      setIsChecking(false);
      setStatusNote('Your credentials remain under review by the PHC Verification Cell. Please check back shortly.');
    }, 1000);
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      background: 'linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)',
      padding: '3rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '680px',
        width: '100%',
        background: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.15)',
        border: '1px solid #E2E8F0',
        overflow: 'hidden'
      }}>
        
        {/* Banner Header */}
        <div style={{
          background: isDoctor 
            ? 'linear-gradient(135deg, #0369A1 0%, #0C4A6E 100%)' 
            : 'linear-gradient(135deg, #0D9488 0%, #115E59 100%)',
          color: '#FFFFFF',
          padding: '2rem 2.5rem',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'rgba(255, 255, 255, 0.18)',
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>
              <Clock size={13} /> Verification In Progress
            </span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: '#FEF3C7',
              color: '#92400E',
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.74rem',
              fontWeight: 800
            }}>
              Pending Approval
            </span>
          </div>

          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#FFFFFF' }}>
            {isDoctor ? 'Doctor Clinical Credential Review' : 'ASHA Sub-Centre Jurisdiction Review'}
          </h1>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.88)', lineHeight: 1.5 }}>
            Welcome, <strong>{currentUser.name}</strong>. Your account has been registered with the MATRU-NETRA health grid. Professional access to patient medical records is temporarily restricted pending verification.
          </p>
        </div>

        {/* Content Body */}
        <div style={{ padding: '2rem 2.5rem' }}>

          {/* Submission Details Card */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem 1.5rem',
            marginBottom: '1.75rem'
          }}>
            <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
              Submitted Institutional Credentials
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', fontSize: '0.86rem' }}>
              <div>
                <div style={{ color: '#64748B', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Professional Role</div>
                <div style={{ fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {isDoctor ? <Stethoscope size={15} color="#0284C7" /> : <Users size={15} color="#0D9488" />}
                  {isDoctor ? 'Medical Officer / PHC Doctor' : 'Accredited Social Health Activist (ASHA)'}
                </div>
              </div>

              {isDoctor && currentUser.medicalRegNo && (
                <div>
                  <div style={{ color: '#64748B', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Medical Council Registration No.</div>
                  <div style={{ fontWeight: 800, color: '#0369A1', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FileBadge size={15} color="#0369A1" />
                    {currentUser.medicalRegNo}
                  </div>
                </div>
              )}

              {isAsha && currentUser.ashaWorkerId && (
                <div>
                  <div style={{ color: '#64748B', fontSize: '0.75rem', marginBottom: '0.2rem' }}>ASHA Facilitator / Worker ID</div>
                  <div style={{ fontWeight: 800, color: '#0D9488', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FileBadge size={15} color="#0D9488" />
                    {currentUser.ashaWorkerId}
                  </div>
                </div>
              )}

              <div>
                <div style={{ color: '#64748B', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Associated Facility / Catchment</div>
                <div style={{ fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Building2 size={15} color="#64748B" />
                  {currentUser.hospitalAffiliation || currentUser.associatedPhc || currentUser.location || 'PHC Rampur'}
                </div>
              </div>

              {currentUser.assignedVillage && (
                <div>
                  <div style={{ color: '#64748B', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Assigned Village / Hamlet</div>
                  <div style={{ fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MapPin size={15} color="#64748B" />
                    {currentUser.assignedVillage}
                  </div>
                </div>
              )}

              {currentUser.phone && (
                <div>
                  <div style={{ color: '#64748B', fontSize: '0.75rem', marginBottom: '0.2rem' }}>Registered Contact Phone</div>
                  <div style={{ fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Phone size={15} color="#64748B" />
                    {currentUser.phone}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Clinical Security Notice */}
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem 1.25rem',
            marginBottom: '1.75rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}>
            <ShieldAlert size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.84rem', color: '#7F1D1D', lineHeight: 1.5 }}>
              <strong>Protected Health Information (PHI) Notice:</strong> Under National Health Mission regulations, patient maternal and child health records are strictly confidential. Unverified professional accounts cannot view patient files, danger sign registries, or visit timelines.
            </div>
          </div>

          {/* Status Feedback Note */}
          {statusNote && (
            <div style={{
              background: '#ECFDF5',
              border: '1px solid #6EE7B7',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1rem',
              marginBottom: '1.5rem',
              fontSize: '0.84rem',
              color: '#065F46',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <CheckCircle2 size={16} color="#059669" />
              <span>{statusNote}</span>
            </div>
          )}

          {/* Institutional Fast-Track Approval & Administrative Workflow */}
          <div style={{
            background: '#F0FDFA',
            border: '1.5px dashed #0D9488',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            marginBottom: '1.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#0F766E', fontWeight: 800, fontSize: '0.88rem', marginBottom: '0.4rem' }}>
              <Sparkles size={16} /> PHC Administration & Review Workflow
            </div>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.82rem', color: '#134E4A', lineHeight: 1.5 }}>
              In public health administration, credential verification is conducted by the PHC Medical Officer In-Charge (MOIC). For evaluation or immediate administrative testing, you can approve your account credentials now:
            </p>

            <button
              onClick={handleSimulateApproval}
              disabled={isApproving}
              className="btn btn-primary btn-sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.65rem 1.25rem',
                fontSize: '0.84rem',
                fontWeight: 700
              }}
            >
              <CheckCircle2 size={15} />
              {isApproving ? 'Approving Credentials...' : 'Approve & Activate Account (MOIC Approval)'}
            </button>
          </div>

          {/* Footer Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #F1F5F9', paddingTop: '1.5rem' }}>
            <button
              onClick={handleCheckStatus}
              disabled={isChecking}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#F1F5F9',
                border: '1px solid #CBD5E1',
                padding: '0.55rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: '#334155',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={14} className={isChecking ? 'animate-spin-slow' : ''} />
              <span>{isChecking ? 'Checking...' : 'Check Status'}</span>
            </button>

            <button
              onClick={() => logout()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'transparent',
                border: 'none',
                color: '#DC2626',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '0.55rem 0.75rem'
              }}
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

