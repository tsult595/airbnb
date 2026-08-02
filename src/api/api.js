import axios from "axios";

export const api = axios.create({
  // 🔥 Если env не прочитался, принудительно используем http://localhost:5000
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});