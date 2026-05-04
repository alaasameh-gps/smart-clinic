import type { Appointment, DoctorProfile } from '../types';

export const departments = ['General Medicine', 'Pediatrics', 'Dermatology', 'Cardiology', 'Orthopedics'];

export const doctors: DoctorProfile[] = [
  { id: 'doc1', name: 'Dr. Anya Patel', specialty: 'General Medicine', nextAvailable: 'Today 10:30' },
  { id: 'doc2', name: 'Dr. Samuel Kim', specialty: 'Pediatrics', nextAvailable: 'Today 11:00' },
  { id: 'doc3', name: 'Dr. Leila Ortiz', specialty: 'Dermatology', nextAvailable: 'Tomorrow 09:00' },
  { id: 'doc4', name: 'Dr. Miles Chen', specialty: 'Cardiology', nextAvailable: 'Tomorrow 10:00' },
  { id: 'doc5', name: 'Dr. Naomi Brooks', specialty: 'Orthopedics', nextAvailable: 'Today 14:00' },
];

export function fetchDoctorsByDepartment(department: string): Promise<DoctorProfile[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(doctors.filter((doc) => department === 'General Medicine' || doc.specialty === department));
    }, 700);
  });
}

export function fetchAvailableSlots(date: string, doctorId: string): Promise<string[]> {
  const baseSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30'];
  const unavailableCount = doctorId.length % 4;
  const unavailable = baseSlots.filter((_, index) => index % 4 === unavailableCount);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(baseSlots.map((slot) => slot).filter((slot) => !unavailable.includes(slot)));
    }, 500);
  });
}

export function fetchQueueStatus(): Promise<{ current: number; priorityCount: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ current: 24, priorityCount: 3 });
    }, 400);
  });
}

export const mockAppointments: Appointment[] = [
  { id: 'A-1001', department: 'General Medicine', doctor: 'Dr. Anya Patel', date: '2026-05-02', time: '10:30', status: 'confirmed', patientName: 'Maya Green', priority: false, notes: 'Annual check-up' },
  { id: 'A-1002', department: 'Cardiology', doctor: 'Dr. Miles Chen', date: '2026-05-03', time: '11:00', status: 'pending', patientName: 'Alex Reed', priority: true, notes: 'Chest pain evaluation' },
  { id: 'A-1003', department: 'Dermatology', doctor: 'Dr. Leila Ortiz', date: '2026-05-04', time: '09:00', status: 'confirmed', patientName: 'Jamie Scott', priority: false, notes: 'Skin rash follow-up' },
];

export function simulateQueueUpdate(current: number, priorityCount: number) {
  const nextCurrent = current + 1;
  const nextPriority = Math.max(0, priorityCount - 1);
  return { current: nextCurrent, priorityCount: nextPriority };
}
