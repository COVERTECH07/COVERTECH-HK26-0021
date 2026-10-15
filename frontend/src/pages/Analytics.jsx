import { AreaChart, Area, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Mon', incidents: 8 },
  { name: 'Tue', incidents: 10 },
  { name: 'Wed', incidents: 6 },
  { name: 'Thu', incidents: 12 },
  { name: 'Fri', incidents: 9 },
  { name: 'Sat', incidents: 14 },
  { name: 'Sun', incidents: 7 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="mt-1 text-slate-400">Operational trends and response performance</p>
      </div>
      <div className="h-80 rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Area type="monotone" dataKey="incidents" stroke="#22d3ee" fill="url(#colorIncidents)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
