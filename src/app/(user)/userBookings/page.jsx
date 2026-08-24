"use client"

import { useUserStore } from '../../../store/useUserStore.js'
import { useUserBookings } from '../../../hooks/useBookings.js'
import Image from 'next/image'

const UserBookings = () => {
  const user = useUserStore((state) => state.user) 
  const userId = user?.id 

  const { data: bookings = [], isLoading, isError } = useUserBookings(userId)

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Загрузка ваших бронирований...</div>
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Не удалось загрузить список бронирований</div>
  }

  if (!bookings.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        У вас пока нет активных бронирований.
      </div>
    )
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto py-6">
      <h2 className="text-2xl font-bold mb-6">Мои бронирования</h2>

      {bookings.map((booking) => (
        <div 
          key={booking.id} 
          className="flex flex-col sm:flex-row gap-4 p-4 border rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Фото объекта */}
          <div className="relative w-full sm:w-48 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
            {booking.imageUrl ? (
              <Image 
                src={booking.imageUrl} 
                alt={booking.title || "Апартаменты"} 
                fill 
                className="object-cover" 
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-gray-400">Нет фото</div>
            )}
          </div>

          {/* Инфо о брони */}
          <div className="flex flex-col justify-between flex-grow">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{booking.title}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 uppercase">
                  {booking.status}
                </span>
              </div>

              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <p>🗓 <b>Заезд:</b> {booking.checkIn}</p>
                <p>🚪 <b>Выезд:</b> {booking.checkOut}</p>
              </div>
            </div>

            <div className="mt-4 pt-2 border-t flex justify-between items-center text-sm">
              <span className="text-gray-500">Цена за ночь:</span>
              <span className="font-bold text-gray-900">{booking.price} ₼</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserBookings