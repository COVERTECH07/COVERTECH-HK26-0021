export default function SeverityBadge({ level }) {
  const config = {
    critical: 'border-red-500/30 bg-red-500/10 text-red-300',
    high: 'border-orange-500/30 bg-orange-500/10 text-orange-300',
    medium: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300',
    low: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  };

  return (
    <span className={`rounded-full border px-2 py-1 text-xs font-medium uppercase ${config[level] || config.low}`}>
      {level}
    </span>
  );
}
