import React, { useState } from 'react';
import { useCare } from '../../context/CareContext';
import { X, UserPlus, Calendar, Heart, ShieldCheck } from 'lucide-react';

interface RegisterMotherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterMotherModal: React.FC<RegisterMotherModalProps> = ({ isOpen, onClose }) => {
  const { registerMother, isOffline } = useCare();

  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(22);
  const [husbandName, setHusbandName] = useState('');
  const [village, setVillage] = useState('Kalyanpur');
  const [phone, setPhone] = useState('+91 98765-');
  const [lmpDate, setLmpDate] = useState(() => {
    // Default 12 weeks ago
    const d = new Date();
    d.setDate(d.getDate() - 84);
    return d.toISOString().split('T')[0];
  });
  const [gravida, setGravida] = useState<number>(1);
  const [para, setPara] = useState<number>(0);
  const [bloodGroup, setBloodGroup] = useState('B Positive');

  if (!isOpen) return null;

  // Calculate EDD preview: LMP + 280 days
  const lmpObj = new Date(lmpDate);
  const eddObj = new Date(lmpObj.getTime() + 280 * 24 * 60 * 60 * 1000);
  const eddPreview = isNaN(eddObj.getTime()) ? '' : eddObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    registerMother({
      name,
      age: Number(age),
      husbandName,
      village,
      phone,
      lmpDate,
      gravida: Number(gravida),
      para: Number(para),
      bloodGroup
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
          maxWidth: '600px',
          maxHeight: '90vh',
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
            background: 'var(--navy-deep)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--teal-soft)',
              color: 'var(--teal-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <UserPlus size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF' }}>Register Expectant Mother</h3>
              <div style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>Sub-Centre Kalyanpur Catchment Grid</div>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ color: '#94A3B8', padding: '0.4rem', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '1.75rem', overflowY: 'auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                Full Name of Mother
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Geeta Roy"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-strong)',
                  background: 'var(--cream-bg)'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                Age
              </label>
              <input
                type="number"
                min={16}
                max={50}
                required
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-strong)',
                  background: 'var(--cream-bg)'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                Husband / Guardian Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Anand Roy"
                value={husbandName}
                onChange={(e) => setHusbandName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-strong)',
                  background: 'var(--cream-bg)'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                Village / Hamlet
              </label>
              <select
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-strong)',
                  background: 'var(--cream-bg)',
                  fontWeight: 600
                }}
              >
                <option value="Kalyanpur">Kalyanpur (Ward 1-4)</option>
                <option value="Sonarpur">Sonarpur (East)</option>
                <option value="Harinagar">Harinagar (West)</option>
                <option value="Rampur Basti">Rampur Basti</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                Last Menstrual Period (LMP) Date
              </label>
              <input
                type="date"
                required
                value={lmpDate}
                onChange={(e) => setLmpDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-strong)',
                  background: 'var(--cream-bg)'
                }}
              />
            </div>

            <div style={{ background: '#F0FDF4', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #DCFCE7' }}>
              <div style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 700, textTransform: 'uppercase' }}>
                Calculated EDD
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#15803D', marginTop: '0.2rem' }}>
                {eddPreview}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                Gravida (Pregnancies)
              </label>
              <input
                type="number"
                min={1}
                max={10}
                required
                value={gravida}
                onChange={(e) => setGravida(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-strong)',
                  background: 'var(--cream-bg)'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                Para (Deliveries)
              </label>
              <input
                type="number"
                min={0}
                max={10}
                required
                value={para}
                onChange={(e) => setPara(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-strong)',
                  background: 'var(--cream-bg)'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--navy-deep)', marginBottom: '0.35rem' }}>
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-strong)',
                  background: 'var(--cream-bg)',
                  fontWeight: 600
                }}
              >
                <option value="A Positive">A Positive</option>
                <option value="A Negative">A Negative</option>
                <option value="B Positive">B Positive</option>
                <option value="B Negative">B Negative</option>
                <option value="O Positive">O Positive</option>
                <option value="O Negative">O Negative</option>
                <option value="AB Positive">AB Positive</option>
                <option value="AB Negative">AB Negative</option>
              </select>
            </div>
          </div>

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
              {isOffline ? 'Save Registration (Offline Queue)' : 'Register & Assign Care Path'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
