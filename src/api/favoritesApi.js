import { api } from "./api";



export const getFavorites = async (userId) => {
  try {
    const response = await api.get('/favorites', { params: { userId } });
    return response.data;
  } catch (error) {
    console.error(`Ошибка получения избранного:`, error);
    throw error;
  }
}


export const addFavorite = async (userId, accommodationId) => {
  try {
    const response = await api.post('/favorites/add', { userId, accommodationId });
    return response.data;
  } catch (error) {
    console.error(`Ошибка добавления в избранное:`, error);
    throw error;
  }
}



export const removeFavorite = async (userId, accommodationId) => {
  try {
    const response = await api.post('/favorites/remove', { userId, accommodationId });
    return response.data;
  } catch (error) {
    console.error(`Ошибка удаления из избранного:`, error);
    throw error;
  }
}
