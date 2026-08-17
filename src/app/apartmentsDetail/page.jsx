'use client'

import AllRecommendationsHeaderSm from '../../components/AllRecommendationsHeaderSm'
import HeaderLg from '../../components/mainPage/HeaderLg'
import { ArrowLeft, Share2, Heart} from 'lucide-react'
import Link from 'next/link'
import Image from "next/image"
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useAccommodationById } from '../../hooks/useAccommodationsQuery.js'
import BookingSearchCard from '../../components/detailsPage/BookingSearchCard.jsx'
import CommentSection from '../../components/detailsPage/CommentSection.jsx'
import LocationSection from '../../components/detailsPage/LocationSection.jsx'
import DescriptionComponent from '../../components/detailsPage/DescriptionComponent.jsx'

const ApartmentsDetailContent = () => {
  const searchParams = useSearchParams() 
  const id = searchParams.get('id')

  // Получаем весь массив (или объект) из твоего кастомного хука
 const { data: apartment, isLoading, isError } = useAccommodationById(id)

 

  // Обработка загрузки или ошибки
  if (isLoading) return <div className="text-center py-32">Загрузка...</div>
  if (isError) return <div className="text-center py-32" role="alert">Ошибка при загрузке данных</div>
  
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


  const { title, imageUrl, image_url: imageUrlFromApi, images = [], price } = apartment
  const mainImage = imageUrl || imageUrlFromApi



  return (
    <>
      <div className="block md:hidden">
        <AllRecommendationsHeaderSm />
      </div>

      <div className="hidden md:block">
        <HeaderLg />
      </div>

      <main className="pt-24 md:pt-16 pb-10">
        <div className="w-[80%] max-w-[1850px] mx-auto px-2 sm:px-4">
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
                {mainImage ? (
                  <Image
                    src={mainImage}
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
             <DescriptionComponent accommodation={apartment} />
             <BookingSearchCard pricePerNight={price} />
            </section>
            <CommentSection />
            <LocationSection accommodation={apartment} />
          </div>
        </div>
      </main>
    </>
  )
}

const ApartmentsDetailPage = () => (
  <Suspense fallback={<div className="min-h-screen bg-white" />}>
    <ApartmentsDetailContent />
  </Suspense>
)

export default ApartmentsDetailPage
