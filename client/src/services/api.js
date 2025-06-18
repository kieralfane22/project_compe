const BASE =
  import.meta.env.DEV
    ? 'http://localhost:3001/api'    // Local dev
    : 'http://server:3001/api';      // Docker or deployed container

const api = async (endpoint, method = 'GET', data = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem('token');
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
    credentials: 'include' // Add this if you're using cookies or session
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error: ${res.status} - ${errorText}`);
  }

  return res.json();
};

export default api;
