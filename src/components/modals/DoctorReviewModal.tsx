import React, { useState } from 'react';
import { useCare } from '../../context/CareContext';
import { VisitRecord, Mother } from '../../types';
import { X, Stethoscope, AlertTriangle, CheckCircle, FileText, Ambulance, Calendar } from 'lucide-react';

interface DoctorReviewModalProps {
  visit: VisitRecord;
  mother: Mother;
  isOpen: boolean;
  onClose: () => void;
}

export const DoctorReviewModal: React.FC<DoctorReviewModalProps> = ({ visit, mother, isOpen, onClose }) => {
  const { doctorReviewVisit } = useCare();

  const [actionCategory, setActionCategory] = useState<'Prescription' | 'Diagnostic' | 'Urgent Referral' | 'Routine Monitoring'>('Prescription');
  const [clinicalNote, setClinicalNote] = useState(
    'Reviewed elevated BP (142/92 mmHg) and pedal edema logged by ASHA Anita Devi. Prescribed Tab Labetalol 100mg BD. Instructed ASHA to take 48-hour blood pressure check. Scheduled repeat ultrasound Doppler at PHC on Thursday.'
  );
  const [actionDetails, setActionDetails] = useState('Tab Labetalol 100mg BD x 7 days; strict BP charting; emergency transport standby.');
  const [transportVoucherIssued, setTransportVoucherIssued] = useState(true);
  const [nextDoctorVisitDate, setNextDoctorVisitDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split('T')[0];
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    doctorReviewVisit(visit.id, {
      clinicalNote,
      actionCategory,
      actionDetails,
      transportVoucherIssued,
      nextDoctorVisitDate
    });

    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(11, 30, 54, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        overflowY: 'auto'
      }}
    >
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '720px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div 
          style={{
            padding: '1.25rem 1.75rem',
            background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Stethoscope size={22} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF' }}>Doctor Clinical Review & Triage Action</h3>
              <div style={{ fontSize: '0.8rem', color: '#E0F2FE' }}>
                Dr. Priya Sharma, MBBS, DGO • PHC Rampur
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ color: '#E0F2FE', padding: '0.4rem', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.15)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form & Clinical Context */}
        <form onSubmit={handleSubmit} style={{ padding: '1.75rem', overflowY: 'auto' }}>
          
          {/* Patient Overview Strip */}
          <div style={{ background: '#F8FAFC', borderRadius: 'var(--radius-lg)', padding: '1rem 1.25rem', marginBottom: '1.25rem', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy-deep)' }}>{mother.name} (Age {mother.age})</div>
              <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                Village: {mother.village} • Gestational Age: {mother.gestationalWeeks} weeks • Gravida {mother.gravida} Para {mother.para}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="badge badge-danger" style={{ fontSize: '0.72rem' }}>
                Flagged: {visit.flagReason || 'Clinical Alert'}
              </span>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem' }}>
                Logged by ASHA: {visit.recordedBy}
              </div>
            </div>
          </div>

          {/* Vitals & Observations Readout */}
          <div style={{ background: '#FEF2F2', borderRadius: 'var(--radius-md)', padding: '0.85rem 1rem', border: '1px solid #FEE2E2', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#991B1B', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Vitals from Field Checkup ({visit.date})
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.88rem', color: '#7F1D1D' }}>
              <div><strong>BP:</strong> {visit.bpSystolic}/{visit.bpDiastolic} mmHg (Elevated)</div>
              <div><strong>Weight:</strong> {visit.weightKg} kg</div>
              <div><strong>Hemoglobin:</strong> {visit.hemoglobin} g/dL</div>
              {visit.fetalHeartRate && <div><strong>FHR:</strong> {visit.fetalHeartRate} bpm</div>}
            </div>
            <div style={{ marginTop: '0.4rem', fontSize: '0.82rem', color: '#991B1B' }}>
              <strong>ASHA Notes:</strong> "{visit.ashaObservations}"
            </div>
          </div>

          {/* Clinical Action Category */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.4rem' }}>
              Clinical Decision Category
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
              {(['Prescription', 'Diagnostic', 'Urgent Referral', 'Routine Monitoring'] as const).map((cat) => {
                const isSelected = actionCategory === cat;
                return (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setActionCategory(cat)}
                    style={{
                      padding: '0.65rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      textAlign: 'center',
                      background: isSelected ? '#E0F2FE' : '#F8FAFC',
                      color: isSelected ? '#0369A1' : 'var(--text-secondary)',
                      border: isSelected ? '2px solid #0284C7' : '1px solid var(--border-subtle)',
                      cursor: 'pointer'
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clinical Note / Prescriptions */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
              Medical Officer Review Note & Instructions
            </label>
            <textarea
              rows={3}
              required
              value={clinicalNote}
              onChange={(e) => setClinicalNote(e.target.value)}
              placeholder="Clinical assessment, medications prescribed, lifestyle/rest recommendations..."
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-strong)',
                fontSize: '0.85rem',
                lineHeight: 1.5
              }}
            />
          </div>

          {/* Directions for Beneficiary & ASHA */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
              Care Directives (Visible in Mother & ASHA Portals)
            </label>
            <input
              type="text"
              required
              value={actionDetails}
              onChange={(e) => setActionDetails(e.target.value)}
              placeholder="e.g. Tab Labetalol 100mg BD x 7 days; strict BP charting..."
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-strong)',
                fontSize: '0.85rem'
              }}
            />
          </div>

          {/* Transport Voucher & Next Visit Date */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
            <div style={{ background: '#FEF3C7', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #FDE68A' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={transportVoucherIssued}
                  onChange={(e) => setTransportVoucherIssued(e.target.checked)}
                  style={{ accentColor: '#D97706', width: '16px', height: '16px' }}
                />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#92400E' }}>
                  Authorize 102 Janani Express Transport Voucher
                </span>
              </label>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.25rem' }}>
                Next Clinic Follow-up Date
              </label>
              <input
                type="date"
                value={nextDoctorVisitDate}
                onChange={(e) => setNextDoctorVisitDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-strong)',
                  fontSize: '0.85rem'
                }}
              />
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: '#64748B', fontStyle: 'italic', marginBottom: '1.5rem' }}>
            * Clinical governance notice: Automated flags are screening alerts only. Treatment authorization and prescription are certified under the Medical Officer's registration.
          </div>

          {/* Footer Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.65rem 1.25rem' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-sm"
              style={{ padding: '0.65rem 1.75rem', background: '#0284C7', color: '#FFFFFF', fontWeight: 700 }}
            >
              Confirm Clinical Action & Update Grid
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
