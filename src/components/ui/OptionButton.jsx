'use client'

import { Search } from "lucide-react"

const OptionButton = ({ children, onClick, icon }) => {
  return (
    <button 
      onClick={onClick} 
      className="
        inline-flex items-center justify-center gap-2 
        w-full sm:w-auto
        bg-white text-black shadow-md hover:shadow-lg
        font-bold text-sm sm:text-base 
        py-2.5 px-4 sm:py-2 
        rounded-[15px] 
        hover:bg-gray-100 active:scale-95
        transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-gray-200
        select-none cursor-pointer
      "
    >
      {/* Иконка с фиксированным размером, чтобы не плющило */}
      <span className="shrink-0 flex items-center justify-center">
        {icon || <Search className="h-5 w-5 text-gray-400" />}
      </span>

      {/* Текст с защитой от вылезания за границы */}
      <span className="truncate">{children}</span>
    </button>
  )
}

export default OptionButton