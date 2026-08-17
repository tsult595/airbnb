'use client'

import { Suspense, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import { useSearchStore } from '../../store/useSearchStore.js'
import { useAllAccommodations } from '../../hooks/useAccommodationsQuery'
import { getAccommodationItems, getAccommodationTotalPages } from '../../api/acommodationApi'
import AllRecommendationsHeader from '../../components/AllRecommendationsHeader.jsx'
import AllRecommendationsHeaderSm from '../../components/AllRecommendationsHeaderSm.jsx'
import CardWithArrow from '../../components/ui/CardWithArrow.jsx'
import Pagination from '../../components/Pagination.jsx'

const Map = dynamic(() => import('../../components/Map.jsx'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-gray-100 animate-pulse rounded-3xl flex items-center justify-center text-gray-400">
      Загрузка карты...
    </div>
  ),
})

function AllRecommendationsContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [hoveredItem, setHoveredItem] = useState(null)

  // 1. Считываем параметры из URL
  const rawCategory = searchParams.get('category') || 'all'
  const minRate = searchParams.get('rate')
  const city = searchParams.get('city') || undefined
  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1)
  const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit')) || 5))

  // 🟢 Получаем выбранные чипсы из URL
  const chipsFromUrl = searchParams.get('chips') 
    ? searchParams.get('chips').split(',') 
    : []

  // 2. Функция переключения чипсов
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

    // При смене фильтров сбрасываем страницу на 1-ю
    params.set('page', '1')

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // 3. Категории и спец-флаги
  const categoryMap = {
    apartments: 'apartment',
    hotels: 'hotel',
    all: undefined,
  }

  const isHotelSelected = chipsFromUrl.includes('Гостиница')
  const categoryForApi = isHotelSelected 
    ? 'hotel' 
    : (categoryMap[rawCategory] || (rawCategory !== 'all' ? rawCategory : undefined))

  const selfCheckIn = chipsFromUrl.includes('Самостоятельное прибытие') ? 'true' : undefined
  const moreThanOneBath = chipsFromUrl.includes('Больше 1 ванной') ? 'true' : undefined

  const selectedAmenities = chipsFromUrl.filter(
    (chip) => !['Гостиница', 'Самостоятельное прибытие', 'Больше 1 ванной'].includes(chip)
  )

  const { dateRange, location, guests } = useSearchStore()

  // 4. Итоговый объект параметров для бэкенда
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
    amenities: selectedAmenities.length > 0 ? selectedAmenities.join(',') : undefined,
    page: currentPage,
    limit: limit,
  }

  // 5. Запрос TanStack Query (вызываем хук ДО работы с `data`)
  const { data, isLoading, isError } = useAllAccommodations(queryParams)

  // 6. Достаем элементы и общее кол-во страниц из ответа API
  const accommodations = getAccommodationItems(data)
  const totalPages = getAccommodationTotalPages(data)

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(newPage))
    
    router.push(`${pathname}?${params.toString()}`, { scroll: true })
  }

  const pageTitle = city
    ? `Жилье в: ${city}`
    : rawCategory === 'apartments' ? 'Все квартиры'
    : rawCategory === 'hotels' ? 'Все отели'
    : 'Все предложения'

  return (
    <>
      <div className="block md:hidden"> 
        <AllRecommendationsHeaderSm /> 
      </div>
      
      <div className="hidden md:block"> 
        <AllRecommendationsHeader activeChips={chipsFromUrl} onToggleChip={handleToggleChip} /> 
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
          
          {/* Слева: Карточки и Пагинация */}
          <div className="w-full lg:w-1/2 xl:w-[52%] flex flex-col justify-between">
            <div>
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
                <div className="text-center py-12 text-red-500 font-medium" role="alert">
                  Произошла ошибка при загрузке данных. Попробуйте обновить страницу.
                </div>
              )}

              {!isLoading && !isError && accommodations.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  Вариантов по вашему запросу не найдено.
                </div>
              )}

              {!isLoading && !isError && accommodations.length > 0 && (
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

            {/* Пагинация */}
            {!isLoading && !isError && totalPages > 1 && (
              <div className="mt-8">
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={handlePageChange} 
                />
              </div>
            )}
          </div>

          {/* Справа: Карта */}
          <div className="w-full lg:w-1/2 xl:w-[48%] lg:sticky lg:top-20 h-[500px] lg:h-[calc(100vh-100px)]">
            <Map hoveredItem={hoveredItem} items={accommodations} onSelect={(item) => setHoveredItem(item)}/>
          </div>

        </div>

      </div>
    </>
  )
}

export default function AllRecommendationsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <AllRecommendationsContent />
    </Suspense>
  )
}
