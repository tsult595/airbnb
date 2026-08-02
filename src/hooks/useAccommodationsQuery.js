import { useQuery } from '@tanstack/react-query'
import { getAccommodations} from '../api/acommodationApi'



// Хук для получения вообще всех вариантов (с фильтрами из Zustand, если надо)
export const useAllAccommodations = (params = {}) => {
  return useQuery({
    queryKey: ['accommodations', 'all', params],
    queryFn: () => getAccommodations(params),
    staleTime: 0,
    refetchOnWindowFocus: false,
  })
}