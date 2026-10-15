import { useEffect, useState } from 'react';

// Never point production visitors at localhost. VITE_API_URL can override the API host.
const DEFAULT_API_URL = import.meta.env.PROD
  ? 'https://covertech-psms-api-prod.onrender.com'
  : 'http://localhost:8000';
const API_ORIGIN = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/$/, '');
const WS_URL = (import.meta.env.VITE_WS_URL || `${API_ORIGIN.replace(/^http/, 'ws')}/ws`).trim();

export function useWebSocket() {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let socket;
    let retryTimer;
    let disposed = false;

    const connect = () => {
      if (disposed) return;

      try {
        socket = new WebSocket(WS_URL);
      } catch (error) {
        console.warn('Live connection could not be created:', error);
        setConnected(false);
        retryTimer = window.setTimeout(connect, 5000);
        return;
      }

      socket.onopen = () => {
        setConnected(true);
      };

      socket.onclose = () => {
        setConnected(false);
        if (!disposed) retryTimer = window.setTimeout(connect, 5000);
      };

      socket.onerror = () => {
        setConnected(false);
        // onclose schedules the retry; avoid noisy unhandled connection errors.
      };

      socket.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          setMessages((current) => [...current.slice(-49), payload]);
        } catch (error) {
          console.warn('Ignoring malformed WebSocket message:', error);
        }
      };
    };

    connect();

    return () => {
      disposed = true;
      window.clearTimeout(retryTimer);
      if (socket) {
        socket.onclose = null;
        socket.close();
      }
    };
  }, []);

  return { connected, messages };
}
