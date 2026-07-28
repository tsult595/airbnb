"use client"

import { useState } from 'react'
import { Heart, Star } from 'lucide-react'
import homeImage from '../../assets/home.jpeg'
import Image from "next/image";

const Card = ({
  title = "Квартира, Баку",
  price = "22 569 RUB",
  period = "за 2 ночи",
  rating = "4,88",
  image = homeImage
}) => {
  const [isLiked, setIsLiked] = useState(false)

  // Проверка src для Next.js импорта картинки
  const imageSrc = typeof image === 'string' ? image : image?.src || image

  return (
    <div className="w-full flex flex-col gap-2 cursor-pointer group">
      {/* Контейнер картинки с кнопкой лайка */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />

        {/* Кнопка Лайка (Сердечко) */}
        <button 
          onClick={(e) => {
            e.stopPropagation()
            setIsLiked(!isLiked)
          }}
          className="absolute top-3 right-3 p-1.5 rounded-full transition-transform active:scale-90 focus:outline-none"
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
        {/* Название */}
        <h3 className="font-semibold text-gray-900 text-base sm:text-lg leading-snug truncate">
          {title}
        </h3>

        {/* Цена и Рейтинг */}
        <div className="flex items-center justify-between text-sm sm:text-base text-gray-600 font-normal">
          <span>
            <strong className="font-semibold text-gray-900">{price}</strong> {period}
          </span>

          <div className="flex items-center gap-1 text-gray-800 font-medium">
            <Star className="w-4 h-4 fill-gray-800 text-gray-800" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card