import { create } from 'zustand'

export const useSearchStore = create((set) => ({
  activeTab: 'all',
  dateRange: undefined,
  location: '',
  guests: 1,

  setActiveTab: (activeTab) => set({ activeTab }),
  setDateRange: (dateRange) => set({ dateRange }),
  setLocation: (location) => set({ location }),
  setGuests: (guests) => set({ guests }),
}))