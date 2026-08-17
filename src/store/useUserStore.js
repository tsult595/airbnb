import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      // 🟢 Добавляем массив ID избранного
      favoriteIds: [], 

      setUser: (user) => set({ user }),

      // 🟢 Методы для управления избранным в Zustand
      setFavoriteIds: (ids) => set({ favoriteIds: ids.map(String) }),

      addFavoriteId: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(String(id))
            ? state.favoriteIds
            : [...state.favoriteIds, String(id)],
        })),

      removeFavoriteId: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.filter((favId) => favId !== String(id)),
        })),

      logout: () => set({ user: null, favoriteIds: [] }),

      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'user-storage',
      partialize: ({ user, favoriteIds }) => ({ user, favoriteIds }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)

