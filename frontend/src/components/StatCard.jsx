export default function StatCard({ title, value, suffix = '', tone = 'cyan' }) {
  const tones = {
    cyan: 'text-cyan-400',
    red: 'text-red-400',
    amber: 'text-amber-400',
    green: 'text-emerald-400',
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="text-sm text-slate-400">{title}</div>
      <div className={`mt-3 text-3xl font-bold ${tones[tone] || tones.cyan}`}>
        {value}
        {suffix}
      </div>
    </div>
  );
}
