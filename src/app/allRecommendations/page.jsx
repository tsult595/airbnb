'use client'

import { useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import { useSearchStore } from '../../store/useSearchStore.js'
import { useAllAccommodations } from '../../hooks/useAccommodationsQuery'
import AllRecommendationsHeader from '../../components/AllRecommendationsHeader.jsx'
import AllRecommendationsHeaderSm from '../../components/AllRecommendationsHeaderSm.jsx'
import CardWithArrow from '../../components/ui/CardWithArrow.jsx'

const Map = dynamic(() => import('../../components/Map.jsx'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-gray-100 animate-pulse rounded-3xl flex items-center justify-center text-gray-400">
      Загрузка карты...
    </div>
  ),
})

export default function AllRecommendationsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [hoveredItem, setHoveredItem] = useState(null)

  // 1. Считываем параметры из URL
  const rawCategory = searchParams.get('category') || 'all'
  const minRate = searchParams.get('rate')
  const city = searchParams.get('city') || undefined
  
  // 🟢 Получаем выбранные чипсы из URL (разделены запятой)
  const chipsFromUrl = searchParams.get('chips') 
    ? searchParams.get('chips').split(',') 
    : []

  // 2. Функция для клика по чипсу — обновляет URL, сохраняя остальные параметры
  const handleToggleChip = (chipLabel) => {
    const params = new URLSearchParams(searchParams.toString())
    let updatedChips = [...chipsFromUrl]

    if (updatedChips.includes(chipLabel)) {
      updatedChips = updatedChips.filter((c) => c !== chipLabel)
    } else {
      updatedChips.push(chipLabel)
    }

    if (updatedChips.length > 0) {
      params.set('chips', updatedChips.join(','))
    } else {
      params.delete('chips')
    }

    // Мгновенно обновляем URL (без перезагрузки страницы)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // 3. Категории и спец-флаги
  const categoryMap = {
    apartments: 'apartment',
    hotels: 'hotel',
    all: undefined,
  }

  const isHotelSelected = chipsFromUrl.includes('Гостиница')
  const categoryForApi = isHotelSelected ? 'hotel' : (categoryMap[rawCategory] || (rawCategory !== 'all' ? rawCategory : undefined))

  // 4. Разделяем выбранные чипсы на флаговые параметры и массив удобств (amenities)
  const selfCheckIn = chipsFromUrl.includes('Самостоятельное прибытие') ? 'true' : undefined
  const moreThanOneBath = chipsFromUrl.includes('Больше 1 ванной') ? 'true' : undefined

  // Фильтруем чипсы, оставляя только те, которые относятся к amenities
  const selectedAmenities = chipsFromUrl.filter(
    (chip) => !['Гостиница', 'Самостоятельное прибытие', 'Больше 1 ванной'].includes(chip)
  )

  const { dateRange, location, guests } = useSearchStore()

  // 5. Итоговый объект для запроса к Бэкенду
  const queryParams = {
    category: categoryForApi,
    rate: minRate || undefined,
    location: location || undefined,
    guests: guests > 1 ? guests : undefined,
    checkIn: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
    checkOut: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
    city: city || undefined,
    selfCheckIn,
    moreThanOneBath,
    // Превращаем массив удобств в строку с запятыми для бэкенда
    amenities: selectedAmenities.length > 0 ? selectedAmenities.join(',') : undefined,
  }

  // 6. TanStack Query перезапросит данные при изменении queryParams
  const { data: accommodations = [], isLoading, isError } = useAllAccommodations(queryParams)

  const pageTitle = city
    ? `Жилье в: ${city}`
    : rawCategory === 'apartments' ? 'Все квартиры'
    : rawCategory === 'hotels' ? 'Все отели'
    : 'Все предложения'

  return (
    <>
      <div className="block md:hidden"> 
        <AllRecommendationsHeaderSm/> 
      </div>
      
      <div className="hidden md:block"> 
        <AllRecommendationsHeader activeChips={chipsFromUrl} onToggleChip={handleToggleChip}/> 
      </div>

      <div className="w-[94%] max-w-[1850px] mx-auto px-2 sm:px-4 my-6 md:my-30">
        
        <div className="flex items-center gap-4 mb-6">
          <Link className="p-2 hover:bg-gray-100 rounded-full transition-colors" href="/">
            <ArrowLeft className="w-6 h-6 text-gray-700"/>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{pageTitle}</h1>
            {minRate && (
              <p className="text-sm text-gray-500 font-medium">Рейтинг от {minRate} ★</p>
            )}
            {chipsFromUrl.length > 0 && (
              <p className="text-sm text-gray-500 font-medium">
                Выбрано фильтров: {chipsFromUrl.length}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 relative items-start">
          <div className="w-full lg:w-1/2 xl:w-[52%]">
            
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

            {isError && (
              <div className="text-center py-12 text-red-500 font-medium">
                Произошла ошибка при загрузке данных. Попробуйте обновить страницу.
              </div>
            )}

            {!isLoading && !isError && accommodations.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Вариантов по вашему запросу не найдено.
              </div>
            )}

            {!isLoading && !isError && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
                {accommodations.map((item) => (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="transition-all duration-200 rounded-2xl p-1"
                  >
                    <CardWithArrow data={item} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 xl:w-[48%] lg:sticky lg:top-20 h-[500px] lg:h-[calc(100vh-100px)]">
            <Map hoveredItem={hoveredItem} items={accommodations} onSelect={(item) => setHoveredItem(item)}/>
          </div>

        </div>

      </div>
    </>
  )
}