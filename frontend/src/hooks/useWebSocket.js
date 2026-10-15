import { useEffect, useMemo, useState } from 'react';

// Keep local development local, but never point a production visitor at localhost.
const DEFAULT_API_URL = import.meta.env.PROD
  ? 'https://covertech-psms-api-prod.onrender.com'
  : 'http://localhost:8000';
const API_ORIGIN = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/$/, '');
const WS_URL = import.meta.env.VITE_WS_URL || `${API_ORIGIN.replace(/^http/, 'ws')}/ws`;

export function useWebSocket() {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  const socket = useMemo(() => new WebSocket(WS_URL), []);

  useEffect(() => {
    socket.onopen = () => setConnected(true);
    socket.onclose = () => setConnected(false);
    socket.onerror = () => setConnected(false);
    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        setMessages((current) => [...current, payload]);
      } catch (error) {
        console.error('Ignoring malformed WebSocket message:', error);
      }
    };

    return () => {
      socket.close();
    };
  }, [socket]);

  return { connected, messages };
}
