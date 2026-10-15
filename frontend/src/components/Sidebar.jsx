import { Activity, BarChart3, Camera, Flame, HardDrive, Map } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  { label: 'Live Monitor', to: '/', icon: Activity },
  { label: 'Incidents', to: '/incidents', icon: Flame },
  { label: 'Analytics', to: '/analytics', icon: BarChart3 },
  { label: 'Heatmap', to: '/heatmap', icon: Map },
  { label: 'Settings', to: '/settings', icon: HardDrive },
];

export default function Sidebar() {
  return (
    <aside className="hidden h-[calc(100vh-72px)] w-72 border-r border-slate-800 bg-slate-900/60 p-4 md:block">
      <nav className="space-y-2">
        {items.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                isActive ? 'bg-cyan-500/15 text-cyan-300' : 'text-slate-300 hover:bg-slate-800'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800/50 p-3">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200">
          <Camera className="h-4 w-4 text-cyan-400" />
          Active cameras
        </div>
        <div className="text-3xl font-bold text-cyan-400">03</div>
      </div>
    </aside>
  );
}
