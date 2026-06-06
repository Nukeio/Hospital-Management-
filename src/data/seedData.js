// Initial seed data for the hospital management system

export const initialPatients = [
  { id: 1, name: "Alice Johnson", age: 34, gender: "Female", phone: "555-0101", email: "alice@email.com", bloodType: "A+", condition: "Hypertension", status: "Admitted", doctor: "Dr. Smith", ward: "Cardiology", admitDate: "2026-06-01" },
  { id: 2, name: "Bob Martinez", age: 52, gender: "Male", phone: "555-0102", email: "bob@email.com", bloodType: "O-", condition: "Diabetes Type 2", status: "Outpatient", doctor: "Dr. Patel", ward: "Endocrinology", admitDate: "2026-06-03" },
  { id: 3, name: "Carol White", age: 28, gender: "Female", phone: "555-0103", email: "carol@email.com", bloodType: "B+", condition: "Appendicitis", status: "Discharged", doctor: "Dr. Kim", ward: "Surgery", admitDate: "2026-05-28" },
  { id: 4, name: "David Lee", age: 67, gender: "Male", phone: "555-0104", email: "david@email.com", bloodType: "AB+", condition: "Pneumonia", status: "Admitted", doctor: "Dr. Smith", ward: "Pulmonology", admitDate: "2026-06-04" },
  { id: 5, name: "Eva Chen", age: 45, gender: "Female", phone: "555-0105", email: "eva@email.com", bloodType: "A-", condition: "Migraine", status: "Outpatient", doctor: "Dr. Patel", ward: "Neurology", admitDate: "2026-06-05" },
];

export const initialDoctors = [
  { id: 1, name: "Dr. Sarah Smith", specialty: "Cardiology", phone: "555-0201", email: "s.smith@medicore.com", schedule: "Mon-Fri", patients: 12, status: "Available", experience: "12 years" },
  { id: 2, name: "Dr. Raj Patel", specialty: "Endocrinology", phone: "555-0202", email: "r.patel@medicore.com", schedule: "Mon-Thu", patients: 9, status: "Busy", experience: "8 years" },
  { id: 3, name: "Dr. Jin Kim", specialty: "Surgery", phone: "555-0203", email: "j.kim@medicore.com", schedule: "Tue-Sat", patients: 7, status: "Available", experience: "15 years" },
  { id: 4, name: "Dr. Maria Lopez", specialty: "Neurology", phone: "555-0204", email: "m.lopez@medicore.com", schedule: "Mon-Fri", patients: 11, status: "Off Duty", experience: "10 years" },
];

export const initialAppointments = [
  { id: 1, patient: "Alice Johnson", doctor: "Dr. Sarah Smith", date: "2026-06-07", time: "09:00", type: "Follow-up", status: "Confirmed" },
  { id: 2, patient: "Bob Martinez", doctor: "Dr. Raj Patel", date: "2026-06-07", time: "10:30", type: "Consultation", status: "Pending" },
  { id: 3, patient: "Eva Chen", doctor: "Dr. Raj Patel", date: "2026-06-08", time: "14:00", type: "Check-up", status: "Confirmed" },
  { id: 4, patient: "David Lee", doctor: "Dr. Sarah Smith", date: "2026-06-09", time: "11:00", type: "Follow-up", status: "Confirmed" },
];
