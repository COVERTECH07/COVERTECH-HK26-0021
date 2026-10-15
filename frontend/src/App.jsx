import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AlertProvider } from './context/AlertContext';
import Layout from './components/Layout';
import LiveMonitor from './pages/LiveMonitor';
import Incidents from './pages/Incidents';
import Analytics from './pages/Analytics';
import Heatmap from './pages/Heatmap';
import Settings from './pages/Settings';

export default function App() {
  return (
    <AlertProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<LiveMonitor />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/heatmap" element={<Heatmap />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AlertProvider>
  );
}
