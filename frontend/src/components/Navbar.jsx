import { Bell, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 text-xl font-semibold text-cyan-400">
          <ShieldCheck className="h-6 w-6" />
          PSMS
        </Link>
        <div className="flex items-center gap-4">
          <button className="rounded-full border border-slate-700 p-2 text-slate-200">
            <Bell className="h-4 w-4" />
          </button>
          <div className="text-right">
            <div className="text-sm font-medium text-slate-100">{user?.full_name || 'Demo Operator'}</div>
            <div className="text-xs text-slate-400">{user?.role || 'admin'}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
