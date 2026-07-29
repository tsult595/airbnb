// hooks/useAccommodations.js
import { useQuery } from '@tanstack/react-query';
import { getAccommodations } from '../api/accommodationsApi';
import { useSearchStore } from '../store/useSearchStore';

export const useAccommodations = () => {
  // Вытаскиваем все фильтры из Zustand
  const { location, dateRange, guests, activeCategory } = useSearchStore();

  // Формируем объект параметров для API
  const queryParams = {
    ...(location && { location }),
    ...(activeCategory && { categoryId: activeCategory }),
    ...(guests > 1 && { guests }),
    ...(dateRange?.from && { checkIn: dateRange.from.toISOString().split('T')[0] }),
    ...(dateRange?.to && { checkOut: dateRange.to.toISOString().split('T')[0] }),
  };

  return useQuery({
    // queryKey зависит от всех фильтров: при их изменении запрос перезапустится
    queryKey: ['accommodations', queryParams],
    queryFn: () => getAccommodations(queryParams),
    
    // Полезные опции TanStack Query:
    staleTime: 1000 * 60 * 5, // Кэш считается свежим 5 минут
    keepPreviousData: true,   // Сохраняет старые данные во время загрузки новых (нет дергания UI)
  });
};