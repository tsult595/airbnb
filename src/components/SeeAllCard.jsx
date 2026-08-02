"use client"

import { ArrowRight } from "lucide-react"

const SeeAllCard = ({ onClick }) => {
  return (
     <button 
    type="button"
     onClick={onClick} 
     className="w-full h-[80%] min-h-[220px] sm:min-h-[260px] border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-3 p-4 bg-gray-50/50 hover:bg-gray-100/80 hover:border-gray-400 active:scale-95 transition-all group cursor-pointer"
     >
     <div className="p-3 bg-white rounded-full shadow-sm border border-gray-200 group-hover:scale-110 transition-transform">
    <ArrowRight className="w-6 h-6 text-gray-800" />
    </div>
    <span className="font-semibold text-sm sm:text-base text-gray-800 text-center">
     Посмотреть все
    </span>
    </button>
  )
}

export default SeeAllCard