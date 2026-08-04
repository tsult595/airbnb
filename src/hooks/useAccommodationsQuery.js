import { useQuery } from '@tanstack/react-query'
import { getAccommodations , getAccommodationById} from '../api/acommodationApi'



// Хук для получения вообще всех вариантов (с фильтрами из Zustand, если надо)
export const useAllAccommodations = (params = {}) => {
  return useQuery({
    queryKey: ['accommodations', 'all', params],
    queryFn: () => getAccommodations(params),
    staleTime: 0,
    refetchOnWindowFocus: false,
  })
}


export const useAccommodationById = (id) => {
  return useQuery({
    queryKey: ['accommodation', id],
    queryFn: () => getAccommodationById(id), // Функция, которая делает запрос типа /api/apartments/123
    enabled: !!id, // Запрос выполнится только тогда, когда id реально есть
    staleTime: 0,
    refetchOnWindowFocus: false,
  })
}