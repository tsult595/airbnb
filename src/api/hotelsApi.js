// import { api } from "./api";

// const getHotels = async (params) => {
//   try {
//     const response = await api.get("/hotels", { params });
//     return response.data; // Возвращаем данные от сервера
//   } catch (error) {
//     console.error("Ошибка при получении отелей:", error);
//     throw error; // Пробрасываем ошибку дальше
//   }
// };

// const getHotelById = async (id) => {
//   try {
//     const response = await api.get(`/hotels/${id}`);
//     return response.data; // Возвращаем данные отеля
//   } catch (error) {
//     console.error(`Ошибка при получении отеля с ID ${id}:`, error);
//     throw error; // Пробрасываем ошибку дальше
//   }
// };


// const getHotelByRate = async (rate) => {
//   try {
//     const response = await api.get(`/hotels/rate/${rate}`);
//     return response.data; // Возвращаем данные отеля
//   }
//     catch (error) {
//     console.error(`Ошибка при получении отеля с рейтингом ${rate}:`, error);
//     throw error; // Пробрасываем ошибку дальше
//   }
// };

// const createHotel = async (hotelData) => {
//   try {
//     const response = await api.post("/hotels", hotelData);
//     return response.data; // Возвращаем данные созданного отеля
//   }
//     catch (error) {
//     console.error("Ошибка при создании отеля:", error);
//     throw error; // Пробрасываем ошибку дальше
//   }
// };

// export { getHotels, getHotelById , getHotelByRate, createHotel };