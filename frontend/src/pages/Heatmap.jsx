import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const points = [
  { position: [12.9716, 77.5946], value: 70, label: 'North Gate' },
  { position: [12.9723, 77.5958], value: 95, label: 'Main Lobby' },
  { position: [12.9709, 77.5934], value: 60, label: 'Parking Annex' },
];

export default function Heatmap() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Heatmap</h1>
        <p className="mt-1 text-slate-400">Crowd density by risk zone</p>
      </div>
      <div className="h-[540px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <MapContainer center={[12.9718, 77.5947]} zoom={16} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
          {points.map((point, index) => (
            <CircleMarker key={index} center={point.position} radius={18 + point.value / 6} pathOptions={{ color: '#38bdf8', fillColor: '#38bdf8', fillOpacity: 0.6 }}>
              <Popup>{point.label}</Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
