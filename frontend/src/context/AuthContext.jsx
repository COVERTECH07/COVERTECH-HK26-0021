import { createContext, useContext, useMemo } from 'react';

const AuthContext = createContext();

// Temporary demo user so judges can explore the UI without signing in.
const DEMO_USER = {
  id: 0,
  email: 'demo@psms.local',
  full_name: 'Demo Operator',
  role: 'admin',
};

export function AuthProvider({ children }) {
  const value = useMemo(() => ({
    user: DEMO_USER,
    isAuthenticated: true,
    loading: false,
    login: () => {},
    logout: () => {},
  }), []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Missing auth context');
  }
  return context;
}
