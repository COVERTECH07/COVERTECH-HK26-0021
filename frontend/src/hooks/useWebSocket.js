import { useEffect, useMemo, useState } from 'react';

// Prefer an explicit WebSocket URL, otherwise derive ws:// or wss:// from
// the configured API origin so production never silently connects to localhost.
const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');
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
