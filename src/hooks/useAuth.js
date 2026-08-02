import { useMutation } from '@tanstack/react-query'
import { login, register as registerUser } from '../api/authApi'

 export const useAuth = () => {
  return  useMutation({
    mutationFn: ({ email, password }) => {
      return authMode === 'signin' 
        ? login(email, password) 
        : registerUser(email, password)
    },
    onSuccess: handleAuthSuccess,
    onError: (error) => {
      const message = error?.response?.data?.message || 'Произошла ошибка при входе'
      setServerError(message)
    }
  })
}