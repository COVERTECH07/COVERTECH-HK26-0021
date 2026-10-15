import { Navigate } from 'react-router-dom';

// Auth temporarily disabled for hackathon judges — send everyone to the dashboard.
export default function Login() {
  return <Navigate to="/" replace />;
}
