import { useAuth } from '../context/AuthContext';

export function useAuthSession() {
  return useAuth();
}
