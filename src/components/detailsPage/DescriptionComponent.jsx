import React from 'react'

const DescriptionComponent = () => {
  return (
     <div>
         <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
         Жилье целиком, Баку, Азербайджан
        </h2>
        <p className="mt-2 text-base sm:text-lg text-gray-700">
     4 гостя · 1 спальня · 2 кровати · 1 ванная
    </p>

    <div className="mt-8 grid gap-4 sm:grid-cols-2">
     <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
    <p className="text-sm font-medium text-gray-500">Удобства</p>
     <p className="mt-2 text-base font-semibold text-gray-900">Wi-Fi, кондиционер, кухня, стиральная машина</p>
    </div>
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
    <p className="text-sm font-medium text-gray-500">Проверка</p>
     <p className="mt-2 text-base font-semibold text-gray-900">Мгновенное бронирование и гибкая отмена</p>
     </div>
    </div>
 </div>
  )
}

export default DescriptionComponent