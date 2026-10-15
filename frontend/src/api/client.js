const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').trim().replace(/\/$/, '');

async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('psms_token');
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    });
  } catch (cause) {
    throw new Error(
      `Cannot reach the PSMS API at ${API_URL}. Check VITE_API_URL and the backend deployment.`,
      { cause },
    );
  }

  if (!response.ok) {
    const contentType = response.headers.get('content-type') || '';
    let message = `Request failed (${response.status})`;
    if (contentType.includes('application/json')) {
      try {
        const body = await response.json();
        message = body.detail || body.message || message;
      } catch {
        // Keep the status-based message when the error body is not valid JSON.
      }
    } else {
      const body = await response.text();
      if (body) message = body;
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return response.json();
  return response.text();
}

export default apiRequest;
