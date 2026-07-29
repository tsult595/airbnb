// store/useSearchStore.js
import { create } from 'zustand';

export const useSearchStore = create((set) => ({
  // Состояние фильтров
  location: '',
  dateRange: { from: undefined, to: undefined },
  guests: 1,
  activeCategory: null,

  // Состояние интерфейса
  isCalendarOpen: false,

  // Экшены
  setLocation: (location) => set({ location }),
  setDateRange: (dateRange) => set({ dateRange }),
  setGuests: (guests) => set({ guests }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  setIsCalendarOpen: (isOpen) => set((state) => ({ 
    isCalendarOpen: typeof isOpen === 'function' ? isOpen(state.isCalendarOpen) : isOpen 
  })),
  
  // Очистка фильтров
  resetFilters: () => set({ 
    location: '', 
    dateRange: { from: undefined, to: undefined }, 
    guests: 1, 
    activeCategory: null 
  }),
}));