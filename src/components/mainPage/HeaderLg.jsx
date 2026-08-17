'use client'

import { useState, useEffect, useRef } from 'react'
import Image from "next/image"
import logo from '../../assets/airbnb.png'
import { Globe, Menu, Search } from "lucide-react"
import AuthModal from '../modals/AuthModal'
import AvatarModal from '../modals/AvatarModal'
import { useSearchStore } from '../../store/useSearchStore'
import Link from 'next/link'
// Импорты для календаря
import { Calendar } from "../ui/chadcn/calendar"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useUserStore } from '../../store/useUserStore.js'

const HeaderLg = () => {
  const { activeTab, setActiveTab, dateRange, setDateRange } = useSearchStore()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false)
  // Состояния для календаря
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const calendarRef = useRef(null)
  const user = useUserStore((state) => state.user)

  // Закрытие календаря при клике снаружи
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Отслеживание скролла
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
        setIsCalendarOpen(false) // Скрываем календарь при скролле
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

  // Форматирование отображаемой даты
  const getFormattedDate = () => {
    if (dateRange?.from) {
      if (dateRange?.to) {
        return `${format(dateRange.from, "d MMM", { locale: ru })} - ${format(dateRange.to, "d MMM", { locale: ru })}`
      }
      return format(dateRange.from, "d MMM", { locale: ru })
    }
    return "Когда?"
  }

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-6 bg-white transition-all duration-300 relative">
        
        {/* Главная строчка шапки */}
        <div 
          className={`w-full flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'py-2.5' : 'py-4'
          }`}
        >
          {/* 1. Логотип */}
          <div className="flex-1 flex justify-start shrink-0">
            <Link href="/">
              <Image 
                src={logo} 
                alt="Airbnb" 
                width={102} 
                height={32} 
              className="object-contain cursor-pointer" 
            />
            </Link>
          </div>

          {/* 2. ТАБЫ КАТЕГОРИЙ (показываются когда НЕ скроллим) */}
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

          {/* 3. МИНИ-ПОИСК (показывается при скролле) */}
          {isScrolled && (
            <div className="flex-1 max-w-md mx-4 animate-in fade-in zoom-in-95 duration-200 relative">
              <div className="flex items-center justify-between bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow py-1.5 pl-3 pr-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-800 flex-1 min-w-0">
                  
                  {/* Где */}
                  <div className="px-2 py-0.5 hover:bg-gray-100 rounded-full cursor-pointer transition-colors truncate">
                    Где угодно
                  </div>

                  <div className="h-3.5 w-[1px] bg-gray-200 shrink-0" />

                  {/* Когда (Открывает календарь) */}
                  <div
                    onClick={() => setIsCalendarOpen((prev) => !prev)}
                    className={`px-2 py-0.5 rounded-full cursor-pointer transition-colors truncate ${
                      isCalendarOpen 
                        ? 'bg-gray-100 font-bold text-black' 
                        : 'hover:bg-gray-100 text-gray-800'
                    }`}
                  >
                    {getFormattedDate() !== "Когда?" ? getFormattedDate() : "Когда угодно"}
                  </div>

                  <div className="h-3.5 w-[1px] bg-gray-200 shrink-0" />

                  {/* Кто */}
                  <div className="px-2 py-0.5 hover:bg-gray-100 rounded-full cursor-pointer transition-colors font-normal text-gray-500 truncate">
                    Кто угодно
                  </div>
                </div>

                {/* Кнопка поиска */}
                <button 
                  type="button"
                  className="bg-[#FF385C] hover:bg-[#E00B41] text-white p-2 rounded-full transition-colors shrink-0 ml-1 active:scale-95"
                >
                  <Search className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>

              {/* КАЛЕНДАРЬ ДЛЯ МИНИ-ВЕРСИИ */}
              {isCalendarOpen && (
                <div 
                  ref={calendarRef}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150"
                >
                  <Calendar
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    locale={ru}
                    className="rounded-xl"
                  />
                </div>
              )}
            </div>
          )}

          {/* 4. Кнопки справа */}
          <div className="flex-1 flex justify-end items-center gap-2 shrink-0">
            {user ? (
              <button
                type="button"
                onClick={() => setIsAvatarModalOpen(true)}
                className="relative h-9 w-9 overflow-hidden rounded-full border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-all"
                aria-label="Открыть меню профиля"
              >
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name || "Аватар пользователя"}
                    className="h-full w-full object-cover"
                    width={36}
                    height={36}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-900 text-xs font-semibold text-white">
                    {user.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
              </button>
            ) : (
              <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors text-gray-700">
                <Globe className="w-5 h-5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="p-2.5 hover:bg-gray-100 rounded-full transition-colors text-gray-700 bg-gray-50/50 border border-gray-200"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 5. БОЛЬШОЙ ПОИСК СНИЗУ (когда НЕ скроллим) */}
        {!isScrolled && (
          <div className="w-full flex justify-center pb-4 animate-in fade-in duration-200 relative">
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

              {/* Раздел: Когда (Открывает календарь) */}
              <div 
                onClick={() => setIsCalendarOpen((prev) => !prev)}
                className={`flex-1 px-6 py-1 rounded-full transition-colors ${
                  isCalendarOpen ? 'bg-gray-100 shadow-sm' : 'hover:bg-gray-100/70'
                }`}
              >
                <div className="text-xs font-semibold text-gray-800">Когда</div>
                <div className={`text-sm truncate font-normal ${dateRange?.from ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                  {getFormattedDate()}
                </div>
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

            {/* КАЛЕНДАРЬ ДЛЯ БОЛЬШОЙ ВЕРСИИ */}
            {isCalendarOpen && (
              <div 
                ref={calendarRef}
                className="absolute top-full mt-3 z-50 bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150"
              >
                <Calendar
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  locale={ru}
                  className="rounded-xl"
                />
              </div>
            )}

          </div>
        )}

      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      <AvatarModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
      />
    </>
  )
}

export default HeaderLg
