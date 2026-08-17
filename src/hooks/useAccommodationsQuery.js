import { useQuery } from '@tanstack/react-query'
import { getAccommodations, getAccommodationById } from '../api/acommodationApi'
import { useUserStore } from '../store/useUserStore.js'

export const useAllAccommodations = (params = {}) => {
  const user = useUserStore((state) => state.user)
  const hasHydrated = useUserStore((state) => state._hasHydrated)
  
  const userId = user?.id || user?._id || null

  return useQuery({
    // 🟢 Формируем queryKey из стабильных значений, а не из нового объекта
    queryKey: ['accommodations', 'all', params, userId],
    queryFn: () => getAccommodations({ ...params, ...(userId && { userId }) }),
    
    // Ждем гидратации Zustand (работает и для авторизованных, и для гостей)
    enabled: hasHydrated !== false, 
    
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  })
}

export const useAccommodationById = (id) => {
  const user = useUserStore((state) => state.user)
  const hasHydrated = useUserStore((state) => state._hasHydrated)
  
  const userId = user?.id || user?._id || null

  return useQuery({
    queryKey: ['accommodation', String(id), userId],
    queryFn: () => getAccommodationById(id, userId),
    enabled: Boolean(id) && hasHydrated !== false,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  })
}