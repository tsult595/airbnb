import { api } from "./api";

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data; // Возвращаем данные пользователя
    } catch (error) {   
    console.error("Ошибка при логине:", error);
    throw error; // Пробрасываем ошибку дальше
  }
};

export const register = async (email, password) => {
  try {
    const response = await api.post("/auth/register", { email, password });
    return response.data; // Возвращаем данные пользователя
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    throw error; // Пробрасываем ошибку дальше
  }
};

export const loginWithGoogle = async (googleToken) => {
  // Отправляем Google токен на твой бэкенд
  const response = await api.post('/auth/google', { token: googleToken }); 
  return response.data;
};