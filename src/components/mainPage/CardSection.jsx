'use client'

import { ArrowRight } from "lucide-react"
import Card from "../ui/Card"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAllAccommodations } from "../../hooks/useAccommodationsQuery"
import SeeAllCard from "../../components/SeeAllCard.jsx"

const CardSection = () => {
  const router = useRouter()

  // 1. Делаем два независимых запроса напрямую к PostgreSQL (через индексы)
 const { 
  data: apartments = [], 
  isLoading: isApartmentsLoading, 
  isError: isApartmentsError 
} = useAllAccommodations({ category: 'apartment', rate: '4.0' })

console.log(apartments);
  const { 
  data: hotels = [], 
  isLoading: isHotelsLoading, 
  isError: isHotelsError 
} = useAllAccommodations({ category: 'hotel', rate: '4.0' })

  const handleSeeAll = (type) => {
    router.push(`/allRecommendations?category=${type}`)
  }

  const handleSeeAllCity = (cityName) => {
  router.push(`/allRecommendations?city=${cityName}`)
}

  const { 
  data: tbilisiApartments = [], 
  isLoading: isTbilisiLoading, 
  isError: isTbilisiError 
} = useAllAccommodations({ city: 'Tbilisi' })



  return (
    <div className="w-full space-y-9">
      
      {/* ================= СЕКЦИЯ 1: КВАРТИРЫ ================= */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl text-black font-bold">Топ Рекомендации квартир</h2>
          <Link 
            href="/allRecommendations?category=apartments" 
            className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-black transition-colors"
          >
            <span>Все</span>
            <ArrowRight className="h-5 w-5 text-gray-500" />
          </Link>
        </div>

        <div className="w-full overflow-x-auto no-scrollbar flex items-stretch gap-4 py-2 px-1">
          {isApartmentsLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="w-[180px] sm:w-[220px] md:w-[260px] shrink-0 h-[260px] bg-gray-100 animate-pulse rounded-2xl" />
            ))
          ) : isApartmentsError ? (
            <p className="text-sm text-red-500 py-4">Не удалось загрузить квартиры</p>
          ) : apartments.length === 0 ? (
            <p className="text-sm text-gray-400 py-4">Нет доступных квартир</p>
          ) : (
            apartments.slice(0, 6).map((item) => (
              <div key={item.id} className="w-[180px] sm:w-[220px] md:w-[260px] shrink-0">
                <Card data={item} />
              </div>
            ))
          )}

          {/* Карточка «Посмотреть все» */}
          <div className="w-[140px] sm:w-[180px] md:w-[200px] shrink-0 flex">
            <SeeAllCard onClick={() => handleSeeAll('apartments')} />
          </div>
        </div>
      </div>

      {/* ================= СЕКЦИЯ 2: ОТЕЛИ ================= */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl text-black font-bold">Топ Рекомендации отелей</h2>
          <Link 
            href="/allRecommendations?category=hotels" 
            className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-black transition-colors"
          >
            <span>Все</span>
            <ArrowRight className="h-5 w-5 text-gray-500" />
          </Link>
        </div>

        <div className="w-full overflow-x-auto no-scrollbar flex items-stretch gap-4 py-2 px-1">
          {isHotelsLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="w-[180px] sm:w-[220px] md:w-[260px] shrink-0 h-[260px] bg-gray-100 animate-pulse rounded-2xl" />
            ))
          ) : isHotelsError ? (
            <p className="text-sm text-red-500 py-4">Не удалось загрузить отели</p>
          ) : hotels.length === 0 ? (
            <p className="text-sm text-gray-400 py-4">Нет доступных отелей</p>
          ) : (
            hotels.slice(0, 6).map((item) => (
              <div key={item.id} className="w-[180px] sm:w-[220px] md:w-[260px] shrink-0">
                <Card data={item} />
              </div>
            ))
          )}

          {/* Карточка «Посмотреть все» */}
          <div className="w-[140px] sm:w-[180px] md:w-[200px] shrink-0 flex">
            <SeeAllCard onClick={() => handleSeeAll('hotels')} />
          </div>
        </div>
      </div>
         {/* ================= СЕКЦИЯ 2: Tbilisi ================= */}
  <div>
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl sm:text-2xl text-black font-bold">
      Тбилиси: свободное жилье в эти выходные
    </h2>
    <Link 
      href="/allRecommendations?city=Tbilisi" 
      className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-black transition-colors"
    >
      <span>Все</span>
      <ArrowRight className="h-5 w-5 text-gray-500" />
    </Link>
  </div>

  <div className="w-full overflow-x-auto no-scrollbar flex items-stretch gap-4 py-2 px-1">
    {isTbilisiLoading ? (
      Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="w-[180px] sm:w-[220px] md:w-[260px] shrink-0 h-[260px] bg-gray-100 animate-pulse rounded-2xl" />
      ))
    ) : isTbilisiError ? (
      <p className="text-sm text-red-500 py-4">Не удалось загрузить жилье в Тбилиси</p>
    ) : tbilisiApartments.length === 0 ? (
      <p className="text-sm text-gray-400 py-4">Нет доступных вариантов в Тбилиси</p>
    ) : (
      tbilisiApartments.slice(0, 6).map((item) => (
        <div key={item.id} className="w-[180px] sm:w-[220px] md:w-[260px] shrink-0">
          <Card data={item} />
        </div>
      ))
    )}

    {/* Карточка «Посмотреть все» */}
    <div className="w-[140px] sm:w-[180px] md:w-[200px] shrink-0 flex">
     <SeeAllCard onClick={() => handleSeeAllCity('Tbilisi')} />
    </div>
  </div>
  </div>

    </div>
  )
}

export default CardSection