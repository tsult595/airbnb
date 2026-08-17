import axios from "axios";

export const api = axios.create({
  // The backend address is configurable without changing any API paths.
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
