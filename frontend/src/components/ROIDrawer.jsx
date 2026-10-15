export default function ROIDrawer({ zones }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">Risk zones</h3>
      <div className="space-y-2">
        {zones.map((zone) => (
          <div key={zone.id} className="flex items-center justify-between rounded-xl bg-slate-800 px-3 py-2 text-sm text-slate-200">
            <span>{zone.label}</span>
            <span className="text-cyan-300">{zone.risk}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
