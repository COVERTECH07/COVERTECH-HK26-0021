const DEFAULT_API_URL = import.meta.env.PROD
  ? 'https://covertech-psms-api-prod.onrender.com'
  : 'http://localhost:8000';

const API_URL = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/$/, '');

async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('psms_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    let message = errorText || `Request failed (${response.status})`;
    try {
      const parsed = JSON.parse(errorText);
      if (typeof parsed.detail === 'string') message = parsed.detail;
      else if (Array.isArray(parsed.detail)) {
        message = parsed.detail.map((item) => item.msg || 'Invalid input').join(', ');
      } else if (typeof parsed.message === 'string') message = parsed.message;
    } catch {
      // Keep the original response text when the server does not return JSON.
    }
    throw new Error(message);
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

export default apiRequest;
