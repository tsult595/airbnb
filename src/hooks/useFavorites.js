import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addFavorite, removeFavorite, getFavorites } from '../api/favoritesApi'
import { useUserStore } from '../store/useUserStore'

const getItemId = (item) => String(item?.id || item?._id || item?.accommodationId || item?.accommodation?.id || item?.accommodation?._id)
const getFavoritesList = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

export const useFavorites = (userId) => {
  const setFavoriteIds = useUserStore((state) => state.setFavoriteIds)

  return useQuery({
    queryKey: ['favorites', userId],
    queryFn: async () => {
      const data = await getFavorites(userId)
      // 🟢 Записываем ID в Zustand при получении данных с сервера
      const favorites = getFavoritesList(data)
      setFavoriteIds(favorites.map(getItemId).filter((id) => id !== 'undefined'))
      return favorites
    },
    enabled: Boolean(userId),
  })
}

export const useAddFavorite = () => {
  const queryClient = useQueryClient()
  const addFavoriteId = useUserStore((state) => state.addFavoriteId)

  return useMutation({
    mutationFn: ({ userId, accommodationId }) => addFavorite(userId, accommodationId),

    onMutate: async ({ accommodationId }) => {
      const previousFavoriteIds = useUserStore.getState().favoriteIds
      addFavoriteId(accommodationId)
      return { previousFavoriteIds }
    },

    onError: (_error, _variables, context) => {
      useUserStore.getState().setFavoriteIds(context?.previousFavoriteIds ?? [])
    },

    onSettled: (data, error, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['favorites', userId] })
    },
  })
}

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient()
  const removeFavoriteId = useUserStore((state) => state.removeFavoriteId)

  return useMutation({
    mutationFn: ({ userId, accommodationId }) => removeFavorite(userId, accommodationId),

    onMutate: async ({ accommodationId }) => {
      const previousFavoriteIds = useUserStore.getState().favoriteIds
      removeFavoriteId(accommodationId)
      return { previousFavoriteIds }
    },

    onError: (_error, _variables, context) => {
      useUserStore.getState().setFavoriteIds(context?.previousFavoriteIds ?? [])
    },

    onSettled: (data, error, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['favorites', userId] })
    },
  })
}
