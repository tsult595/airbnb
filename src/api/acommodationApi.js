import { api } from "./api";

export const getAccommodationItems = (payload) => {
  if (Array.isArray(payload)) return payload;

  const data = payload?.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;

  return [];
};

export const getAccommodationTotalPages = (payload) => {
  const totalPages = payload?.totalPages ?? payload?.pagination?.totalPages
    ?? payload?.data?.totalPages ?? payload?.data?.pagination?.totalPages;
  const parsedTotalPages = Number(totalPages);

  return Number.isInteger(parsedTotalPages) && parsedTotalPages > 0 ? parsedTotalPages : 1;
};

// Получение всех размещений с поддержкой фильтров (поиск, даты, гости, категория).
// Не отбрасываем метаданные ответа: они нужны для пагинации.
export const getAccommodations = async (params = {}) => {
  const response = await api.get("/accommodations", { params });
  return response.data;
};

// 2. Получение одного размещения по ID
export const getAccommodationById = async (id) => {
  const response = await api.get(`/accommodations/${id}`);
  return response.data?.data ?? response.data;
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
