"use client"

import { useEffect, useMemo, useState } from 'react'
import { Heart, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from "next/image"
import { useUserStore } from '../../store/useUserStore.js' // Достаем текущего юзера
import { useAddFavorite, useFavorites, useRemoveFavorite } from '../../hooks/useFavorites.js'

const getItemId = (item) => item?.id || item?._id || item?.accommodationId || item?.accommodation?.id || item?.accommodation?._id

const Card = ({ data = {} }) => {
  const { 
    id,
    _id,
    title = "Без названия", 
    price = "0", 
    period = "/ ночь", 
    rate = "5.0", 
    imageUrl,
    isFavorite = false // Если бэкенд сразу присылает статус лайка
  } = data

  const router = useRouter()
  const user = useUserStore((state) => state.user)
  const accommodationId = id || _id
  const userId = user?.id || user?._id

  const { data: favorites = [] } = useFavorites(userId)

  const isPersistedFavorite = useMemo(() => {
    if (!accommodationId || !Array.isArray(favorites)) return false

    return favorites.some((favoriteItem) => String(getItemId(favoriteItem)) === String(accommodationId))
  }, [favorites, accommodationId])

  // Стейт лайка: синхронизируется с бэкендом (favorites)
  const [isLiked, setIsLiked] = useState(isFavorite || isPersistedFavorite)

  useEffect(() => {
    setIsLiked(Boolean(isFavorite || isPersistedFavorite))
  }, [isFavorite, isPersistedFavorite])

  // Мутации для добавления/удаления
  const addFavoriteMutation = useAddFavorite()
  const removeFavoriteMutation = useRemoveFavorite()

  const handleCardClick = () => {
    if (accommodationId) {
      router.push(`/apartmentsDetail?id=${accommodationId}`)
      return
    }
    router.push('/apartmentsDetail')
  }

  // Обработчик лайка
  const handleLikeToggle = (e) => {
    e.stopPropagation() // Предотвращаем переход на страницу карточки

    if (!user) {
      alert("Пожалуйста, войдите в систему, чтобы добавлять в избранное")
      return
    }

    // Оптимистично меняем UI
    const nextLikedState = !isLiked
    setIsLiked(nextLikedState)

    if (nextLikedState) {
      // Добавляем в избранное
      addFavoriteMutation.mutate(
        { userId, accommodationId },
        {
          onError: () => setIsLiked(false) // Откатываем UI при ошибке
        }
      )
    } else {
      // Удаляем из избранного
      removeFavoriteMutation.mutate(
        { userId, accommodationId },
        {
          onError: () => setIsLiked(true) // Откатываем UI при ошибке
        }
      )
    }
  }

  return (
    <div
      className="w-full flex flex-col gap-2 cursor-pointer group"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          handleCardClick()
        }
      }}
    >
      {/* Контейнер картинки */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            Нет фото
          </div>
        )}

        {/* Кнопка Лайка (Сердечко) */}
        <button 
          onClick={handleLikeToggle}
          className="absolute top-3 right-3 p-1.5 rounded-full transition-transform active:scale-90 focus:outline-none z-5"
          aria-label="В избранное"
        >
          <Heart 
            className={`w-6 h-6 stroke-[2] transition-colors duration-200 ${
              isLiked 
                ? 'fill-red-500 stroke-red-500' 
                : 'fill-black/30 stroke-white'
            }`} 
          />
        </button>
      </div>

      {/* Текстовый блок */}
      <div className="flex flex-col gap-0.5 px-0.5">
        <h3 className="font-semibold text-gray-900 text-base sm:text-lg leading-snug truncate">
          {title}
        </h3>

        <div className="flex items-center justify-between text-sm sm:text-base text-gray-600 font-normal">
          <span>
            <strong className="font-semibold text-gray-900">${Math.round(Number(price))}</strong> {period}
          </span>

          <div className="flex items-center gap-1 text-gray-800 font-medium">
            <Star className="w-4 h-4 fill-gray-800 text-gray-800" />
            <span>{rate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card