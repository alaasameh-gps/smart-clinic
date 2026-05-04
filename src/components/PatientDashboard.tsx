import type { Appointment } from '../types';

interface PatientDashboardProps {
  name: string;
  appointment?: Appointment;
  onStartBooking: () => void;
}

export default function PatientDashboard({ name, appointment, onStartBooking }: PatientDashboardProps) {
  return (
    <section className="rounded-[36px] bg-white p-8 shadow-soft">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-clinic-600">Patient dashboard</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Welcome back, {name}.</h2>
          <p className="mt-2 text-slate-600">Your clinic flow is simplified with a single place for appointments, queue tracking, and vital records.</p>
        </div>
        <button onClick={onStartBooking} className="rounded-3xl bg-clinic-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-clinic-700">
          Book Appointment
        </button>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-clinic-50 p-6">
          <p className="text-sm font-semibold text-slate-500">Next appointment</p>
          {appointment ? (
            <div className="mt-4 space-y-3">
              <p className="text-lg font-semibold text-slate-900">{appointment.doctor}</p>
              <p className="text-sm text-slate-600">{appointment.date} • {appointment.time}</p>
              <p className="text-sm text-slate-500">{appointment.department}</p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-600">No appointments booked yet. Start with a new booking.</p>
          )}
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Quick actions</p>
          <div className="mt-4 space-y-3">
            {['Book Appointment', 'View Queue', 'Medical Records'].map((label) => (
              <button key={label} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:border-clinic-200 hover:bg-slate-100">
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Health note</p>
          <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
            Keep your medical records updated and easily accessible for every visit.
          </div>
        </div>
      </div>
    </section>
  );
}
