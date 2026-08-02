import { api } from "./api";

// 1. Получение всех размещений с поддержкой фильтров (поиск, даты, гости, категория)
export const getAccommodations = async (params = {}) => {
  try {
    const response = await api.get("/accommodations", { params });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении размещений:", error);
    throw error;
  }
};

// 2. Получение одного размещения по ID
export const getAccommodationById = async (id) => {
  try {
    const response = await api.get(`/accommodations/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении размещения с ID ${id}:`, error);
    throw error;
  }
};

// 3. Получение размещений по рейтингу (или минимальному рейтингу)
export const getAccommodationByRate = async (rate) => {
  try {
    const response = await api.get(`/accommodations/rate/${rate}`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении размещения с рейтингом ${rate}:`, error);
    throw error;
  }
};
