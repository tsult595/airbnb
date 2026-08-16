import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getFavorites, removeFavorite, addFavorite } from '../api/favoritesApi'

export const useFavorites = (userId) => {
  return useQuery({
    queryKey: ['favorites', String(userId)],
    queryFn: () => getFavorites(userId),
    enabled: Boolean(userId),
  });
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, accommodationId }) => addFavorite(userId, accommodationId),
    onSuccess: (_, variables) => {
      // 🟢 Инвалидируем ВСЕ запросы, начинающиеся с 'favorites' и 'accommodations'
      queryClient.invalidateQueries({ queryKey: ['favorites', String(variables.userId)] });
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
    },
  });
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, accommodationId }) => removeFavorite(userId, accommodationId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['favorites', String(variables.userId)] });
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
    },
  });
};