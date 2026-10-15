export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-slate-400">Privacy controls, retention policy, and operational preferences</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-3 text-lg font-semibold text-white">Privacy settings</div>
          <div className="space-y-3 text-sm text-slate-300">
            <label className="flex items-center justify-between"><span>Minimal retention mode</span><input type="checkbox" defaultChecked /></label>
            <label className="flex items-center justify-between"><span>Blur identifiable faces</span><input type="checkbox" defaultChecked /></label>
            <label className="flex items-center justify-between"><span>Auto-delete after 7 days</span><input type="checkbox" defaultChecked /></label>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-3 text-lg font-semibold text-white">Alert rules</div>
          <div className="space-y-3 text-sm text-slate-300">
            <div>Overcrowding threshold: 75%</div>
            <div>Blocked exit sensitivity: medium</div>
            <div>Manual verification required: yes</div>
          </div>
        </div>
      </div>
    </div>
  );
}
