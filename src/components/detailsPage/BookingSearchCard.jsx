"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { format, startOfToday } from "date-fns"
import { ru } from "date-fns/locale"

const BookingSearchCard = ({ pricePerNight }) => {
  // Стейты
  const [range, setRange] = useState({ from: undefined, to: undefined })
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [guestsOpen, setGuestsOpen] = useState(false)
  const [guests, setGuests] = useState(1)

  const cardRef = useRef(null)

  // Закрытие выпадашек при клике вне карточки
  useEffect(() => {
    if (!isCalendarOpen && !guestsOpen) return

    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsCalendarOpen(false)
        setGuestsOpen(false)
      }
    }
    document.addEventListener("pointerdown", handleClickOutside)
    return () => document.removeEventListener("pointerdown", handleClickOutside)
  }, [isCalendarOpen, guestsOpen])

  // Форматирование дат для отображения
  const checkInText = range?.from ? format(range.from, "dd.MM.yyyy") : "Укажите дату"
  const checkOutText = range?.to ? format(range.to, "dd.MM.yyyy") : "Укажите дату"

  // Сброс выборки
  const handleClearDates = (e) => {
    e.stopPropagation()
    setRange({ from: undefined, to: undefined })
  }

  return (
    <div 
      ref={cardRef} 
      className="relative w-full max-w-[464px] rounded-3xl border border-gray-200 bg-white p-7 shadow-xl"
    >
      {/* TITLE */}
      <h2 className="mb-6 max-w-[350px] text-[26px] font-semibold leading-[1.1] tracking-[-0.6px] text-gray-900">
        {pricePerNight ? (
          <div>
            <span className="text-2xl font-bold">${pricePerNight}</span>{" "}
            <span className="text-base font-normal text-gray-500">/ ночь</span>
          </div>
        ) : (
          <>
            Добавьте даты, чтобы <br /> увидеть цены
          </>
        )}
      </h2>

      {/* DATE + GUESTS BOX */}
      <div className="relative overflow-visible rounded-2xl border border-gray-400 bg-white">
        
        {/* CHECK IN / CHECK OUT TRIGGER BUTTONS */}
        <div className="grid grid-cols-2 divide-x divide-gray-400">
          
          {/* CHECK IN */}
          <button
            type="button"
            onClick={() => {
              setIsCalendarOpen((prev) => !prev)
              setGuestsOpen(false)
            }}
            className={`px-4 py-3 text-left transition-colors hover:bg-gray-50 ${
              isCalendarOpen ? "bg-gray-100 ring-2 ring-black rounded-tl-2xl" : ""
            }`}
          >
            <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-800">
              Прибытие
            </span>
            <span className={`mt-0.5 block text-sm ${range?.from ? "font-medium text-gray-900" : "text-gray-400"}`}>
              {checkInText}
            </span>
          </button>

          {/* CHECK OUT */}
          <button
            type="button"
            onClick={() => {
              setIsCalendarOpen((prev) => !prev)
              setGuestsOpen(false)
            }}
            className={`px-4 py-3 text-left transition-colors hover:bg-gray-50 ${
              isCalendarOpen ? "bg-gray-100 ring-2 ring-black rounded-tr-2xl" : ""
            }`}
          >
            <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-800">
              Выезд
            </span>
            <span className={`mt-0.5 block text-sm ${range?.to ? "font-medium text-gray-900" : "text-gray-400"}`}>
              {checkOutText}
            </span>
          </button>
        </div>

        {/* 🟢 AIRBNB STYLED DATE PICKER POPUP */}
        {isCalendarOpen && (
          <div className="absolute top-[105%] left-1/2 z-50 -translate-x-1/2 w-[340px] sm:w-[380px] rounded-3xl border border-gray-200 bg-white p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-2">
              <div>
                <p className="text-sm font-semibold text-gray-900">Выберите даты</p>
                <p className="text-xs text-gray-500">Укажите даты прибытия и выезда</p>
              </div>
              {range?.from && (
                <button
                  type="button"
                  onClick={handleClearDates}
                  className="text-xs font-semibold text-gray-500 underline hover:text-black"
                >
                  Сбросить
                </button>
              )}
            </div>

            {/* КАЛЕНДАРЬ */}
            <div className="flex justify-center custom-calendar-style">
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                locale={ru}
                disabled={{ before: startOfToday() }} // Нельзя выбирать прошедшие даты
                numberOfMonths={1}
              />
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setIsCalendarOpen(false)}
                className="rounded-full bg-black px-5 py-2 text-xs font-semibold text-white hover:bg-gray-800 transition-colors"
              >
                Готово
              </button>
            </div>
          </div>
        )}

        {/* GUESTS DROPDOWN TRIGGER */}
        <div className="relative border-t border-gray-400">
          <button
            type="button"
            onClick={() => {
              setGuestsOpen((prev) => !prev)
              setIsCalendarOpen(false)
            }}
            className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
          >
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-800">
                Гости
              </div>
              <div className="mt-0.5 text-sm font-medium text-gray-900">
                {guests} {guests === 1 ? "гость" : guests < 5 ? "гостя" : "гостей"}
              </div>
            </div>

            <ChevronDown
              className={`h-5 w-5 text-gray-800 transition-transform duration-200 ${
                guestsOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* GUEST DROPDOWN POPUP */}
          {guestsOpen && (
            <div className="absolute top-[105%] left-0 z-50 w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Взрослые</p>
                  <p className="text-xs text-gray-500">От 13 лет и старше</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                    disabled={guests <= 1}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-lg font-medium text-gray-600 hover:border-black hover:text-black disabled:opacity-30 disabled:hover:border-gray-300 transition-all"
                  >
                    −
                  </button>

                  <span className="w-4 text-center font-semibold text-sm">
                    {guests}
                  </span>

                  <button
                    type="button"
                    onClick={() => setGuests((prev) => prev + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-lg font-medium text-gray-600 hover:border-black hover:text-black transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SEARCH / BOOK BUTTON */}
      <button
        type="button"
        className="mt-5 w-full rounded-full bg-gradient-to-r from-[#ff385c] via-[#e61e4d] to-[#e00b41] px-5 py-3.5 text-base font-semibold text-white transition duration-200 hover:brightness-95 active:scale-[0.98] shadow-md"
      >
        {range?.from && range?.to ? "Забронировать" : "Проверить свободные даты"}
      </button>

      {/* CSS Стили для подгонки стилей календаря под стиль Airbnb */}
      <style jsx global>{`
        .custom-calendar-style .rdp {
          --rdp-cell-size: 38px;
          --rdp-accent-color: #ff385c;
          --rdp-background-color: #ffe5ea;
          margin: 0;
        }
        .custom-calendar-style .rdp-day_selected:not(.rdp-day_outside) {
          background-color: #ff385c !important;
          color: white !important;
          font-weight: bold;
        }
        .custom-calendar-style .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
          background-color: #f7f7f7;
          border-radius: 100%;
        }
      `}</style>
    </div>
  )
}

export default BookingSearchCard
