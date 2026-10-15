// Auth temporarily disabled for hackathon judges demo.
export const login = async () => ({ access_token: 'demo', token_type: 'bearer' });
export const register = async () => ({ id: 0, email: 'demo@psms.local', full_name: 'Demo Operator', role: 'admin' });
export const getCurrentUser = async () => ({ id: 0, email: 'demo@psms.local', full_name: 'Demo Operator', role: 'admin' });
