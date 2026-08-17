'use client'

import { Calendar } from "./ui/chadcn/calendar.tsx"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import logo from '../assets/airbnb.png'
import AuthModal from './modals/AuthModal.jsx'
import { Globe, Menu, Search, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef } from 'react'
import { useSearchStore } from '../store/useSearchStore.js'

const AllRecommendationsHeader = ({ activeChips = [], onToggleChip }) => {
  const {
    dateRange,
    setDateRange
  } = useSearchStore()

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const calendarRef = useRef(null)
  const calendarTriggerRef = useRef(null)

  const filterChips = [
    { label: 'Самостоятельное прибытие' },
    { label: 'Больше 1 ванной' },
    { label: 'Кондиционер' },
    { label: 'Телевизор' },
    { label: 'Wi-Fi' },
    { label: 'Стиральная машина' },
    { label: 'Бесплатная парковка' },
    { label: 'Кухня' },
    { label: 'Утюг' },
    { label: 'Фен' },
  ]

  // Закрываем календарь при клике вне него
  useEffect(() => {
    if (!isCalendarOpen) return

    const handleClickOutside = (event) => {
      const clickedCalendar = calendarRef.current?.contains(event.target)
      const clickedTrigger = calendarTriggerRef.current?.contains(event.target)

      if (!clickedCalendar && !clickedTrigger) {
        setIsCalendarOpen(false)
      }
    }

    document.addEventListener("pointerdown", handleClickOutside)

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside)
    }
  }, [isCalendarOpen])

  // Форматирование даты
  const getFormattedDate = () => {
    if (dateRange?.from) {
      if (dateRange?.to) {
        return `${format(dateRange.from, "d MMM", {
          locale: ru
        })} - ${format(dateRange.to, "d MMM", {
          locale: ru
        })}`
      }

      return format(dateRange.from, "d MMM", {
        locale: ru
      })
    }

    return "Когда?"
  }

  return (
    <>
      <header className="w-full mx-auto px-6 bg-white fixed top-0 left-0 right-0 z-50 flex flex-col border-b border-gray-100">

        {/* MAIN HEADER */}
        <div className="w-full flex items-center gap-8 py-4">

          {/* LOGO */}
          <div className="shrink-0 flex items-center">
            <Image
              src={logo}
              alt="Airbnb"
              width={102}
              height={32}
              className="object-contain cursor-pointer"
            />
          </div>

          {/* SEARCH */}
          <div className="flex-1 flex justify-center relative">
            <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 py-2 px-3 w-full max-w-3xl">

              {/* WHERE */}
              <div className="flex-1 px-6 py-1 hover:bg-gray-100/70 rounded-full transition-colors">
                <div className="text-xs font-semibold text-gray-800">
                  Где
                </div>
                <input
                  type="text"
                  placeholder="Поиск направлений"
                  className="w-full text-sm text-gray-600 bg-transparent outline-none placeholder:text-gray-400 font-normal truncate"
                />
              </div>

              {/* DIVIDER */}
              <div className="h-8 w-[1px] bg-gray-200 shrink-0" />

              {/* WHEN */}
              <div
                ref={calendarTriggerRef}
                onClick={() => setIsCalendarOpen((prev) => !prev)}
                className={`flex-1 px-6 py-1 rounded-full transition-colors cursor-pointer ${
                  isCalendarOpen
                    ? "bg-gray-100 shadow-sm"
                    : "hover:bg-gray-100/70"
                }`}
              >
                <div className="text-xs font-semibold text-gray-800">
                  Когда
                </div>
                <div
                  className={`text-sm truncate font-normal ${
                    dateRange?.from
                      ? "text-gray-900 font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {getFormattedDate()}
                </div>
              </div>

              {/* DIVIDER */}
              <div className="h-8 w-[1px] bg-gray-200 shrink-0" />

              {/* WHO */}
              <div className="flex-1 px-6 py-1 rounded-full hover:bg-gray-100/70 transition-colors cursor-pointer">
                <div className="text-xs font-semibold text-gray-800">
                  Кто
                </div>
                <div className="text-sm text-gray-400 font-normal">
                  Кто едет?
                </div>
              </div>

              {/* SEARCH BUTTON */}
              <button
                type="button"
                className="bg-[#FF385C] hover:bg-[#E00B41] text-white p-3.5 rounded-full transition-colors flex items-center justify-center shrink-0 shadow-md active:scale-95"
              >
                <Search className="w-5 h-5 stroke-[2.5]" />
              </button>

            </div>

            {/* CALENDAR */}
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

          {/* RIGHT BUTTONS */}
          <div className="shrink-0 flex items-center gap-2">
            <button
              type="button"
              className="p-2.5 hover:bg-gray-100 rounded-full transition-colors text-gray-700"
            >
              <Globe className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="p-2.5 hover:bg-gray-100 rounded-full transition-colors text-gray-700 bg-gray-50/50 border border-gray-200"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* FILTER CHIPS */}
        <div className="w-full max-w-[1850px] mx-auto overflow-x-auto no-scrollbar flex items-center gap-3 py-3 pb-4 border-t border-gray-100">
          <button
            type="button"
            className="shrink-0 inline-flex items-center gap-2 rounded-full border border-gray-900 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Фильтры</span>
            {activeChips.length > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1.5 text-xs font-semibold text-white">
                {activeChips.length}
              </span>
            )}
          </button>

          {filterChips.map((chip) => {
            const isActive = activeChips.includes(chip.label)

            return (
              <button
                key={chip.label}
                type="button"
                onClick={() => onToggleChip?.(chip.label)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-gray-900 bg-gray-900 text-white shadow-sm'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {chip.label}
              </button>
            )
          })}
        </div>
      </header>

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  )
}

export default AllRecommendationsHeader
