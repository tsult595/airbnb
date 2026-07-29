import axios from "axios";

export const api = axios.create({
  // 🔥 В Next.js используем process.env.NEXT_PUBLIC_...
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
});

api.interceptors.request.use((config) => {
  // Дополнительная проверка: localStorage есть только в браузере (на клиенте)
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});