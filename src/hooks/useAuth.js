import { useMutation } from '@tanstack/react-query'
import { login, register as registerUser } from '../api/authApi'

export const useAuth = ({ authMode, onSuccess, onError } = {}) => {
  return useMutation({
    // 1. Принимаем email, password и avatar из вызова mutate(...)
    mutationFn: ({ email, password, avatar }) => {
      return authMode === 'signin' 
        ? login(email, password) 
        : registerUser(email, password, avatar)
    },

    // 2. Логика успешной авторизации
    onSuccess: (data) => {
      // Автоматически сохраняем JWT токен для Axios Interceptor!
      if (data?.token) {
        localStorage.setItem('token', data.token)
      }
      // Вызываем колбэк из компонента (если передали)
      if (onSuccess) {
        onSuccess(data)
      }
    },

    // 3. Обработка ошибок
    onError: (error) => {
      const message = error?.response?.data?.message || 'Произошла ошибка при авторизации'
      // Передаём сообщение об ошибке в компонент (где лежит setServerError)
      if (onError) {
        onError(message)
      }
    }
  })
}