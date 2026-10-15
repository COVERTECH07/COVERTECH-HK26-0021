import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCurrentUser } from '../api/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('psms_token')));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('psms_token');
    if (!token) {
      setLoading(false);
      setUser(null);
      setIsAuthenticated(false);
      return;
    }

    getCurrentUser()
      .then((me) => {
        setUser(me);
        setIsAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem('psms_token');
        setUser(null);
        setIsAuthenticated(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated,
    loading,
    login: (token, profile) => {
      localStorage.setItem('psms_token', token);
      setUser(profile);
      setIsAuthenticated(true);
    },
    logout: () => {
      localStorage.removeItem('psms_token');
      setUser(null);
      setIsAuthenticated(false);
    },
  }), [user, isAuthenticated, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Missing auth context');
  }
  return context;
}
