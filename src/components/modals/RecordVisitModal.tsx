import React, { useState } from 'react';
import { useCare } from '../../context/CareContext';
import { Mother } from '../../types';
import { X, AlertTriangle, ShieldCheck, Heart, Calendar, Stethoscope, WifiOff } from 'lucide-react';

interface RecordVisitModalProps {
  mother: Mother;
  isOpen: boolean;
  onClose: () => void;
}

export const RecordVisitModal: React.FC<RecordVisitModalProps> = ({ mother, isOpen, onClose }) => {
  const { recordVisit, isOffline, currentUser } = useCare();

  const [visitType, setVisitType] = useState('ANC-3');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [gestationalAgeWeeks, setGestationalAgeWeeks] = useState(mother.gestationalWeeks || 28);
  const [bpSystolic, setBpSystolic] = useState<number>(142);
  const [bpDiastolic, setBpDiastolic] = useState<number>(92);
  const [weightKg, setWeightKg] = useState<number>(58.5);
  const [hemoglobin, setHemoglobin] = useState<number>(10.5);
  const [fetalHeartRate, setFetalHeartRate] = useState<number>(144);
  const [babyTempCelsius, setBabyTempCelsius] = useState<number>(36.8);
  const [selectedDangerSigns, setSelectedDangerSigns] = useState<string[]>([
    'Mild blurred vision when waking up',
    'Swollen ankles / pedal edema'
  ]);
  const [ashaNotes, setAshaNotes] = useState(
    'Conducted doorstep follow-up. Patient reports mild evening headache. Restocked iron-folic acid strip. Screened BP twice with manual sphygmomanometer.'
  );
  const [flaggedForDoctor, setFlaggedForDoctor] = useState(true);
  const [flagReason, setFlagReason] = useState('Elevated blood pressure >= 140/90 mmHg (Suspected Pre-eclampsia)');

  if (!isOpen) return null;

  const dangerSignOptions = [
    'Severe persistent headache',
    'Blurred vision or seeing spots',
    'Swollen ankles / pedal edema',
    'Vaginal bleeding or watery discharge',
    'Reduced or absent fetal movement',
    'High fever (> 38°C) or chills',
    'Severe epigastric / upper abdominal pain'
  ];

  const toggleDangerSign = (sign: string) => {
    if (selectedDangerSigns.includes(sign)) {
      setSelectedDangerSigns(selectedDangerSigns.filter(s => s !== sign));
    } else {
      setSelectedDangerSigns([...selectedDangerSigns, sign]);
    }
  };

  // Real-time decision support trigger check
  const isHighBp = bpSystolic >= 140 || bpDiastolic >= 90;
  const isSevereAnemia = hemoglobin < 9.0;
  const hasDangerSigns = selectedDangerSigns.length > 0;
  const decisionSupportTriggered = isHighBp || isSevereAnemia || hasDangerSigns;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    recordVisit({
      motherId: mother.id,
      motherName: mother.name,
      visitType,
      date,
      gestationalAgeWeeks: Number(gestationalAgeWeeks),
      bpSystolic: Number(bpSystolic),
      bpDiastolic: Number(bpDiastolic),
      weightKg: Number(weightKg),
      hemoglobin: Number(hemoglobin),
      fetalHeartRate: Number(fetalHeartRate),
      babyTempCelsius: mother.babyDetails?.isDelivered ? Number(babyTempCelsius) : undefined,
      dangerSignsReported: selectedDangerSigns,
      ashaObservations: ashaNotes,
      flaggedForDoctor: flaggedForDoctor || decisionSupportTriggered,
      flagReason: flagReason || (isHighBp ? 'Elevated BP Trigger' : isSevereAnemia ? 'Severe Anemia Trigger' : undefined),
      recordedBy: currentUser ? `${currentUser.name} (ASHA)` : 'Anita Devi (ASHA)'
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
          maxWidth: '680px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden'
        }}
      >
        {/* Modal Header */}
        <div 
          style={{
            padding: '1.25rem 1.75rem',
            background: 'var(--navy-deep)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF' }}>Record Maternal Health Visit</h3>
              {isOffline && (
                <span className="badge badge-offline" style={{ fontSize: '0.7rem' }}>
                  <WifiOff size={12} /> Offline Mode
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#CBD5E1', marginTop: '0.2rem' }}>
              Mother: <strong>{mother.name}</strong> • Village: {mother.village} • {mother.gestationalWeeks}w
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ color: '#94A3B8', padding: '0.4rem', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} style={{ padding: '1.75rem', overflowY: 'auto' }}>
          
          {/* Top Row: Visit Type & Date */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                Visit Milestone Type
              </label>
              <select
                value={visitType}
                onChange={(e) => setVisitType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-strong)',
                  background: 'var(--cream-bg)',
                  fontWeight: 600
                }}
              >
                <option value="ANC-1">ANC-1 (First Trimester Baseline)</option>
                <option value="ANC-2">ANC-2 (Second Trimester Scan)</option>
                <option value="ANC-3">ANC-3 (Third Trimester Surveillance)</option>
                <option value="ANC-4">ANC-4 (Late Delivery Preparedness)</option>
                <option value="PNC-1">PNC Day 1 (Immediate Newborn Care)</option>
                <option value="PNC-3">PNC Day 3 (Home Feeding & Cord Check)</option>
                <option value="PNC-7">PNC Day 7 (Jaundice & Vitals Check)</option>
                <option value="PNC-14">PNC Day 14 (Weight & Growth Check)</option>
                <option value="PNC-28">PNC Day 28 (Neonatal Milestone Check)</option>
                <option value="Routine Check">Routine Doorstep Follow-up</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                Visit Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-strong)',
                  background: 'var(--cream-bg)',
                  fontWeight: 600
                }}
              />
            </div>
          </div>

          {/* Vitals Grid */}
          <div style={{ background: 'var(--cream-surface)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '1.25rem', border: '1px solid var(--cream-border)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy-deep)', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Stethoscope size={16} color="var(--teal-primary)" />
              Clinical Vitals Measurement
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
                  BP Systolic (mmHg)
                </label>
                <input
                  type="number"
                  value={bpSystolic}
                  onChange={(e) => setBpSystolic(Number(e.target.value))}
                  required
                  style={{
                    width: '100%',
                    padding: '0.55rem',
                    borderRadius: 'var(--radius-md)',
                    border: bpSystolic >= 140 ? '2px solid #EF4444' : '1px solid var(--border-strong)',
                    background: bpSystolic >= 140 ? '#FEF2F2' : '#FFFFFF',
                    fontWeight: 700
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
                  BP Diastolic (mmHg)
                </label>
                <input
                  type="number"
                  value={bpDiastolic}
                  onChange={(e) => setBpDiastolic(Number(e.target.value))}
                  required
                  style={{
                    width: '100%',
                    padding: '0.55rem',
                    borderRadius: 'var(--radius-md)',
                    border: bpDiastolic >= 90 ? '2px solid #EF4444' : '1px solid var(--border-strong)',
                    background: bpDiastolic >= 90 ? '#FEF2F2' : '#FFFFFF',
                    fontWeight: 700
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  required
                  style={{
                    width: '100%',
                    padding: '0.55rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-strong)',
                    background: '#FFFFFF',
                    fontWeight: 700
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
                  Hemoglobin (g/dL)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={hemoglobin}
                  onChange={(e) => setHemoglobin(Number(e.target.value))}
                  required
                  style={{
                    width: '100%',
                    padding: '0.55rem',
                    borderRadius: 'var(--radius-md)',
                    border: hemoglobin < 9.0 ? '2px solid #EF4444' : '1px solid var(--border-strong)',
                    background: hemoglobin < 9.0 ? '#FEF2F2' : '#FFFFFF',
                    fontWeight: 700
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
                  Fetal Heart (bpm)
                </label>
                <input
                  type="number"
                  value={fetalHeartRate}
                  onChange={(e) => setFetalHeartRate(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '0.55rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-strong)',
                    background: '#FFFFFF',
                    fontWeight: 700
                  }}
                />
              </div>
            </div>
          </div>

          {/* Danger Signs Checklist */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.4rem' }}>
              Reported Danger Signs (Select all that apply)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.4rem' }}>
              {dangerSignOptions.map((sign) => {
                const checked = selectedDangerSigns.includes(sign);
                return (
                  <label
                    key={sign}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      background: checked ? '#FEF2F2' : '#F8FAFC',
                      border: checked ? '1px solid #FCA5A5' : '1px solid #E2E8F0',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      color: checked ? '#991B1B' : 'var(--text-secondary)'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleDangerSign(sign)}
                      style={{ accentColor: '#EF4444' }}
                    />
                    <span>{sign}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Automated Decision Support Banner */}
          {decisionSupportTriggered && (
            <div 
              style={{
                background: '#FFFBEB',
                border: '1.5px solid #F59E0B',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1rem',
                marginBottom: '1.25rem',
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start'
              }}
            >
              <AlertTriangle size={20} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#B45309' }}>
                  Clinical Decision Support Screening Alert:
                </div>
                <div style={{ fontSize: '0.78rem', color: '#78350F', marginTop: '0.2rem', lineHeight: 1.4 }}>
                  {isHighBp && `• Elevated BP (${bpSystolic}/${bpDiastolic} mmHg) meets criteria for pre-eclampsia surveillance.`}
                  {isSevereAnemia && `• Hemoglobin (${hemoglobin} g/dL) is below 9.0 g/dL (Severe late gestational anemia).`}
                  {hasDangerSigns && `• Reported danger signs require clinical review by PHC Medical Officer.`}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#92400E', fontStyle: 'italic', marginTop: '0.35rem' }}>
                  Note: Decision support is an assistive screening guide. Final medical decisions rest with authorized clinicians.
                </div>
              </div>
            </div>
          )}

          {/* Flag for Doctor Checkbox */}
          <div style={{ background: '#F0F9FF', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #BAE6FD', marginBottom: '1.25rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={flaggedForDoctor}
                onChange={(e) => setFlaggedForDoctor(e.target.checked)}
                style={{ accentColor: 'var(--teal-primary)', width: '16px', height: '16px' }}
              />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0369A1' }}>
                Flag this case for Doctor / PHC Clinical Triage Queue
              </span>
            </label>
            {flaggedForDoctor && (
              <input
                type="text"
                placeholder="Reason for flagging (e.g. High BP & Pedal Edema)"
                value={flagReason}
                onChange={(e) => setFlagReason(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '0.5rem',
                  padding: '0.45rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #93C5FD',
                  fontSize: '0.8rem'
                }}
              />
            )}
          </div>

          {/* ASHA Observations */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
              ASHA Field Observations & Family Guidance
            </label>
            <textarea
              rows={3}
              value={ashaNotes}
              onChange={(e) => setAshaNotes(e.target.value)}
              placeholder="Record counseling given, supplement intake, transport preparation..."
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

          {/* Modal Footer Controls */}
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
              className="btn btn-primary btn-sm"
              style={{ padding: '0.65rem 1.75rem' }}
            >
              {isOffline ? 'Save Record (Offline Queue)' : 'Save & Sync Visit Record'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
