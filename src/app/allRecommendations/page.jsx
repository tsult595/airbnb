'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'

import { useSearchStore } from '../../store/useSearchStore.js'
import { useAllAccommodations } from '../../hooks/useAccommodationsQuery'
import Card from '../../components/ui/Card.jsx'
import AllRecommendationsHeader from '../../components/AllRecommendationsHeader.jsx'
import AllRecommendationsHeaderSm from '../../components/AllRecommendationsHeaderSm.jsx'

// Динамический импорт карты БЕЗ SSR
const Map = dynamic(() => import('../../components/Map.jsx'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-gray-100 animate-pulse rounded-3xl flex items-center justify-center text-gray-400">
      Загрузка карты...
    </div>
  ),
})

export default function AllRecommendationsPage() {
  const searchParams = useSearchParams()
  const [hoveredItem, setHoveredItem] = useState(null)

  // 1. Считываем Query-параметры из URL
  const rawCategory = searchParams.get('category') || 'all'
  const minRate = searchParams.get('rate')
  const city = searchParams.get('city') || undefined

  // Нормализуем категорию
  const categoryMap = {
    apartments: 'apartment',
    hotels: 'hotel',
    all: undefined,
  }
  const categoryForApi = categoryMap[rawCategory] || (rawCategory !== 'all' ? rawCategory : undefined)

  // 2. Фильтры из Zustand
  const { dateRange, location, guests } = useSearchStore()

  // 3. Параметры запроса
  const queryParams = {
    category: categoryForApi,
    rate: minRate || undefined,
    location: location || undefined,
    guests: guests > 1 ? guests : undefined,
    checkIn: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
    checkOut: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
    city: city || undefined,
  }

  // 4. Запрос TanStack Query
  const { data: accommodations = [], isLoading, isError } = useAllAccommodations(queryParams)

  const pageTitle = 
    rawCategory === 'apartments' ? 'Все квартиры' :
    rawCategory === 'hotels' ? 'Все отели' : 'Все предложения'

  return (
    <>
      {/* Хедеры */}
      <div className="block md:hidden"> 
        <AllRecommendationsHeaderSm /> 
      </div>
      <div className="hidden md:block"> 
        <AllRecommendationsHeader /> 
      </div>

      {/* 🛠️ ТЕПЕРЬ ШИРИНА ~94% (ИЛИ ДО 1800px) С МИНИМАЛЬНЫМИ ОТСТУПАМИ ПО БОКАМ */}
      <div className="w-[94%] max-w-[1850px] mx-auto px-2 sm:px-4 my-6 md:my-30">
        
        {/* Кнопка "Назад" и Заголовок */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            href="/" 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{pageTitle}</h1>
            {minRate && (
              <p className="text-sm text-gray-500 font-medium">Рейтинг от {minRate} ★</p>
            )}
          </div>
        </div>

        {/* Главная сетка */}
        <div className="flex flex-col lg:flex-row gap-6 relative items-start">
          
          {/* ================= СЛЕВА: Карточки ================= */}
          <div className="w-full lg:w-1/2 xl:w-[52%]">
            
            {/* Скелетон */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div 
                    key={idx} 
                    className="w-full h-[300px] bg-gray-100 animate-pulse rounded-2xl" 
                  />
                ))}
              </div>
            )}

            {/* Ошибка */}
            {isError && (
              <div className="text-center py-12 text-red-500 font-medium">
                Произошла ошибка при загрузке данных. Попробуйте обновить страницу.
              </div>
            )}

            {/* Пусто */}
            {!isLoading && !isError && accommodations.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Вариантов по вашему запросу не найдено.
              </div>
            )}

            {/* Список карточек */}
            {!isLoading && !isError && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
                {accommodations.map((item) => (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`transition-all duration-200 rounded-2xl p-1 ${
                      hoveredItem?.id === item.id ? '' : ''
                    }`}
                  >
                    <Card data={item} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ================= СПРАВА: Карта ================= */}
          <div className="w-full lg:w-1/2 xl:w-[48%] lg:sticky lg:top-20 h-[500px] lg:h-[calc(100vh-100px)]">
            <Map 
              items={accommodations} 
              hoveredItem={hoveredItem}
              onSelect={(item) => setHoveredItem(item)}
            />
          </div>

        </div>

      </div>
    </>
  )
}