import { useEffect, useMemo, useState } from 'react';
import { departments, fetchDoctorsByDepartment, fetchAvailableSlots } from '../data/mockApi';
import type { Appointment } from '../types';

interface AppointmentWizardProps {
  onConfirm: (appointment: Appointment) => void;
}

const emptyAppointment = { department: '', doctor: '', date: '', time: '', patientName: 'You', id: '', status: 'pending' as const };

export default function AppointmentWizard({ onConfirm }: AppointmentWizardProps) {
  const [step, setStep] = useState(1);
  const [appointment, setAppointment] = useState({ ...emptyAppointment });
  const [doctors, setDoctors] = useState<{ id: string; name: string }[]>([]);
  const [slots, setSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!appointment.department) return;
    setLoading(true);
    fetchDoctorsByDepartment(appointment.department).then((items) => {
      setDoctors(items.map((item) => ({ id: item.id, name: `${item.name} • ${item.specialty}` })));
      setLoading(false);
    });
  }, [appointment.department]);

  useEffect(() => {
    if (!appointment.doctor || !appointment.date) return;
    setLoading(true);
    fetchAvailableSlots(appointment.date, appointment.doctor).then((list) => {
      setSlots(list);
      setLoading(false);
    });
  }, [appointment.doctor, appointment.date]);

  const nextDates = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(today);
      day.setDate(today.getDate() + index);
      return day.toISOString().split('T')[0];
    });
  }, []);

  const handleNext = () => setStep((current) => Math.min(4, current + 1));
  const handleBack = () => setStep((current) => Math.max(1, current - 1));

  const handleConfirm = () => {
    setBusy(true);
    const confirmed = {
      ...appointment,
      id: `A-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'confirmed' as const,
    };
    window.setTimeout(() => {
      setBusy(false);
      onConfirm(confirmed);
      setAppointment({ ...emptyAppointment });
      setStep(1);
    }, 900);
  };

  return (
    <section className="rounded-[36px] bg-white p-8 shadow-soft">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-clinic-600">Appointment booking</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Step-by-step wizard</h2>
        </div>
        <div className="rounded-full bg-clinic-50 px-4 py-2 text-sm font-semibold text-clinic-700">Step {step} of 4</div>
      </div>

      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-4">
          {['Department', 'Doctor', 'Date', 'Time'].map((label, index) => (
            <div key={label} className={`rounded-3xl border p-4 text-center text-sm ${step === index + 1 ? 'border-clinic-600 bg-clinic-50 text-clinic-700' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
              {label}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">Choose the service area that matches your concern.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setAppointment({ ...appointment, department: dept, doctor: '', date: '', time: '' })}
                  className={`rounded-3xl border px-5 py-4 text-left transition ${appointment.department === dept ? 'border-clinic-600 bg-clinic-50' : 'border-slate-200 bg-white hover:border-clinic-200'}`}
                >
                  <p className="font-semibold text-slate-900">{dept}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">Pick a doctor that suits your department.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {loading ? (
                Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="h-24 rounded-3xl bg-slate-100" />
                ))
              ) : (
                doctors.map((doc) => (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => setAppointment({ ...appointment, doctor: doc.id, time: '' })}
                    className={`rounded-3xl border px-5 py-4 text-left transition ${appointment.doctor === doc.id ? 'border-clinic-600 bg-clinic-50' : 'border-slate-200 bg-white hover:border-clinic-200'}`}
                  >
                    <p className="font-semibold text-slate-900">{doc.name}</p>
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">Reserve the best day for your visit.</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {nextDates.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => setAppointment({ ...appointment, date, time: '' })}
                  className={`rounded-3xl border px-4 py-4 text-left transition ${appointment.date === date ? 'border-clinic-600 bg-clinic-50' : 'border-slate-200 bg-white hover:border-clinic-200'}`}
                >
                  <p className="font-semibold text-slate-900">{new Date(date).toLocaleDateString(undefined, { weekday: 'short' })}</p>
                  <p className="mt-1 text-sm text-slate-600">{new Date(date).toLocaleDateString()}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">Select a confirmed slot. Unavailable times are disabled.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-14 rounded-3xl bg-slate-100" />
                ))
              ) : (
                ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30'].map((slot) => {
                  const available = slots.includes(slot);
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={!available}
                      onClick={() => setAppointment({ ...appointment, time: slot })}
                      className={`rounded-3xl border px-4 py-3 text-sm font-semibold transition ${available ? appointment.time === slot ? 'border-clinic-600 bg-clinic-50 text-slate-900' : 'border-slate-200 bg-white text-slate-700 hover:border-clinic-200 hover:bg-slate-50' : 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400'}`}
                    >
                      {slot}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={handleBack} disabled={step === 1} className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50">
          Back
        </button>
        {step < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={
              (step === 1 && !appointment.department) ||
              (step === 2 && !appointment.doctor) ||
              (step === 3 && !appointment.date)
            }
            className="rounded-3xl bg-clinic-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-clinic-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next step
          </button>
        ) : (
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!appointment.time || busy}
            className="rounded-3xl bg-clinic-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-clinic-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? 'Confirming…' : 'Confirm appointment'}
          </button>
        )}
      </div>
    </section>
  );
}
