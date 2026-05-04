interface HeroSectionProps {
  onBook: () => void;
}

const benefits = [
  { title: 'Fast booking', description: 'Reserve your appointment in four easy steps and skip long lobby lines.' },
  { title: 'Live queue updates', description: 'See your current place in line and estimated wait time instantly.' },
  { title: 'Priority care', description: 'Priority patients are highlighted so urgent visits stay visible.' },
];

export default function HeroSection({ onBook }: HeroSectionProps) {
  return (
    <section className="grid gap-10 rounded-[40px] bg-white/90 p-8 shadow-soft backdrop-blur-md lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
      <div className="space-y-6">
        <div className="inline-flex items-center rounded-full bg-clinic-100 px-4 py-2 text-sm font-semibold text-clinic-700">
          Designed for patients and care teams
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Simplify clinic visits with fewer steps and better visibility.</h2>
          <p className="max-w-2xl text-slate-600">Smart Clinic System helps patients book appointments quickly, track queue progress, and gives doctors an efficient dashboard to manage arrivals and records.</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button onClick={onBook} className="inline-flex items-center justify-center rounded-3xl bg-clinic-600 px-7 py-3 text-base font-semibold text-white transition hover:bg-clinic-700">
            Book Appointment
          </button>
          <a href="#features" className="text-sm font-semibold text-clinic-600 transition hover:text-clinic-700">See workflow</a>
        </div>
      </div>

      <div className="space-y-5 rounded-[32px] bg-slate-50 p-6 shadow-soft">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Queue status</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-clinic-50 p-4">
              <p className="text-sm text-slate-500">Current number</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">24</p>
            </div>
            <div className="rounded-3xl bg-slate-900 p-4 text-white">
              <p className="text-sm text-slate-200">Your number</p>
              <p className="mt-2 text-3xl font-semibold">28</p>
            </div>
          </div>
        </div>
        <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Live updates</h3>
            <span className="rounded-full bg-clinic-100 px-3 py-1 text-xs font-semibold text-clinic-700">Auto refresh</span>
          </div>
          <p className="text-sm text-slate-600">Priority patients are shown first and waiting time is updated every few seconds for a smoother arrival workflow.</p>
        </div>
        <div className="grid gap-4 rounded-3xl bg-gradient-to-br from-clinic-100 via-white to-slate-50 p-5 text-slate-900 shadow-soft">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-3xl border border-slate-200 bg-white/80 p-4">
              <p className="font-semibold">{benefit.title}</p>
              <p className="mt-2 text-sm text-slate-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
