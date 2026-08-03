"use client"

import { useState } from 'react'
import { Heart, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from "next/image"


const Card = ({ data = {} }) => {
  const { 
    id,
    _id,
    title = "Без названия", 
    price = "0", 
    period = "/ ночь", 
    rate = "5.0", 
    imageUrl 
  } = data

  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)

  const handleCardClick = () => {
    const itemId = id || _id

    if (itemId) {
      router.push(`/apartmentsDetail?id=${itemId}`)
      return
    }

    router.push('/apartmentsDetail')
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
          onClick={(e) => {
            e.stopPropagation()
            setIsLiked(!isLiked)
          }}
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