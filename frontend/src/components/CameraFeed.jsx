export default function CameraFeed({ name, status, location, frameUrl }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          <div className="font-medium text-slate-100">{name}</div>
          <div className="text-xs text-slate-400">{location}</div>
        </div>
        <span className={`rounded-full px-2 py-1 text-xs ${status === 'live' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-700 text-slate-300'}`}>
          {status}
        </span>
      </div>
      <img src={frameUrl || 'https://images.unsplash.com/photo-1553484771-371a605b5b5c?auto=format&fit=crop&w=1200&q=80'} alt={name} className="h-56 w-full object-cover" />
    </div>
  );
}
