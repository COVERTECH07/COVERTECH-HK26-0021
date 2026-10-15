import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const API_URL = (import.meta.env.VITE_API_URL || (
  import.meta.env.PROD
    ? 'https://covertech-psms-api-prod.onrender.com'
    : 'http://localhost:8000'
)).replace(/\/$/, '');

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: setSession } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const payload = await login({ email, password });
      const profileResponse = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${payload.access_token}` },
      });
      if (!profileResponse.ok) {
        throw new Error('Signed in, but could not load your user profile. Please try again.');
      }
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
            <label className="mb-1 block text-sm text-slate-300" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="username" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-300" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100" />
          </div>
          {error && <div role="alert" className="text-sm text-red-400">{error}</div>}
          <button type="submit" className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
