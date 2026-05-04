import { useState, type FormEvent } from 'react';
import type { UserRole } from '../types';

interface AuthFormProps {
  onAuthenticate: (role: UserRole) => void;
}

const initialForm = { email: '', password: '', name: '' };

export default function AuthForm({ onAuthenticate }: AuthFormProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>();
  const [role, setRole] = useState<UserRole>('patient');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const nextErrors: typeof errors = {};
    if (!form.email.includes('@')) nextErrors.email = 'Enter a valid email address.';
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';
    if (mode === 'register' && form.name.trim().length < 2) nextErrors.name = 'Please enter your full name.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      onAuthenticate(role);
    }, 900);
  };

  return (
    <div className="mx-auto max-w-3xl rounded-[36px] bg-white p-8 shadow-soft">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-clinic-600">Account access</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Secure login and fast registration.</h2>
        </div>
        <div className="inline-flex gap-2 rounded-full bg-slate-100 p-1">
          {(['login', 'register'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMode(option)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${mode === option ? 'bg-clinic-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {option === 'login' ? 'Login' : 'Register'}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={submit} className="space-y-6">
        {mode === 'register' && (
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Full name</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 shadow-sm transition focus:border-clinic-500"
              placeholder="Jane Doe"
            />
            {errors?.name && <p className="mt-2 text-sm text-rose-600">{errors.name}</p>}
          </label>
        )}

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Email address</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 shadow-sm transition focus:border-clinic-500"
            placeholder="name@example.com"
          />
          {errors?.email && <p className="mt-2 text-sm text-rose-600">{errors.email}</p>}
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 shadow-sm transition focus:border-clinic-500"
            placeholder="Enter your password"
          />
          {errors?.password && <p className="mt-2 text-sm text-rose-600">{errors.password}</p>}
        </label>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
            <label className="cursor-pointer text-sm font-semibold text-slate-700">
              <input type="radio" name="role" value="patient" checked={role === 'patient'} onChange={() => setRole('patient')} className="mr-2" />
              Patient
            </label>
            <label className="cursor-pointer text-sm font-semibold text-slate-700">
              <input type="radio" name="role" value="doctor" checked={role === 'doctor'} onChange={() => setRole('doctor')} className="mr-2" />
              Doctor/Admin
            </label>
          </div>
          <button
            type="submit"
            className="rounded-3xl bg-clinic-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-clinic-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Processing…' : mode === 'login' ? 'Login now' : 'Create account'}
          </button>
        </div>

        <p className="text-sm text-slate-500">We use inline validation to keep sign-in fast and reduce mistakes.</p>
      </form>
    </div>
  );
}
