import CameraFeed from '../components/CameraFeed';
import { useWebSocket } from '../hooks/useWebSocket';
import StatCard from '../components/StatCard';
import ROIDrawer from '../components/ROIDrawer';

const cameraData = [
  { id: 1, name: 'North Gate', location: 'Gate A', status: 'live', frameUrl: '' },
  { id: 2, name: 'Main Lobby', location: 'Lobby 2', status: 'live', frameUrl: '' },
  { id: 3, name: 'Parking Annex', location: 'Zone C', status: 'monitoring', frameUrl: '' },
];

const zones = [
  { id: 1, label: 'North Gate', risk: 'High' },
  { id: 2, label: 'Main Lobby', risk: 'Critical' },
  { id: 3, label: 'Parking Annex', risk: 'Medium' },
];

export default function LiveMonitor() {
  const { connected, messages } = useWebSocket();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Live monitoring</h1>
          <p className="mt-1 text-slate-400">Operations overview and threat detection</p>
        </div>
        <div className={`rounded-full px-3 py-2 text-sm ${connected ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-800 text-slate-300'}`}>
          {connected ? 'WebSocket connected' : 'Reconnect pending'}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Open incidents" value={12} tone="red" />
        <StatCard title="Crowd risk" value={7.8} suffix="/10" tone="amber" />
        <StatCard title="Verified alerts" value={91} suffix="%" tone="green" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {cameraData.map((camera) => (
            <CameraFeed key={camera.id} {...camera} />
          ))}
        </div>
        <ROIDrawer zones={zones} />
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <h2 className="mb-3 text-lg font-semibold text-white">Recent activity</h2>
        {messages.length ? (
          <ul className="space-y-2 text-sm text-slate-300">
            {messages.slice(-4).map((message, index) => (
              <li key={index} className="rounded-xl bg-slate-800 px-3 py-2">{JSON.stringify(message)}</li>
            ))}
          </ul>
        ) : (
          <div className="text-slate-400">No live events yet.</div>
        )}
      </div>
    </div>
  );
}
