'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useGoogleLogin } from '@react-oauth/google' // 🔥 Импортируем хук Google
import { login, register as registerUser, loginWithGoogle } from '../../api/authApi' 


// Схемы Zod
const loginSchema = z.object({
  email: z.string().min(1, 'Введите email или логин'),
  password: z.string().min(6, 'Пароль должен быть от 6 символов'),
})

const registerSchema = z.object({
  email: z.string().email('Некорректный формат Email'),
  password: z.string().min(6, 'Пароль должен быть от 6 символов'),
  avatar: z.string().optional(), 
})



const AuthModal = ({ isOpen, onClose }) => {
  const router = useRouter()
  const [authMode, setAuthMode] = useState('signin')
  const [serverError, setServerError] = useState('')
  

  // Общая функция успеха после любого входа (Form или Google)
  const handleAuthSuccess = (data) => {
    const token = data?.token || data?.data?.token
    if (token) {
      localStorage.setItem('token', token)
      onClose()
      router.push('/')
    } else {
      setServerError('Не удалось получить токен от сервера')
    }
  }

  // Мутация для обычной формы (Email/Password)
  const { mutate, isPending } = useMutation({
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

  // 🔥 Мутация для Google авторизации
  const googleMutation = useMutation({
    mutationFn: (googleToken) => loginWithGoogle(googleToken),
    onSuccess: handleAuthSuccess,
    onError: (error) => {
      const message = error?.response?.data?.message || 'Ошибка авторизации через Google'
      setServerError(message)
    }
  })

  // 🔥 Кастомная кнопка Google Login
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      // access_token от Google отправляем на бэкенд
      if (credentialResponse.access_token) {
        googleMutation.mutate(credentialResponse.access_token)
      }
    },
    onError: () => {
      setServerError('Ошибка подключения к Google')
    }
  })

  const currentSchema = authMode === 'signin' ? loginSchema : registerSchema

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(currentSchema),
    mode: 'onChange',
  })

  if (!isOpen) return null

  const handleTabChange = (mode) => {
    setAuthMode(mode)
    setServerError('')
    reset()
  }

  const onSubmit = (data) => {
    setServerError('')
    mutate({ email: data.email, password: data.password, avatar: data.avatar }) // Передаем avatar при регистрации
  }

  const isLoading = isPending || googleMutation.isPending

  return (
    <div 
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm animate-in fade-in duration-200 text-black"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl ring-1 ring-black/5">
        
        {/* Шапка */}
        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Account</p>
            <h2 className="mt-1 text-2xl font-semibold text-gray-900">
              {authMode === 'signin' ? 'Sign in' : 'Register'}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Переключатель табов */}
        <div className="flex gap-2 px-6 pt-5">
          <button
            type="button"
            onClick={() => handleTabChange('signin')}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              authMode === 'signin' ? 'bg-[#FF385C] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('login')}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              authMode === 'login' ? 'bg-[#FF385C] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Register
          </button>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6 py-6">
          
          {serverError && (
            <div className="p-3 text-xs text-center font-medium text-red-600 bg-red-50 rounded-xl border border-red-200">
              {serverError}
            </div>
          )}

          {/* Поле Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {authMode === 'signin' ? 'Email or username' : 'Email'}
            </label>
            <input
              type="text"
              {...register('email')}
              placeholder={authMode === 'signin' ? 'Enter email or username' : 'Enter email'}
              className={`w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm outline-none transition-colors ${
                errors.email ? 'border-red-500 bg-red-50/50' : 'border-gray-200 focus:border-[#FF385C] focus:bg-white'
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Поле Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password')}
              placeholder="Enter password"
              className={`w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm outline-none transition-colors ${
                errors.password ? 'border-red-500 bg-red-50/50' : 'border-gray-200 focus:border-[#FF385C] focus:bg-white'
              }`}
            />
            {errors.password && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.password.message }
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
              Forgot password?
            </button>
          </div>

          {/* Кнопка отправки формы */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-[#FF385C] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#E00B41] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : authMode === 'signin' ? 'Sign in' : 'Register'}
          </button>

          {/* Разделитель "OR" */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="w-full border-t border-gray-200"></div>
            <span className="absolute bg-white px-3 text-xs uppercase tracking-wider text-gray-400">or</span>
          </div>

          {/* 🔥 Красивая кнопка Google */}
          <button
            type="button"
            onClick={() => handleGoogleLogin()}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-[0.99] disabled:opacity-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>

        </form>

      </div>
    </div>
  )
}

export default AuthModal