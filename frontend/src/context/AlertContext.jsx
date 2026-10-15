import { createContext, useContext, useMemo, useState } from 'react';

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const push = (variant, message) => {
    const id = Date.now() + Math.random();
    setAlerts((current) => [...current, { id, variant, message }]);
    setTimeout(() => {
      setAlerts((current) => current.filter((item) => item.id !== id));
    }, 4000);
  };

  const value = useMemo(() => ({ alerts, push }), [alerts]);

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
}

export function useAlerts() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('Missing alert context');
  }
  return context;
}
