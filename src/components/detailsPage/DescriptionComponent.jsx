import React from 'react'

const DescriptionComponent = ({ accommodation = {} }) => {
  const city = accommodation.city || 'Баку'
  const country = accommodation.country || 'Азербайджан'
  const guests = accommodation.guests || accommodation.maxGuests
  const bedrooms = accommodation.bedrooms
  const beds = accommodation.beds
  const bathrooms = accommodation.bathrooms
  const amenities = Array.isArray(accommodation.amenities) ? accommodation.amenities : []
  const capacity = [
    guests && `${guests} ${guests === 1 ? 'гость' : 'гостей'}`,
    bedrooms && `${bedrooms} ${bedrooms === 1 ? 'спальня' : 'спальни'}`,
    beds && `${beds} ${beds === 1 ? 'кровать' : 'кровати'}`,
    bathrooms && `${bathrooms} ${bathrooms === 1 ? 'ванная' : 'ванных'}`,
  ].filter(Boolean).join(' · ')

  return (
     <div>
         <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
         Жилье целиком, {city}, {country}
        </h2>
        <p className="mt-2 text-base sm:text-lg text-gray-700">
     {capacity || 'Подробности о вместимости уточняются'}
    </p>

    <div className="mt-8 grid gap-4 sm:grid-cols-2">
     <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
    <p className="text-sm font-medium text-gray-500">Удобства</p>
     <p className="mt-2 text-base font-semibold text-gray-900">{amenities.length ? amenities.join(', ') : 'Список удобств уточняется'}</p>
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
