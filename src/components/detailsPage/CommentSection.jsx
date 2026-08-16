"use client"

import { useState } from "react"
import Image from "next/image"

const reviewsData = [
  {
    id: 1,
    name: "Ilknur",
    location: "Бодрум, Турция",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150",
    date: "июнь 2026 г.",
    info: "Срок аренды — несколько ночей",
    text:
      "Я очень доволен этой поездкой. В следующий раз, когда вернусь в Баку, скорее всего, снова остановлюсь в этой квартире. Большое спасибо владельцу за внимание, ..."
  },
  {
    id: 2,
    name: "Aysel",
    location: "Анталья, Турция",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
    date: "июнь 2026 г.",
    info: "Проживание с детьми",
    text:
      "Мы прекрасно провели время! Квартира была точно такой, как в описании: чистой, уютной и хорошо оборудованной. Хозяин был очень добр, отзывчив и сделал весь процесс ..."
  },
  {
    id: 3,
    name: "Adam",
    location: "Исламабад, Пакистан",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150",
    date: "май 2026 г.",
    info: "Срок аренды — несколько ночей",
    text:
      "Мы прекрасно провели время в этой квартире в Баку. Жилье было безупречным, очень комфортным и точно таким, как показано на фотографиях. Расположение было..."
  },
  {
    id: 4,
    name: "Namiq",
    location: "3 месяца на Airbnb",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
    date: "июнь 2026 г.",
    info: "Срок аренды — несколько ночей",
    text:
      "Отличный хозяин"
  }
]

const ReviewCard = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <article className="w-full">

      {/* ================================= */}
      {/* USER */}
      {/* ================================= */}

      <div className="flex items-center gap-4">

        <Image
          src={review.avatar}
          alt={review.name}
          width={56}
          height={56}
          className="
            h-14
            w-14
            shrink-0
            rounded-full
            object-cover
          "
        />

        <div>
          <h3 className="text-[17px] font-semibold leading-tight text-gray-900">
            {review.name}
          </h3>

          <p className="mt-1 text-[16px] leading-tight text-gray-500">
            {review.location}
          </p>
        </div>

      </div>


      {/* ================================= */}
      {/* RATING + INFO */}
      {/* ================================= */}

      <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[15px] text-gray-600">

        <span className="font-semibold tracking-[1px] text-gray-900">
          ★★★★★
        </span>

        <span>·</span>

        <span>
          {review.date}
        </span>

        <span>·</span>

        <span>
          {review.info}
        </span>

      </div>


      {/* ================================= */}
      {/* REVIEW TEXT */}
      {/* ================================= */}

      <p
        className={`
          mt-2
          text-[17px]
          leading-[1.45]
          text-gray-800
          ${!isExpanded ? "line-clamp-3" : ""}
        `}
      >
        {review.text}
      </p>


      {/* ================================= */}
      {/* SHOW MORE */}
      {/* ================================= */}

      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="
          mt-3
          text-[16px]
          font-semibold
          text-gray-900
          underline
          underline-offset-2
          hover:text-gray-600
        "
      >
        {isExpanded ? "Скрыть" : "Показать еще"}
      </button>

    </article>
  )
}


const CommentSection = () => {
  return (
    <section className="w-full">

      {/* ================================= */}
      {/* TITLE */}
      {/* ================================= */}

      <h2 className="mb-8 text-2xl font-semibold text-gray-900">
        Отзывы гостей
      </h2>


      {/* ================================= */}
      {/* REVIEWS GRID */}
      {/* ================================= */}

      <div className="
        grid
        grid-cols-1
        gap-x-16
        gap-y-12
        md:grid-cols-2
      ">

        {reviewsData.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
          />
        ))}

      </div>

    </section>
  )
}

export default CommentSection