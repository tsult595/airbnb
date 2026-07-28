"use client"

import CardSection from './CardSection'
import HeaderSm from './HeaderSm'
import HeaderLg from './HeaderLg'

const MainComponent = () => {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto px-4">
      {/* Фиксированная шапка */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        {/* Показываем ТОЛЬКО на мобилках (< 768px) */}
        <div className="block md:hidden">
          <HeaderSm />
        </div>

        {/* Показываем ТОЛЬКО на планшетах и ПК (>= 768px) */}
        <div className="hidden md:block">
          <HeaderLg />
        </div>
      </header>

      {/* Основной контент с отступом под высоты шапок */}
      <main className="mt-16 md:pt-28 pb-10 w-full">
        <CardSection />
      </main>
    </div>
  )
}

export default MainComponent