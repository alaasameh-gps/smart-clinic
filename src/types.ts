export interface Appointment {
  id: number;
  patientName: string;
  phone: string;
  doctor: string;
  date: string;
  time: string;
  priority: boolean;
}

export const doctors = [
  "د. أحمد علي - قلبية",
  "د. سارة محمود - عظام",
  "د. محمد إبراهيم - أطفال",
  "د. نورا حسن - جلدية"
];
