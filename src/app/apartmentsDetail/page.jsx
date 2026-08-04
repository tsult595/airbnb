'use client'

import AllRecommendationsHeaderSm from '../../components/AllRecommendationsHeaderSm'
import HeaderLg from '../../components/mainPage/HeaderLg'
import { ArrowLeft, Share2, Heart, Grid3X3 } from 'lucide-react'
import Link from 'next/link'
import Image from "next/image"
import { useSearchParams } from 'next/navigation'
import { useAccommodationById } from '../../hooks/useAccommodationsQuery.js'

const ApartmentsDetailPage = () => {
  const searchParams = useSearchParams() 
  const id = searchParams.get('id')

  // Получаем весь массив (или объект) из твоего кастомного хука
 const { data: apartment, isLoading, isError } = useAccommodationById(id)

 

  // Обработка загрузки или ошибки
  if (isLoading) return <div className="text-center py-32">Загрузка...</div>
  if (isError) return <div className="text-center py-32">Ошибка при загрузке данных</div>
  
  // Если по какой-то причине квартиру не нашли
  if (!apartment) {
    return (
      <div className="text-center py-32">
        <h2 className="text-2xl font-semibold">Квартира не найдена</h2>
        <Link href="/allRecommendations" className="text-blue-600 underline mt-4 inline-block">
          Вернуться к списку
        </Link>
      </div>
    )
  }


  const { title, imageUrl, images = [] } = apartment



  return (
    <>
      <div className="block md:hidden">
        <AllRecommendationsHeaderSm />
      </div>

      <div className="hidden md:block">
        <HeaderLg />
      </div>

      <main className="pt-24 md:pt-32 pb-10">
        <div className="w-[94%] max-w-[1850px] mx-auto px-2 sm:px-4">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <Link
                  href="/allRecommendations"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors mb-3"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Назад к списку
                </Link>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight max-w-4xl">
                  {title || "Сердце города с видом на море / Flame towers"}
                </h1>
              </div>

              <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <button className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 transition-colors">
                  <Share2 className="h-4 w-4" />
                  Поделиться
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 transition-colors">
                  <Heart className="h-4 w-4" />
                  Сохранить
                </button>
              </div>
            </div>

            <section className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-3">
              <div className="relative min-h-[280px] lg:min-h-[470px] rounded-3xl overflow-hidden bg-gray-100">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={title || 'Апартаменты'}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 40vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-400">
                    Нет фото
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 min-h-[280px] lg:min-h-[470px]">
                {images.map((photo, index) => {
                  return (
                    <div
                      key={`${photo}-${index}`}
                      className="relative overflow-hidden rounded-3xl bg-gray-100"
                    >
                      <Image
                        src={photo}
                        alt={`Фото`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />

                    </div>
                  )
                })}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1fr_420px] items-start">
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

              <aside className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Цена за ночь</p>
                    <p className="text-3xl font-semibold text-gray-900 mt-1">${apartment.price || 129}</p>
                  </div>
                  <div className="rounded-full bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">
                    В цену входят все сборы
                  </div>
                </div>

                <button className="mt-6 w-full rounded-2xl bg-black px-4 py-3 text-base font-semibold text-white hover:bg-gray-800 transition-colors">
                  Забронировать
                </button>

                <div className="mt-5 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>4 ночи</span>
                    <span>$516</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Сервисный сбор</span>
                    <span>$42</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-3 font-semibold text-gray-900">
                    <span>Итого</span>
                    <span>$558</span>
                  </div>
                </div>
              </aside>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

export default ApartmentsDetailPage