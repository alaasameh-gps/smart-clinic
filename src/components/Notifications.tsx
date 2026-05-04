interface NotificationsProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export default function Notifications({ type, message, onClose }: NotificationsProps) {
  return (
    <div className="mb-6 rounded-[32px] border border-slate-200 bg-white p-4 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
            {type === 'success' ? '✓' : '!' }
          </span>
          <div>
            <p className="font-semibold text-slate-900">{type === 'success' ? 'Success' : 'Error'}</p>
            <p className="text-sm text-slate-600">{message}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-sm font-semibold text-slate-400 transition hover:text-slate-700">Dismiss</button>
      </div>
    </div>
  );
}
