import React, { useState } from 'react';
import { useCare } from '../../context/CareContext';
import { Mother, VisitRecord } from '../../types';
import { 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  TrendingUp, 
  ShieldCheck, 
  Ambulance, 
  ChevronRight, 
  Clock, 
  UserCheck, 
  Activity,
  Heart
} from 'lucide-react';
import SharedDataBadge from '../SharedDataBadge';
import { DoctorReviewModal } from '../modals/DoctorReviewModal';

export const DoctorDashboard: React.FC = () => {
  const { mothers, visits, currentUser, pendingAccounts, approveAccount, rejectAccount, dataMode } = useCare();

  const [selectedMotherId, setSelectedMotherId] = useState<string>('MOM-001');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedVisitForReview, setSelectedVisitForReview] = useState<VisitRecord | null>(null);

  // High-priority clinical triage queue: mothers flagged for review
  const flaggedVisits = visits.filter((v) => v.flaggedForDoctor);
  const currentSelectedMother = mothers.find((m) => m.id === selectedMotherId) || mothers[0];
  const selectedMotherVisits = visits.filter((v) => v.motherId === currentSelectedMother?.id);

  const handleOpenReview = (v: VisitRecord) => {
    setSelectedVisitForReview(v);
    setReviewModalOpen(true);
  };

  const highRiskCount = mothers.filter((m) => m.riskLevel === 'high').length;
  const pendingTriageCount = visits.filter((v) => v.flaggedForDoctor && !v.doctorReview).length;

  return (
    <div style={{ padding: '2rem 0', minHeight: 'calc(100vh - 70px)', background: 'var(--cream-bg)' }}>
      <div className="container">
        <SharedDataBadge />
        
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.85rem', color: 'var(--navy-deep)', margin: 0 }}>
                PHC Medical Officer Station
              </h1>
              <span className="badge badge-info" style={{ background: '#E0F2FE', color: '#0369A1' }}>
                PHC Rampur Hub
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Clinician: <strong>{currentUser?.name || 'Dr. Priya Sharma, MBBS, DGO'}</strong> • {dataMode === 'cloud' ? `${mothers.length} registered mother${mothers.length === 1 ? '' : 's'} in the shared database` : 'Sector Coverage: 4 Sub-Centres (84 Mothers)'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#F0FDF4', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid #BBF7D0' }}>
            <ShieldCheck size={18} color="#16A34A" />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#166534' }}>
              Clinical Decision Support Active (MoHFW Guidelines)
            </span>
          </div>
        </div>

        {/* PHC Catchment Overview Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          
          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--cream-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>Triage Review Queue</span>
              <AlertTriangle size={18} color="#EF4444" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: pendingTriageCount > 0 ? '#DC2626' : 'var(--navy-deep)', marginTop: '0.4rem' }}>
              {pendingTriageCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#DC2626', fontWeight: 600 }}>Cases requiring clinical decision</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--cream-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>High Risk Monitored</span>
              <Activity size={18} color="#D97706" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#D97706', marginTop: '0.4rem' }}>
              {highRiskCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#D97706', fontWeight: 600 }}>Severe Anemia / Gestational HTN</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--cream-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>Institutional Births</span>
              <Heart size={18} color="var(--teal-primary)" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--teal-primary)', marginTop: '0.4rem' }}>
              100%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--teal-primary)', fontWeight: 600 }}>Planned deliveries at 24/7 PHC/FRU</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--cream-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>Transport Vouchers</span>
              <Ambulance size={18} color="#0284C7" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0284C7', marginTop: '0.4rem' }}>
              12 Issued
            </div>
            <div style={{ fontSize: '0.75rem', color: '#0284C7', fontWeight: 600 }}>102 Janani Express Standby</div>
          </div>

        </div>

        {/* Institutional Credential Review Panel: Pending Doctor and ASHA registrations */}
        {pendingAccounts && pendingAccounts.length > 0 && (
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid #F59E0B',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', borderBottom: '1px solid #FEF3C7', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={20} color="#D97706" />
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#92400E' }}>
                  Institutional Staff Credential Review ({pendingAccounts.length} Pending Approval)
                </h3>
              </div>
              <span className="badge badge-warning" style={{ background: '#FEF3C7', color: '#92400E' }}>
                MOIC Administrative Authority
              </span>
            </div>

            <p style={{ margin: '0 0 1rem 0', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              The following healthcare professionals have registered and require verification by the PHC Medical Officer In-Charge before receiving access to clinical records:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {pendingAccounts.map((applicant) => (
                <div
                  key={applicant.id}
                  style={{
                    background: '#FFFDF5',
                    border: '1px solid #FDE68A',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--navy-deep)' }}>
                        {applicant.name}
                      </span>
                      <span style={{
                        padding: '0.15rem 0.5rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        background: applicant.role === 'doctor' ? '#E0F2FE' : '#CCFBF1',
                        color: applicant.role === 'doctor' ? '#0369A1' : '#0F766E'
                      }}>
                        {applicant.role === 'doctor' ? 'Doctor' : 'ASHA Worker'}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      {applicant.role === 'doctor' && (
                        <span>Medical Reg No: <strong>{applicant.medicalRegNo || 'MCI-PENDING'}</strong></span>
                      )}
                      {applicant.role === 'asha' && (
                        <span>ASHA ID: <strong>{applicant.ashaWorkerId || 'PENDING'}</strong></span>
                      )}
                      <span>Facility: <strong>{applicant.hospitalAffiliation || applicant.associatedPhc || applicant.location}</strong></span>
                      {applicant.assignedVillage && (
                        <span>Village: <strong>{applicant.assignedVillage}</strong></span>
                      )}
                      <span>Phone: <strong>{applicant.phone}</strong></span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => approveAccount(applicant.id)}
                      className="btn btn-primary btn-sm"
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                      <CheckCircle2 size={14} /> Verify & Approve
                    </button>
                    <button
                      onClick={() => rejectAccount(applicant.id)}
                      className="btn btn-outline btn-sm"
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', color: '#DC2626', borderColor: '#FCA5A5' }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Layout: Left Triage Queue + Right Clinical Record & Trends */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1.75fr', gap: '2rem', alignItems: 'start' }}>
          
          {/* Left Column: Flagged Triage Queue */}
          <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-xl)', border: '1px solid var(--cream-border)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--navy-deep)', margin: 0 }}>
                  High-Priority Clinical Triage
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Flagged by field ASHAs & decision rules
                </div>
              </div>
              <span className="badge badge-danger">
                {flaggedVisits.length} Cases
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {flaggedVisits.map((v) => {
                const targetMother = mothers.find((m) => m.id === v.motherId);
                const isSelected = selectedMotherId === v.motherId;
                const isReviewed = !!v.doctorReview;

                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedMotherId(v.motherId)}
                    style={{
                      cursor: 'pointer',
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-lg)',
                      background: isSelected ? '#F0F9FF' : (isReviewed ? '#F8FAFC' : '#FFFDF5'),
                      border: isSelected ? '2px solid #0284C7' : (isReviewed ? '1px solid #E2E8F0' : '1.5px solid #FCA5A5'),
                      boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--navy-deep)' }}>
                        {v.motherName}
                      </div>

                      {isReviewed ? (
                        <span className="badge badge-normal" style={{ fontSize: '0.7rem' }}>
                          <CheckCircle2 size={12} /> Action Recorded
                        </span>
                      ) : (
                        <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>
                          Needs Clinical Review
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      {targetMother?.village} • {v.visitType} ({v.date}) • Gestational Age: {v.gestationalAgeWeeks}w
                    </div>

                    {/* Screening Trigger Reason */}
                    <div style={{ background: '#FEF2F2', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.78rem', color: '#991B1B', fontWeight: 600, marginBottom: '0.65rem' }}>
                      ⚠️ {v.flagReason}
                    </div>

                    {/* Vitals Summary */}
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: 'var(--navy-deep)', marginBottom: '0.75rem' }}>
                      <span><strong>BP:</strong> {v.bpSystolic}/{v.bpDiastolic}</span>
                      <span><strong>Hb:</strong> {v.hemoglobin} g/dL</span>
                      <span><strong>Weight:</strong> {v.weightKg} kg</span>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMotherId(v.motherId);
                          handleOpenReview(v);
                        }}
                        className="btn btn-sm"
                        style={{
                          background: isReviewed ? '#E0F2FE' : '#0284C7',
                          color: isReviewed ? '#0369A1' : '#FFFFFF',
                          padding: '0.4rem 0.85rem',
                          fontSize: '0.78rem',
                          fontWeight: 700
                        }}
                      >
                        <Stethoscope size={14} />
                        <span>{isReviewed ? 'Update Clinical Action' : 'Record Clinical Action'}</span>
                      </button>

                      <div style={{ fontSize: '0.75rem', color: '#0284C7', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <span>View Chart</span> <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Patient Clinical File & Trend Graphs */}
          {currentSelectedMother && (
            <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-xl)', border: '1px solid var(--cream-border)', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
              
              {/* Header Strip */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <h2 style={{ fontSize: '1.6rem', color: 'var(--navy-deep)', margin: 0 }}>
                      {currentSelectedMother.name}
                    </h2>
                    <span className="badge badge-info">{currentSelectedMother.bloodGroup}</span>
                    <span className="badge badge-normal">{currentSelectedMother.village}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    Assigned ASHA: <strong>{currentSelectedMother.assignedAshaName}</strong> • Phone: {currentSelectedMother.assignedAshaPhone}
                  </div>
                </div>

                {selectedMotherVisits[0] && (
                  <button
                    onClick={() => handleOpenReview(selectedMotherVisits[0])}
                    className="btn btn-sm"
                    style={{ background: '#0284C7', color: '#FFFFFF', padding: '0.65rem 1.25rem', fontWeight: 700 }}
                  >
                    <Stethoscope size={16} /> Enter Clinical Directive
                  </button>
                )}
              </div>

              {/* Longitudinal vitals: built from this mother's REAL recorded visits */}
              <div style={{ background: '#F8FAFC', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--navy-deep)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <TrendingUp size={16} color="#0284C7" />
                    Longitudinal Blood Pressure & Hemoglobin Trajectory
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>From recorded visits</span>
                </div>

                {(() => {
                  const history = [...selectedMotherVisits]
                    .sort((a, b) => a.date.localeCompare(b.date))
                    .slice(-4);
                  if (history.length === 0) {
                    return (
                      <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px dashed #CBD5E1', color: '#64748B', fontSize: '0.88rem', textAlign: 'center' }}>
                        No visits recorded yet for this mother.
                      </div>
                    );
                  }
                  return (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', textAlign: 'center' }}>
                      {history.map((v) => {
                        const highBp = v.bpSystolic >= 140 || v.bpDiastolic >= 90;
                        const lowHb = v.hemoglobin < 9;
                        const warn = highBp || lowHb;
                        return (
                          <div key={v.id} style={{ background: warn ? '#FEF2F2' : '#FFFFFF', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: warn ? '1.5px solid #EF4444' : '1px solid #E2E8F0' }}>
                            <div style={{ fontSize: '0.72rem', color: warn ? '#991B1B' : '#64748B', fontWeight: 700 }}>
                              {v.visitType} (Wk {v.gestationalAgeWeeks}){warn ? ' ⚠️' : ''}
                            </div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: highBp ? '#B91C1C' : 'var(--navy-deep)', marginTop: '0.2rem' }}>
                              {v.bpSystolic} / {v.bpDiastolic}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: lowHb ? '#B91C1C' : v.hemoglobin < 11 ? '#B45309' : '#16A34A', fontWeight: 600 }}>
                              Hb: {v.hemoglobin} g/dL
                            </div>
                            <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: '0.15rem' }}>{v.date}</div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Recorded Visits & Clinical Notes List */}
              <div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--navy-deep)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={18} color="#0284C7" />
                  Clinical Observations & Registered Actions
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {selectedMotherVisits.map((v) => (
                    <div
                      key={v.id}
                      style={{
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-subtle)',
                        background: '#FFFFFF'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div>
                          <span style={{ fontWeight: 800, color: 'var(--navy-deep)', fontSize: '1rem' }}>{v.visitType} Check-up</span>
                          <span style={{ fontSize: '0.8rem', color: '#64748B', marginLeft: '0.5rem' }}>({v.date})</span>
                        </div>
                        <span className="badge badge-normal">{v.recordedBy}</span>
                      </div>

                      <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                        <strong>ASHA Observation:</strong> "{v.ashaObservations}"
                      </div>

                      {/* Doctor's Action Section */}
                      {v.doctorReview ? (
                        <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0369A1', fontWeight: 800, fontSize: '0.82rem' }}>
                              <CheckCircle2 size={15} /> Clinical Action Certified by {v.doctorReview.reviewedBy}
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0284C7', background: '#E0F2FE', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                              {v.doctorReview.actionCategory}
                            </span>
                          </div>

                          <div style={{ fontSize: '0.86rem', color: '#0C4A6E', lineHeight: 1.5 }}>
                            "{v.doctorReview.clinicalNote}"
                          </div>

                          <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#0369A1', fontWeight: 600, display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <span><strong>Directives:</strong> {v.doctorReview.actionDetails}</span>
                            {v.doctorReview.nextDoctorVisitDate && (
                              <span><strong>Next PHC Review:</strong> {v.doctorReview.nextDoctorVisitDate}</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 'var(--radius-md)', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.8rem', color: '#92400E', fontWeight: 600 }}>
                            No Medical Officer action logged yet for this visit.
                          </span>
                          <button
                            onClick={() => handleOpenReview(v)}
                            className="btn btn-sm"
                            style={{ background: '#0284C7', color: '#FFFFFF', padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                          >
                            Review Now
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Doctor Review Modal */}
      {selectedVisitForReview && currentSelectedMother && (
        <DoctorReviewModal
          visit={selectedVisitForReview}
          mother={currentSelectedMother}
          isOpen={reviewModalOpen}
          onClose={() => {
            setReviewModalOpen(false);
            setSelectedVisitForReview(null);
          }}
        />
      )}

    </div>
  );
};
