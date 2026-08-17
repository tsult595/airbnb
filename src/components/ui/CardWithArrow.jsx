"use client"

import { useMemo, useState } from 'react'
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useUserStore } from '../../store/useUserStore.js'
import { useAddFavorite, useRemoveFavorite } from '../../hooks/useFavorites.js'

const CardWithArrow = ({ data = {} }) => {
   const { 
    id,
    _id,
    title = "Без названия", 
    price = "0", 
    period = "/ ночь", 
    rate = "5.0", 
    imageUrl,
    image_url,
    images,
    isFavorite: backendIsFavorite = false,
  } = data

  const [currentImage, setCurrentImage] = useState(0)
  const router = useRouter()
  const user = useUserStore((state) => state.user)
  const favoriteIds = useUserStore((state) => state.favoriteIds)
  const addFavoriteMutation = useAddFavorite()
  const removeFavoriteMutation = useRemoveFavorite()
  const accommodationId = id || _id
  const userId = user?.id || user?._id

  // 1. Извлекаем главный фото-URL (гибко под оба формата названия)
  const mainPhoto = imageUrl || image_url

  // 2. Безопасно собираем уникальный массив ссылок
  const allImages = useMemo(() => Array.from(new Set([
    ...(mainPhoto ? [mainPhoto] : []),
    ...(Array.isArray(images) ? images : [])
  ].filter(Boolean))), [images, mainPhoto])

  const hasMultipleImages = allImages.length > 1
  const activeImageIndex = Math.min(currentImage, Math.max(allImages.length - 1, 0))
  const isFavorite = favoriteIds.includes(String(accommodationId)) || backendIsFavorite
  const isFavoriteMutationPending = addFavoriteMutation.isPending || removeFavoriteMutation.isPending

  // Следующая картинка
  const nextImage = (e) => {
    e.stopPropagation()
    setCurrentImage(activeImageIndex === allImages.length - 1 ? 0 : activeImageIndex + 1)
  }

  // Предыдущая картинка
  const prevImage = (e) => {
    e.stopPropagation()
    setCurrentImage(activeImageIndex === 0 ? allImages.length - 1 : activeImageIndex - 1)
  }

    const handleCardClick = () => {
    if (accommodationId) {
      router.push(`/apartmentsDetail?id=${accommodationId}`)
      return
    }

    router.push('/apartmentsDetail')
  }

  const handleLikeToggle = (event) => {
    event.stopPropagation()

    if (!user || !accommodationId) return

    const payload = { userId, accommodationId }
    if (isFavorite) {
      removeFavoriteMutation.mutate(payload)
    } else {
      addFavoriteMutation.mutate(payload)
    }
  }

  return (
    <div className="w-full flex flex-col gap-2 cursor-pointer group"
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
     
      {/* ================================= */}
      {/* IMAGE CONTAINER */}
      {/* ================================= */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">

        {allImages.length > 0 ? (
          <Image
            src={allImages[activeImageIndex]}
            alt={`${title} - фото ${activeImageIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            Нет фото
          </div>
        )}

        {/* ================================= */}
        {/* HEART */}
        {/* ================================= */}
        <button
          type="button"
          onClick={handleLikeToggle}
          disabled={!user || !accommodationId || isFavoriteMutationPending}
          className="absolute top-3 right-3 p-1.5 rounded-full transition-transform active:scale-90 focus:outline-none z-20"
          aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          aria-pressed={isFavorite}
        >
          <Heart
            className={`w-6 h-6 stroke-[2] transition-colors duration-200 ${
              isFavorite
                ? 'fill-red-500 stroke-red-500'
                : 'fill-black/30 stroke-white'
            }`}
          />
        </button>

        {/* ================================= */}
        {/* LEFT ARROW */}
        {/* ================================= */}
        {hasMultipleImages && (
          <button
            type="button"
            onClick={prevImage}
            className="
              absolute left-3 top-1/2 -translate-y-1/2 z-20
              w-8 h-8 rounded-full bg-white/90 hover:bg-white
              shadow-md flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition-all duration-200
              active:scale-90
            "
            aria-label="Предыдущая фотография"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
        )}

        {/* ================================= */}
        {/* RIGHT ARROW */}
        {/* ================================= */}
        {hasMultipleImages && (
          <button
            type="button"
            onClick={nextImage}
            className="
              absolute right-3 top-1/2 -translate-y-1/2 z-20
              w-8 h-8 rounded-full bg-white/90 hover:bg-white
              shadow-md flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition-all duration-200
              active:scale-90
            "
            aria-label="Следующая фотография"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>
        )}

        {/* ================================= */}
        {/* DOTS */}
        {/* ================================= */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {allImages.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImage(index)
                }}
                className={`
                  rounded-full transition-all duration-200
                  ${
                    activeImageIndex === index
                      ? 'w-2 h-2 bg-white'
                      : 'w-1.5 h-1.5 bg-white/60 hover:bg-white/80'
                  }
                `}
                aria-label={`Перейти к фото ${index + 1}`}
              />
            ))}
          </div>
        )}

      </div>

      {/* ================================= */}
      {/* TEXT */}
      {/* ================================= */}
      <div className="flex flex-col gap-0.5 px-0.5">
        <h3 className="font-semibold text-gray-900 text-base sm:text-lg leading-snug truncate">
          {title}
        </h3>

        <div className="flex items-center justify-between text-sm sm:text-base text-gray-600 font-normal">
          <span>
            <strong className="font-semibold text-gray-900">
              ${Math.round(Number(price) || 0)}
            </strong>{" "}
            {period}
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

export default CardWithArrow
