import { useEffect, useState } from 'react';

const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:8000').trim().replace(/\/$/, '');
const DEFAULT_WS_URL = `${API_ORIGIN.replace(/^http/, 'ws')}/ws`;
const WS_URL = (import.meta.env.VITE_WS_URL || DEFAULT_WS_URL).trim();

export function useWebSocket() {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let socket;
    let disposed = false;

    try {
      const url = new URL(WS_URL);
      if (!['ws:', 'wss:'].includes(url.protocol)) {
        throw new Error('WebSocket URL must use ws:// or wss://');
      }

      socket = new WebSocket(url.toString());
      socket.onopen = () => {
        if (!disposed) setConnected(true);
      };
      socket.onclose = () => {
        if (!disposed) setConnected(false);
      };
      socket.onerror = () => {
        if (!disposed) setConnected(false);
      };
      socket.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (!disposed) setMessages((current) => [...current, payload]);
        } catch {
          console.error('Ignoring malformed WebSocket message.');
        }
      };
    } catch (error) {
      console.error('Unable to initialize PSMS WebSocket:', error);
      setConnected(false);
    }

    return () => {
      disposed = true;
      socket?.close();
    };
  }, []);

  return { connected, messages };
}
