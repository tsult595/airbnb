import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addFavorite, removeFavorite, getFavorites } from '../api/favoritesApi'
import { useUserStore } from '../store/useUserStore'

const getItemId = (item) => String(item?.id || item?._id || item?.accommodationId || item?.accommodation?.id || item?.accommodation?._id)

export const useFavorites = (userId) => {
  const setFavoriteIds = useUserStore((state) => state.setFavoriteIds)

  return useQuery({
    queryKey: ['favorites', userId],
    queryFn: async () => {
      const data = await getFavorites(userId)
      // 🟢 Записываем ID в Zustand при получении данных с сервера
      if (Array.isArray(data)) {
        setFavoriteIds(data.map(getItemId))
      }
      return data
    },
    enabled: Boolean(userId),
  })
}

export const useAddFavorite = () => {
  const queryClient = useQueryClient()
  const addFavoriteId = useUserStore((state) => state.addFavoriteId)
  const removeFavoriteId = useUserStore((state) => state.removeFavoriteId)

  return useMutation({
    mutationFn: ({ userId, accommodationId }) => addFavorite(userId, accommodationId),

    onMutate: async ({ accommodationId }) => {
      // 🟢 Мгновенно добавляем ID в Zustand
      addFavoriteId(accommodationId)
    },

    onError: (err, { accommodationId }) => {
      // Откатываем при ошибке
      removeFavoriteId(accommodationId)
    },

    onSettled: (data, error, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['favorites', userId] })
    },
  })
}

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient()
  const addFavoriteId = useUserStore((state) => state.addFavoriteId)
  const removeFavoriteId = useUserStore((state) => state.removeFavoriteId)

  return useMutation({
    mutationFn: ({ userId, accommodationId }) => removeFavorite(userId, accommodationId),

    onMutate: async ({ accommodationId }) => {
      // 🟢 Мгновенно удаляем ID из Zustand
      removeFavoriteId(accommodationId)
    },

    onError: (err, { accommodationId }) => {
      // Откатываем при ошибке
      addFavoriteId(accommodationId)
    },

    onSettled: (data, error, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['favorites', userId] })
    },
  })
}