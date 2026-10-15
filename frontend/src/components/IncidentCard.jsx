import SeverityBadge from './SeverityBadge';

export default function IncidentCard({ incident }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-lg shadow-slate-950/20">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">{incident.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{incident.category}</p>
        </div>
        <SeverityBadge level={incident.severity} />
      </div>
      <p className="text-sm text-slate-300">{incident.description}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>Confidence {incident.confidence?.toFixed ? incident.confidence.toFixed(2) : incident.confidence}</span>
        <span>{incident.status}</span>
      </div>
    </article>
  );
}
