import { useEffect, useMemo, useState } from 'react';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';

export function useWebSocket() {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  const socket = useMemo(() => new WebSocket(WS_URL), []);

  useEffect(() => {
    socket.onopen = () => setConnected(true);
    socket.onclose = () => setConnected(false);
    socket.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      setMessages((current) => [...current, payload]);
    };

    return () => {
      socket.close();
    };
  }, [socket]);

  return { connected, messages };
}
