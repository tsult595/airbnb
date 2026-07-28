'use client'

import React from 'react'

const RecommendedInput = ({
  location = "Баку",
  type = "жилье",
  date = "Выходные",
  guests = "Кто едет?",
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex flex-col items-center justify-center bg-white border border-gray-200/80 rounded-full px-8 py-2.5 shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer select-none"
    >
      {/* Главный заголовок */}
      <span className="text-sm sm:text-base font-semibold text-gray-900 leading-tight">
        {location}: {type}
      </span>

      {/* Подзаголовок с точкой */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-normal leading-tight mt-0.5">
        <span>{date}</span>
        <span className="text-gray-300 font-bold">•</span>
        <span>{guests}</span>
      </div>
    </button>
  )
}

export default RecommendedInput