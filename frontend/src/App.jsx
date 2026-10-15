import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import LiveMonitor from './pages/LiveMonitor';
import Incidents from './pages/Incidents';
import Analytics from './pages/Analytics';
import Heatmap from './pages/Heatmap';
import Settings from './pages/Settings';

function AppShell() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<LiveMonitor />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/heatmap" element={<Heatmap />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
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
