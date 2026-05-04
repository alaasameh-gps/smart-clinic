import { useMemo, useState } from 'react';
import type { Appointment } from '../types';

interface AdminDashboardProps {
  appointments: Appointment[];
}

const statuses = ['confirmed', 'pending', 'completed'] as const;

export default function AdminDashboard({ appointments }: AdminDashboardProps) {
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState<'confirmed' | 'pending' | 'completed' | ''>('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const filteredAppointments = useMemo(
    () => appointments.filter((appointment) => {
      const matchesDate = filterDate ? appointment.date === filterDate : true;
      const matchesStatus = filterStatus ? appointment.status === filterStatus : true;
      return matchesDate && matchesStatus;
    }),
    [appointments, filterDate, filterStatus]
  );

  return (
    <section className="space-y-8 rounded-[36px] bg-white p-8 shadow-soft">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-clinic-600">Doctor / Admin dashboard</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Appointments and patient details</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="flex min-w-[180px] flex-col gap-2 text-sm text-slate-700">
            Date filter
            <input type="date" value={filterDate} onChange={(event) => setFilterDate(event.target.value)} className="rounded-3xl border border-slate-200 bg-slate-50 p-3" />
          </label>
          <label className="flex min-w-[180px] flex-col gap-2 text-sm text-slate-700">
            Status
            <select value={filterStatus} onChange={(event) => setFilterStatus(event.target.value as any)} className="rounded-3xl border border-slate-200 bg-slate-50 p-3">
              <option value="">All statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-slate-50">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-white">
            <tr>
              <th className="px-5 py-4 text-slate-500">Patient</th>
              <th className="px-5 py-4 text-slate-500">Department</th>
              <th className="px-5 py-4 text-slate-500">Doctor</th>
              <th className="px-5 py-4 text-slate-500">Date</th>
              <th className="px-5 py-4 text-slate-500">Status</th>
              <th className="px-5 py-4 text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-slate-50">
                <td className="px-5 py-4">{appointment.patientName}</td>
                <td className="px-5 py-4">{appointment.department}</td>
                <td className="px-5 py-4">{appointment.doctor}</td>
                <td className="px-5 py-4">{appointment.date} · {appointment.time}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${appointment.status === 'confirmed' ? 'bg-clinic-100 text-clinic-700' : appointment.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button onClick={() => setSelectedAppointment(appointment)} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedAppointment && (
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Patient details</h3>
              <p className="mt-1 text-sm text-slate-600">Update medical records and appointment status.</p>
            </div>
            <button onClick={() => setSelectedAppointment(null)} className="text-sm font-semibold text-clinic-600 hover:text-clinic-700">Close</button>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-700">Patient</p>
              <p className="mt-3 text-lg font-semibold text-slate-900">{selectedAppointment.patientName}</p>
              <p className="mt-2 text-sm text-slate-600">{selectedAppointment.department} with {selectedAppointment.doctor}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-700">Appointment</p>
              <p className="mt-3 text-base text-slate-900">{selectedAppointment.date} · {selectedAppointment.time}</p>
              <p className="mt-2 text-sm text-slate-600">Priority: {selectedAppointment.priority ? 'Yes' : 'No'}</p>
            </div>
          </div>
          <div className="mt-6 rounded-3xl bg-slate-100 p-5">
            <p className="text-sm font-semibold text-slate-700">Medical notes</p>
            <textarea defaultValue={selectedAppointment.notes} rows={4} className="mt-3 w-full resize-none rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-900" />
          </div>
          <button className="mt-5 rounded-3xl bg-clinic-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-clinic-700">
            Save record
          </button>
        </div>
      )}
    </section>
  );
}
