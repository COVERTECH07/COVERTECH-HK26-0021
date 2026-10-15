import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const API_URL = (import.meta.env.VITE_API_URL || (
  import.meta.env.PROD
    ? 'https://covertech-psms-api-prod.onrender.com'
    : 'http://localhost:8000'
)).replace(/\/$/, '');

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login: setSession } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    const normalizedEmail = email.trim().toLowerCase();

    try {
      if (isRegistering) {
        await register({ full_name: fullName.trim(), email: normalizedEmail, password });
      }

      const payload = await login({ email: normalizedEmail, password });
      const profileResponse = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${payload.access_token}` },
      });
      if (!profileResponse.ok) {
        let detail = '';
        try {
          const body = await profileResponse.json();
          detail = body.detail || '';
        } catch {
          // Keep a useful fallback if the server did not return JSON.
        }
        throw new Error(detail || 'Login worked, but the profile could not be loaded. Please try again.');
      }
      const profile = await profileResponse.json();
      setSession(payload.access_token, profile);
      navigate('/');
    } catch (err) {
      if (err instanceof TypeError && /fetch/i.test(err.message)) {
        setError('Cannot reach the backend right now. Please wait a few seconds and try again. If this continues, the API service may be waking up or unavailable.');
      } else {
        setError(err.message || (isRegistering ? 'Could not create your account.' : 'Login failed. Please check your email and password.'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = () => {
    setIsRegistering((current) => !current);
    setError('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-glow">
        <div className="mb-6 text-center">
          <div className="text-3xl font-bold text-cyan-400">PSMS</div>
          <p className="mt-2 text-slate-400">Public Safety Monitoring System</p>
          <h1 className="mt-5 text-xl font-semibold text-slate-100">
            {isRegistering ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {isRegistering ? 'Register to access the monitoring dashboard' : 'Sign in to continue to your dashboard'}
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isRegistering && (
            <div>
              <label className="mb-1 block text-sm text-slate-300" htmlFor="fullName">Full name</label>
              <input id="fullName" name="name" type="text" autoComplete="name" required
                value={fullName} onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-slate-100 outline-none focus:border-cyan-500" />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm text-slate-300" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-slate-100 outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-300" htmlFor="password">Password</label>
            <input id="password" name="password" type="password"
              autoComplete={isRegistering ? 'new-password' : 'current-password'} required minLength={isRegistering ? 8 : undefined}
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-slate-100 outline-none focus:border-cyan-500" />
            {isRegistering && <p className="mt-1 text-xs text-slate-500">Use at least 8 characters.</p>}
          </div>
          {error && <div role="alert" className="rounded-lg border border-red-900 bg-red-950/40 p-3 text-sm text-red-300">{error}</div>}
          <button type="submit" disabled={isSubmitting}
            className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? 'Please wait…' : isRegistering ? 'Create account' : 'Sign in'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button type="button" onClick={switchMode} className="font-semibold text-cyan-400 hover:text-cyan-300">
            {isRegistering ? 'Sign in' : 'Create account'}
          </button>
        </p>
      </div>
    </div>
  );
}
