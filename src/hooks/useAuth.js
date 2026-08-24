import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login, register as registerUser, logout as logoutApi } from '../api/authApi'
import { useUserStore } from '../store/useUserStore'

export const useAuth = ({ authMode, onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: ({ email, password, avatar }) => {
      return authMode === 'signin' 
        ? login(email, password) 
        : registerUser(email, password, avatar)
    },
    onSuccess: (responseData) => {
      // 🟢 Универсально извлекаем token и user (учитывая Axios или Fetch)
      const token = responseData?.token || responseData?.data?.token
      const user = responseData?.user || responseData?.data?.user

      if (token) {
        localStorage.setItem('token', token)
      }

      if (onSuccess) {
        onSuccess({ token, user })
      }
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Произошла ошибка при авторизации'
      if (onError) onError(message)
    }
  })
}



export const useLogout = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient()
  const logoutUser = useUserStore((state) => state.logout) // Метод из твоего Zustand стора

  return useMutation({
    mutationFn: logoutApi,

    onSuccess: (data) => {
      localStorage.removeItem('token')
      if (logoutUser) logoutUser()
      queryClient.clear() // Сбрасываем весь кэш React Query

      if (onSuccess) onSuccess(data)
    },

    onError: (error) => {
      // Чистим клиенский стейт даже если сервер вернул ошибку
      localStorage.removeItem('token')
      if (logoutUser) logoutUser()
      queryClient.clear()

      const message = error?.response?.data?.message || 'Ошибка при выходе из системы'
      if (onError) onError(message)
    }
  })
}