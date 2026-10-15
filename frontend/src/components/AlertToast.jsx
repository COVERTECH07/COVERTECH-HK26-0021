export default function AlertToast({ alerts }) {
  if (!alerts.length) {
    return null;
  }

  return (
    <div className="fixed right-4 top-20 z-50 space-y-2">
      {alerts.map((alert) => (
        <div key={alert.id} className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 shadow-xl">
          <div className="text-sm font-medium text-white">{alert.message}</div>
          <div className="mt-1 text-xs text-slate-400">{alert.variant}</div>
        </div>
      ))}
    </div>
  );
}
