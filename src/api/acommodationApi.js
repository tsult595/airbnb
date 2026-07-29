import api from "./api"; // Предполагается, что тут твой инстанс axios

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

// 4. Поиск доступных жильцев по фильтрам (Форматирует данные из UI для бэкенда)
export const searchAccommodations = async ({ location, dateRange, guests, categoryId }) => {
  try {
    const params = {};

    if (location) params.location = location;
    if (categoryId) params.category = categoryId;
    if (guests) params.guests = guests;

    // Преобразуем объект дат из вашего DatePicker в формат ISO (YYYY-MM-DD)
    if (dateRange?.from) {
      params.checkIn = dateRange.from.toISOString().split("T")[0];
    }
    if (dateRange?.to) {
      params.checkOut = dateRange.to.toISOString().split("T")[0];
    }

    return await getAccommodations(params);
  } catch (error) {
    console.error("Ошибка при поиске доступных вариантов:", error);
    throw error;
  }
};