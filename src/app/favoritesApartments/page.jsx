"use client"

import React from 'react'
import { Heart, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Card from '../../components/ui/Card.jsx'
import { useUserStore } from '../../store/useUserStore.js'
import { useFavorites } from '../../hooks/useFavorites.js'

const FavoritesApartments = () => {
  const router = useRouter()
  const user = useUserStore((state) => state.user)
  const userId = user?.id || user?._id

  const { data: favorites = [], isLoading, isError } = useFavorites(userId)

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Зайдите в аккаунт</h2>
        <p className="text-gray-500 max-w-md mb-6">
          Чтобы просматривать и сохранять понравившиеся варианты жилья, войдите в свою учетную запись.
        </p>
        <button
          onClick={() => router.push('/login')}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors shadow-sm"
        >
          Войти в аккаунт
        </button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Избранное</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3 animate-pulse">
              <div className="w-full aspect-[4/3] bg-gray-200 rounded-2xl" />
              <div className="h-5 bg-gray-200 rounded-md w-3/4" />
              <div className="h-4 bg-gray-200 rounded-md w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-red-500 font-medium mb-4">Не удалось загрузить список избранного</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Обновить страницу
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Избранное</h1>
          <p className="text-gray-500 text-sm mt-1">
            {favorites.length} {favorites.length === 1 ? 'объект' : favorites.length > 1 && favorites.length < 5 ? 'объекта' : 'объектов'}
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200 rounded-3xl p-8">
          <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4">
            <Home className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">У вас пока нет избранных апартаментов</h3>
          <p className="text-gray-500 max-w-sm mb-6">
            Нажимайте на значок сердечка на карточках жилья, чтобы сохранить их здесь для быстрого доступа.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gray-900 hover:bg-black text-white font-medium rounded-xl transition-colors"
          >
            Искать жилье
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((item) => (
            <Card key={item.id} data={{ ...item, isFavorite: true }} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesApartments