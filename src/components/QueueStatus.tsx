import type { QueueStatus as QueueStatusType } from '../types';

interface QueueStatusProps {
  queue: QueueStatusType;
}

export default function QueueStatus({ queue }: QueueStatusProps) {
  return (
    <section className="rounded-[36px] bg-white p-8 shadow-soft">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-clinic-600">Queue overview</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Real-time waiting room</h2>
        </div>
        <span className="rounded-full bg-clinic-100 px-3 py-2 text-sm font-semibold text-clinic-700">Live</span>
      </div>
      <div className="space-y-4">
        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Current number</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{queue.currentNumber}</p>
            </div>
            <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-sm">
              <p className="text-sm text-slate-300">Your number</p>
              <p className="mt-3 text-3xl font-semibold">{queue.yourNumber}</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Est. wait</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{queue.estimatedMinutes} min</p>
            </div>
          </div>
        </div>
        <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Priority patients</p>
              <p className="text-sm text-slate-500">Highlighted to show urgent arrivals.</p>
            </div>
            <span className="rounded-full bg-rose-100 px-3 py-2 text-xs font-semibold text-rose-700">{queue.priorityAhead} ahead</span>
          </div>
          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
              <span className="text-sm text-slate-600">General queue speed</span>
              <span className="text-sm font-semibold text-slate-900">Steady</span>
            </div>
            <div className="flex items-center justify-between rounded-3xl bg-clinic-50 p-4">
              <span className="text-sm text-slate-700">Priority care</span>
              <span className="text-sm font-semibold text-clinic-700">Fast lane</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
