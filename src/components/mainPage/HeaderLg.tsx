'use client'

import { useState, useEffect } from 'react'
import Image from "next/image"
import logo from '../../assets/airbnb.png'
import { Globe, Menu, Search } from "lucide-react"

const HeaderLg = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categories = [
    { id: 'all', label: 'Все', icon: '🌎' },
    { id: 'homes', label: 'Жилье', icon: '🏡' },
    { id: 'experiences', label: 'Впечатления', icon: '🎈' },
    { id: 'services', label: 'Услуги', icon: '🔔' },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto px-6 bg-white transition-all duration-300">
      
      {/* Главная строчка шапки */}
      <div 
        className={`w-full flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'py-2.5' : 'py-4'
        }`}
      >
        {/* 1. Логотип */}
        <div className="flex-1 flex justify-start shrink-0">
          <Image 
            src={logo} 
            alt="Airbnb" 
            width={102} 
            height={32} 
            className="object-contain cursor-pointer" 
          />
        </div>

        {/* 2. ТАБЫ КАТЕГОРИЙ (Показываются, пока НЕ проскроллили) */}
        {!isScrolled && (
          <div className="flex items-center gap-8 transition-all duration-300">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative flex items-center gap-2 pb-2 text-sm font-medium transition-colors ${
                  activeTab === cat.id ? 'text-black' : 'text-gray-500 hover:text-black'
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.label}</span>
                {activeTab === cat.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* 3. МИНИ-ПОИСК (Встает ПО ЦЕНТРУ при скролле) */}
        {isScrolled && (
          <div className="flex-1 max-w-md mx-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow py-1.5 pl-4 pr-1.5 cursor-pointer">
              <div className="flex items-center gap-3 text-xs font-semibold text-gray-800 divide-x divide-gray-200">
                <span>Где угодно</span>
                <span className="pl-3">Любая неделя</span>
                <span className="pl-3 font-normal text-gray-500">Кто угодно</span>
              </div>
              <button className="bg-[#FF385C] hover:bg-[#E00B41] text-white p-2 rounded-full transition-colors shrink-0">
                <Search className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          </div>
        )}

        {/* 4. Кнопки справа */}
        <div className="flex-1 flex justify-end items-center gap-2 shrink-0">
          <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors text-gray-700">
            <Globe className="w-5 h-5" />
          </button>
          <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors text-gray-700 bg-gray-50/50 border border-gray-200">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 5. БОЛЬШОЙ ПОИСК СНИЗУ (Скрывается при скролле) */}
      {!isScrolled && (
        <div className="w-full flex justify-center pb-4 animate-in fade-in duration-200">
          <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 py-2 px-3 w-full max-w-3xl cursor-pointer">
            
            {/* Раздел: Где */}
            <div className="flex-1 px-6 py-1 hover:bg-gray-100/70 rounded-full transition-colors">
              <div className="text-xs font-semibold text-gray-800">Где</div>
              <input 
                type="text" 
                placeholder="Поиск направлений" 
                className="w-full text-sm text-gray-600 bg-transparent outline-none placeholder:text-gray-400 font-normal truncate"
              />
            </div>

            <div className="h-8 w-[1px] bg-gray-200" />

            {/* Раздел: Когда */}
            <div className="flex-1 px-6 py-1 hover:bg-gray-100/70 rounded-full transition-colors">
              <div className="text-xs font-semibold text-gray-800">Когда</div>
              <div className="text-sm text-gray-400 font-normal">Когда?</div>
            </div>

            <div className="h-8 w-[1px] bg-gray-200" />

            {/* Раздел: Кто */}
            <div className="flex-1 px-6 py-1 hover:bg-gray-100/70 rounded-full transition-colors flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-gray-800">Кто</div>
                <div className="text-sm text-gray-400 font-normal">Кто едет?</div>
              </div>
            </div>

            <button className="bg-[#FF385C] hover:bg-[#E00B41] text-white p-3.5 rounded-full transition-colors flex items-center justify-center shrink-0 shadow-md active:scale-95">
              <Search className="w-5 h-5 stroke-[2.5]" />
            </button>

          </div>
        </div>
      )}

    </div>
  )
}

export default HeaderLg