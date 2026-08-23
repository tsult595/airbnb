import { useQuery } from '@tanstack/react-query'
import { api } from '../api/api.js'

export const useBookedDates = (accommodationId) => {
  return useQuery({
    queryKey: ['bookedDates', accommodationId],
    queryFn: async () => {
      const response = await api.get(`/accommodations/${accommodationId}/booked-dates`)
      return response.data // Ожидаем массив [{ from: '2026-08-20', to: '2026-08-25' }, ...]
    },
    enabled: Boolean(accommodationId),
    staleTime: 1000 * 60 * 5, // Кэшируем на 5 минут
  })
}