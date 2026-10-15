import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import Layout from './components/Layout';
import LiveMonitor from './pages/LiveMonitor';
import Incidents from './pages/Incidents';
import Analytics from './pages/Analytics';
import Heatmap from './pages/Heatmap';
import Settings from './pages/Settings';

// Hackathon demo: skip login/signup and open the dashboard directly.
function AppShell() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/signup" element={<Navigate to="/" replace />} />
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
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <AppShell />
      </AlertProvider>
    </AuthProvider>
  );
}
