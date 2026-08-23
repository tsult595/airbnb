import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../api/api.js'

// 1. Хук для создания бронирования
export const useCreateBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ accommodationId, userId, checkIn, checkOut }) => {
      // Исправлен URL: добавлен префикс /accommodations
      const response = await api.post('/accommodations/bookings', {
        accommodationId,
        userId,
        checkIn,
        checkOut,
      })
      return response.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['bookedDates', variables.accommodationId],
      })
      queryClient.invalidateQueries({
        queryKey: ['userBookings', variables.userId],
      })
    },
  })
}

// 2. Хук для получения списка всех бронирований пользователя
export const useUserBookings = (userId) => {
  return useQuery({
    queryKey: ['userBookings', userId],
    queryFn: async () => {
      // Исправлен URL: путь совпадает с роутером /accommodations/user/:userId/bookings
      const response = await api.get(`/accommodations/user/${userId}/bookings`)
      return response.data
    },
    enabled: Boolean(userId),
  })
}