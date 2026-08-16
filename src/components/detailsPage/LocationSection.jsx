'use client';

import dynamic from 'next/dynamic';

// Динамический импорт твоей существующей карты с выключенным SSR
const Map = dynamic(() => import('../Map.jsx'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[480px] bg-gray-100 animate-pulse rounded-3xl flex items-center justify-center text-gray-400 font-medium">
      Загрузка карты...
    </div>
  ),
});

export default function LocationSection({ accommodation }) {
  if (!accommodation) return null;

  // Извлекаем данные из объекта апартаментов
  const city = accommodation.city || 'Баку';
  const location = accommodation.location || 'Азербайджан';
  const fullAddress = `${city}, ${location}`;

  // Создаем массив с 1 объектом для отображения маркера
  const items = [accommodation];

  return (
    <div className="py-8 border-t border-gray-200">
      {/* Заголовок страницы детальной информации */}
      <h2 className="text-2xl font-semibold text-gray-900">Где вы будете</h2>
      <p className="mt-1 text-base text-gray-600 mb-6">{fullAddress}</p>

      {/* Обертка для карты */}
      <div className="w-full h-[400px] md:h-[480px] rounded-3xl overflow-hidden shadow-sm border border-gray-200">
        <Map 
          items={items} 
          hoveredItem={accommodation} 
          isDetailView={true} 
        />
      </div>
    </div>
  );
}