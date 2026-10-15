import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('admin@psms.local');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: setSession } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = await login({ email, password });
      const profileResponse = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/auth/me`, {
        headers: { Authorization: `Bearer ${payload.access_token}` },
      });
      const profile = await profileResponse.json();
      setSession(payload.access_token, profile);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Authentication failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-glow">
        <div className="mb-6 text-center">
          <div className="text-3xl font-bold text-cyan-400">PSMS</div>
          <p className="mt-2 text-slate-400">Public Safety Monitoring System</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm text-slate-300">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-300">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100" />
          </div>
          {error && <div className="text-sm text-red-400">{error}</div>}
          <button type="submit" className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
