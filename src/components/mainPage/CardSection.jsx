'use client'

import { ArrowRight } from "lucide-react"
import Card from "../ui/Card"
import Link from 'next/link'

const CardSection = () => {
  return (
    <div className="w-full">
      {/* Заголовок со стрелкой */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl text-black font-bold">Рекомендации</h2>
        <Link href="/allRecommendations">
          <button className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-black transition-colors">
            <span>Все</span>
            <ArrowRight className="h-5 w-5 text-gray-500" />
          </button>
        </Link>
      </div>

      {/* Горизонтальный скролл карточек */}
      <div className="w-full overflow-x-auto no-scrollbar flex items-stretch gap-4 py-2 px-1">
        {/* Карточки */}
        <div className="w-[180px] sm:w-[220px] md:w-[260px] shrink-0">
          <Card />
        </div>
        <div className="w-[180px] sm:w-[220px] md:w-[260px] shrink-0">
          <Card />
        </div>
        <div className="w-[180px] sm:w-[220px] md:w-[260px] shrink-0">
          <Card />
        </div>
        <div className="w-[180px] sm:w-[220px] md:w-[260px] shrink-0">
          <Card />
        </div>

        {/* Карточка «Посмотреть все» в самом конце скролла */}
        <div className="w-[140px] sm:w-[180px] md:w-[200px] shrink-0 flex">
          <button 
            onClick={() => {}} 
            className="w-full h-[80%] min-h-[220px] sm:min-h-[260px] border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-3 p-4 bg-gray-50/50 hover:bg-gray-100/80 hover:border-gray-400 active:scale-95 transition-all group cursor-pointer"
          >
            <div className="p-3 bg-white rounded-full shadow-sm border border-gray-200 group-hover:scale-110 transition-transform">
              <ArrowRight className="w-6 h-6 text-gray-800" />
            </div>
            <span className="font-semibold text-sm sm:text-base text-gray-800 text-center">
              Посмотреть все
            </span>
          </button>
        </div>

      </div>
    </div>
  )
}

export default CardSection