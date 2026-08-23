'use client'

import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { format, differenceInDays } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useBookedDates } from '../../hooks/useBookedDates'
import { useCreateBooking } from '../../hooks/useBookings'

// Подключаем стили календаря
import 'react-day-picker/dist/style.css'

export default function BookingSearchCard({ accommodationId, pricePerNight = 0 }) {
  const [range, setRange] = useState(undefined)
  const [showCalendar, setShowCalendar] = useState(false)

  // 1. Получаем забронированные даты с бэкенда
  const { data: bookedRanges = [], isLoading: isDatesLoading } = useBookedDates(accommodationId)

  // 2. Хук создания брони
  const createBookingMutation = useCreateBooking()

  // Преобразуем забронированные интервалы в формат для DayPicker
  const disabledDays = bookedRanges.map((r) => ({
    from: new Date(r.from || r.checkIn),
    to: new Date(r.to || r.checkOut),
  }))

  // Блокируем также прошедшие даты (прошлое забронировать нельзя)
  disabledDays.push({ before: new Date() })

  // Считаем количество ночей и итоговую сумму
  const nights = range?.from && range?.to ? differenceInDays(range.to, range.from) : 0
  const totalPrice = nights * Number(pricePerNight)

  const handleBooking = async () => {
    if (!range?.from || !range?.to) {
      alert("Пожалуйста, выберите даты заезда и выезда в календаре!")
      return
    }

    // Твой текущий ID пользователя (из контекста авторизации / localStorage)
    const currentUserId = 1 

    createBookingMutation.mutate(
      {
        accommodationId,
        userId: currentUserId,
        checkIn: format(range.from, 'yyyy-MM-dd'),
        checkOut: format(range.to, 'yyyy-MM-dd'),
      },
      {
        onSuccess: () => {
          alert("Бронирование успешно оформлено!")
          setRange(undefined)
          setShowCalendar(false)
        },
        onError: (err) => {
          if (err.response?.status === 409) {
            alert("Выбранные даты уже забронированы!")
          } else {
            alert("Ошибка сервера при создании бронирования")
          }
        }
      }
    )
  }

  return (
    <div className="border border-gray-200 rounded-3xl p-6 shadow-xl bg-white sticky top-24">
      {/* Цена */}
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <span className="text-3xl font-bold text-gray-900">{pricePerNight} ₼</span>
          <span className="text-gray-500 text-sm ml-1">/ ночь</span>
        </div>
      </div>

      {/* Поля выбора дат */}
      <div 
        onClick={() => setShowCalendar(!showCalendar)}
        className="grid grid-cols-2 border border-gray-300 rounded-2xl p-3 mb-4 cursor-pointer hover:border-black transition-colors"
      >
        <div className="border-r border-gray-200 pr-2">
          <span className="block text-[10px] font-bold tracking-wider text-gray-500 uppercase">ЗАЕЗД</span>
          <span className="text-sm font-medium text-gray-800">
            {range?.from ? format(range.from, 'dd.MM.yyyy') : 'Выберите дату'}
          </span>
        </div>
        <div className="pl-3">
          <span className="block text-[10px] font-bold tracking-wider text-gray-500 uppercase">ВЫЕЗД</span>
          <span className="text-sm font-medium text-gray-800">
            {range?.to ? format(range.to, 'dd.MM.yyyy') : 'Выберите дату'}
          </span>
        </div>
      </div>

      {/* Выпадающий красивый Календарь */}
      {showCalendar && (
        <div className="mb-4 p-2 border border-gray-100 rounded-2xl shadow-inner bg-gray-50 flex justify-center">
          <DayPicker
            mode="range"
            locale={ru}
            selected={range}
            onSelect={setRange}
            disabled={disabledDays}
            modifiersStyles={{
              selected: { backgroundColor: '#F43F5E', color: 'white' },
              disabled: { textDecoration: 'line-through', opacity: 0.4 }
            }}
          />
        </div>
      )}

      {/* Расчет стоимости (показываем, если даты выбраны) */}
      {nights > 0 && (
        <div className="space-y-3 my-4 text-sm text-gray-600 border-t pt-4">
          <div className="flex justify-between">
            <span>{pricePerNight} ₼ x {nights} ночи</span>
            <span>{totalPrice} ₼</span>
          </div>
          <div className="flex justify-between font-bold text-base text-gray-900 border-t pt-2">
            <span>Итого</span>
            <span>{totalPrice} ₼</span>
          </div>
        </div>
      )}

      {/* Кнопка отправки */}
      <button
        onClick={handleBooking}
        disabled={createBookingMutation.isPending || isDatesLoading || !range?.from || !range?.to}
        className="w-full bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white font-semibold py-3.5 rounded-2xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {createBookingMutation.isPending ? "Занос данных..." : "Забронировать"}
      </button>
    </div>
  )
}