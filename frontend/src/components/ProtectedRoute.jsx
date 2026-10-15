import { Outlet } from 'react-router-dom';

// Auth temporarily disabled for judges demo — always render child routes.
export default function ProtectedRoute() {
  return <Outlet />;
}
