import { api } from "./api";

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data; // Возвращает { user, token }
  } catch (error) {   
    console.error("Ошибка при логине:", error);
    throw error;
  }
};

export const register = async (email, password, avatar = null) => {
  try {
    const response = await api.post("/auth/register", { email, password, avatar });
    return response.data; // Возвращает { user, token }
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    throw error;
  }
};


export const logout = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data; // Возвращает { message: "Logged out successfully" }
  } catch (error) {
    console.error("Ошибка при логауте:", error);
    throw error;
  }
};

export const loginWithGoogle = async (googleToken) => {
  const response = await api.post('/auth/google', { token: googleToken }); 
  return response.data;
};