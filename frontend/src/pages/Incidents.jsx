import { useEffect, useState } from 'react';
import { listIncidents } from '../api/incidents';
import IncidentCard from '../components/IncidentCard';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    listIncidents().then(setIncidents).catch(() => setIncidents([]));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Incidents</h1>
        <p className="mt-1 text-slate-400">Review all alerts and manually verify before escalation</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {incidents.length ? incidents.map((incident) => <IncidentCard key={incident.id} incident={incident} />) : <div className="text-slate-400">No incidents reported.</div>}
      </div>
    </div>
  );
}
