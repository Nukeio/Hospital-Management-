import React, { useState } from 'react';
import { initialPatients, initialDoctors, initialAppointments } from './data/seedData';

// ── Utility ─────────────────────────────────────────────────────────────────
const statusColor = {
  Admitted:   { bg: '#e8f4fd', text: '#1565c0', dot: '#1976d2' },
  Outpatient: { bg: '#e8f5e9', text: '#2e7d32', dot: '#388e3c' },
  Discharged: { bg: '#f3e5f5', text: '#6a1b9a', dot: '#7b1fa2' },
  Available:  { bg: '#e8f5e9', text: '#2e7d32', dot: '#388e3c' },
  Busy:       { bg: '#fff3e0', text: '#e65100', dot: '#f57c00' },
  'Off Duty': { bg: '#fce4ec', text: '#880e4f', dot: '#c2185b' },
  Confirmed:  { bg: '#e8f4fd', text: '#1565c0', dot: '#1976d2' },
  Pending:    { bg: '#fff3e0', text: '#e65100', dot: '#f57c00' },
};

const Badge = ({ status }) => {
  const c = statusColor[status] || { bg: '#f5f5f5', text: '#555', dot: '#999' };
  return (
    <span style={{ background: c.bg, color: c.text, padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: c.dot, display: 'inline-block' }} />
      {status}
    </span>
  );
};

const Modal = ({ title, onClose, children }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: '90%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 20, color: '#0f4c75', fontFamily: "'DM Serif Display', serif" }}>{title}</h2>
        <button onClick={onClose} style={{ border: 'none', background: '#f5f5f5', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 18, color: '#555' }}>×</button>
      </div>
      {children}
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#555', marginBottom: 5 }}>{label}</label>
    <input {...props} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', ...props.style }} />
  </div>
);

const Select = ({ label, children, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#555', marginBottom: 5 }}>{label}</label>
    <select {...props} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', background: '#fff' }}>
      {children}
    </select>
  </div>
);

// ── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ patients, doctors, appointments }) {
  const stats = [
    { label: 'Total Patients', value: patients.length, icon: '🏥', color: '#1976d2' },
    { label: 'Admitted', value: patients.filter(p => p.status === 'Admitted').length, icon: '🛏️', color: '#d32f2f' },
    { label: 'Doctors', value: doctors.length, icon: '👨‍⚕️', color: '#388e3c' },
    { label: "Today's Appointments", value: appointments.filter(a => a.date === new Date().toISOString().slice(0, 10)).length, icon: '📅', color: '#f57c00' },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: '#0f4c75', marginBottom: 6 }}>Dashboard</h1>
      <p style={{ color: '#888', marginBottom: 28, fontSize: 14 }}>{new Date().toDateString()} — Welcome back!</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 14, padding: '20px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderLeft: `4px solid ${s.color}` }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: '#fff', borderRadius: 14, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 16, color: '#333' }}>Recent Patients</h3>
          {patients.slice(0, 4).map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f5f5f5' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{p.condition}</div>
              </div>
              <Badge status={p.status} />
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 14, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 16, color: '#333' }}>Upcoming Appointments</h3>
          {appointments.slice(0, 4).map(a => (
            <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f5f5f5' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{a.patient}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{a.date} at {a.time} · {a.doctor}</div>
              </div>
              <Badge status={a.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Patients ─────────────────────────────────────────────────────────────────
function Patients({ patients, setPatients }) {
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name:'', age:'', gender:'Female', phone:'', email:'', bloodType:'A+', condition:'', status:'Outpatient', doctor:'', ward:'', admitDate: new Date().toISOString().slice(0,10) });

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.condition.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.name || !form.condition) return alert('Name and condition are required.');
    setPatients(prev => [...prev, { ...form, id: Date.now(), age: Number(form.age) }]);
    setShowAdd(false);
    setForm({ name:'', age:'', gender:'Female', phone:'', email:'', bloodType:'A+', condition:'', status:'Outpatient', doctor:'', ward:'', admitDate: new Date().toISOString().slice(0,10) });
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this patient?')) setPatients(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: '#0f4c75', margin: 0 }}>Patients</h1>
        <button onClick={() => setShowAdd(true)} style={{ background: '#0f4c75', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>+ Add Patient</button>
      </div>

      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search patients..." style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e0e0e0', borderRadius: 10, fontSize: 14, marginBottom: 20, boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none' }} />

      <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['Name', 'Age', 'Condition', 'Blood', 'Doctor', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{ borderTop: '1px solid #f5f5f5' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>{p.gender}</div>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 14 }}>{p.age}</td>
                <td style={{ padding: '14px 16px', fontSize: 14 }}>{p.condition}</td>
                <td style={{ padding: '14px 16px', fontSize: 14 }}><span style={{ background: '#fff3e0', color: '#e65100', padding: '2px 8px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>{p.bloodType}</span></td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: '#555' }}>{p.doctor}</td>
                <td style={{ padding: '14px 16px' }}><Badge status={p.status} /></td>
                <td style={{ padding: '14px 16px' }}>
                  <button onClick={() => handleDelete(p.id)} style={{ background: '#ffebee', color: '#c62828', border: 'none', borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p style={{ textAlign: 'center', color: '#aaa', padding: 32 }}>No patients found.</p>}
      </div>

      {showAdd && (
        <Modal title="Add New Patient" onClose={() => setShowAdd(false)}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Input label="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Doe" />
            <Input label="Age" type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} placeholder="30" />
            <Select label="Gender" value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}>
              <option>Female</option><option>Male</option><option>Other</option>
            </Select>
            <Select label="Blood Type" value={form.bloodType} onChange={e => setForm({...form, bloodType: e.target.value})}>
              {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b => <option key={b}>{b}</option>)}
            </Select>
            <Input label="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="555-0100" />
            <Input label="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@example.com" />
            <Input label="Condition / Diagnosis" value={form.condition} onChange={e => setForm({...form, condition: e.target.value})} placeholder="e.g. Hypertension" />
            <Select label="Status" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              <option>Admitted</option><option>Outpatient</option><option>Discharged</option>
            </Select>
            <Input label="Assigned Doctor" value={form.doctor} onChange={e => setForm({...form, doctor: e.target.value})} placeholder="Dr. Name" />
            <Input label="Ward" value={form.ward} onChange={e => setForm({...form, ward: e.target.value})} placeholder="Cardiology" />
          </div>
          <Input label="Admit Date" type="date" value={form.admitDate} onChange={e => setForm({...form, admitDate: e.target.value})} />
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
            <button onClick={() => setShowAdd(false)} style={{ padding: '10px 20px', border: '1.5px solid #e0e0e0', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 14 }}>Cancel</button>
            <button onClick={handleAdd} style={{ padding: '10px 24px', background: '#0f4c75', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>Add Patient</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Doctors ──────────────────────────────────────────────────────────────────
function Doctors({ doctors, setDoctors }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name:'', specialty:'', phone:'', email:'', schedule:'Mon-Fri', experience:'', status:'Available' });

  const handleAdd = () => {
    if (!form.name) return alert('Name is required.');
    setDoctors(prev => [...prev, { ...form, id: Date.now(), patients: 0 }]);
    setShowAdd(false);
    setForm({ name:'', specialty:'', phone:'', email:'', schedule:'Mon-Fri', experience:'', status:'Available' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this doctor?')) setDoctors(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: '#0f4c75', margin: 0 }}>Doctors</h1>
        <button onClick={() => setShowAdd(true)} style={{ background: '#0f4c75', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>+ Add Doctor</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {doctors.map(d => (
          <div key={d.id} style={{ background: '#fff', borderRadius: 14, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', position: 'relative' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #0f4c75, #1976d2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 12 }}>👨‍⚕️</div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{d.name}</div>
            <div style={{ color: '#1976d2', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{d.specialty}</div>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>📞 {d.phone}</div>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>📧 {d.email}</div>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>🗓️ {d.schedule}</div>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>🩺 {d.patients} patients · {d.experience}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Badge status={d.status} />
              <button onClick={() => handleDelete(d.id)} style={{ background: '#ffebee', color: '#c62828', border: 'none', borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <Modal title="Add New Doctor" onClose={() => setShowAdd(false)}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Input label="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Dr. Jane Doe" />
            <Input label="Specialty" value={form.specialty} onChange={e => setForm({...form, specialty: e.target.value})} placeholder="Cardiology" />
            <Input label="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="555-0200" />
            <Input label="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="dr@hospital.com" />
            <Input label="Schedule" value={form.schedule} onChange={e => setForm({...form, schedule: e.target.value})} placeholder="Mon-Fri" />
            <Input label="Experience" value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} placeholder="5 years" />
            <Select label="Status" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              <option>Available</option><option>Busy</option><option>Off Duty</option>
            </Select>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
            <button onClick={() => setShowAdd(false)} style={{ padding: '10px 20px', border: '1.5px solid #e0e0e0', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 14 }}>Cancel</button>
            <button onClick={handleAdd} style={{ padding: '10px 24px', background: '#0f4c75', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>Add Doctor</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Appointments ─────────────────────────────────────────────────────────────
function Appointments({ appointments, setAppointments, patients, doctors }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ patient:'', doctor:'', date:'', time:'', type:'Consultation', status:'Pending' });

  const handleAdd = () => {
    if (!form.patient || !form.doctor || !form.date) return alert('Patient, doctor, and date are required.');
    setAppointments(prev => [...prev, { ...form, id: Date.now() }]);
    setShowAdd(false);
    setForm({ patient:'', doctor:'', date:'', time:'', type:'Consultation', status:'Pending' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Cancel this appointment?')) setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const toggleStatus = (id) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'Confirmed' ? 'Pending' : 'Confirmed' } : a));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: '#0f4c75', margin: 0 }}>Appointments</h1>
        <button onClick={() => setShowAdd(true)} style={{ background: '#0f4c75', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>+ Schedule</button>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {appointments.map(a => (
          <div key={a.id} style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{a.patient}</div>
              <div style={{ fontSize: 13, color: '#555', marginTop: 2 }}>{a.doctor} · {a.type}</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>📅 {a.date} at {a.time}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Badge status={a.status} />
              <button onClick={() => toggleStatus(a.id)} style={{ background: '#e3f2fd', color: '#1565c0', border: 'none', borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Toggle</button>
              <button onClick={() => handleDelete(a.id)} style={{ background: '#ffebee', color: '#c62828', border: 'none', borderRadius: 6, padding: '5px 12px', cursor: 'pointer'
