"use client"

import React from "react"
import {
  BriefcaseBusiness,
  Users,
  MessageSquare,
  
} from "lucide-react"

const UserProfile = () => {
  return (
    <div className="min-h-screen w-full bg-white text-[#222222]">


      <div className="flex min-h-[calc(100vh-110px)]">


        {/* ================================================= */}
        {/* LEFT SIDEBAR */}
        {/* ================================================= */}

        <aside className="w-[38%] shrink-0 px-14 pt-12">

          <h1 className="mb-7 text-[38px] font-semibold tracking-[-1.5px]">
            Профиль
          </h1>


          <div className="max-w-[370px] space-y-2">

            {/* ABOUT */}

            <button
              type="button"
              className="
                flex
                w-full
                items-center
                gap-5
                rounded-2xl
                bg-gray-100
                px-5
                py-4
                text-left
                transition
              "
            >

              <div className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#fce7f3]
                font-semibold
                text-[#a21caf]
              ">
                T
              </div>

              <span className="text-[19px] font-medium">
                Обо мне
              </span>

            </button>


            {/* TRIPS */}

            <button
              type="button"
              className="
                flex
                w-full
                items-center
                gap-5
                rounded-2xl
                px-5
                py-4
                text-left
                hover:bg-gray-100
                transition
              "
            >

              <BriefcaseBusiness className="h-7 w-7 text-gray-700" />

              <span className="text-[19px] font-medium">
                Прошлые поездки
              </span>

            </button>


            {/* CONTACTS */}

            <button
              type="button"
              className="
                flex
                w-full
                items-center
                gap-5
                rounded-2xl
                px-5
                py-4
                text-left
                hover:bg-gray-100
                transition
              "
            >

              <Users className="h-7 w-7 text-gray-700" />

              <span className="text-[19px] font-medium">
                Контакты
              </span>

            </button>

          </div>

        </aside>


        {/* ================================================= */}
        {/* RIGHT CONTENT */}
        {/* ================================================= */}

        <main className="flex-1 border-l border-gray-200 px-16 pt-12">

          <div className="max-w-[820px]">

            {/* TITLE */}

            <div className="mb-7 flex items-center gap-5">

              <h2 className="text-[38px] font-semibold tracking-[-1.5px]">
                Обо мне
              </h2>

              <button
                type="button"
                className="
                  rounded-xl
                  bg-gray-100
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  hover:bg-gray-200
                  transition
                "
              >
                Редактировать
              </button>

            </div>


            {/* ================================================= */}
            {/* PROFILE INFO */}
            {/* ================================================= */}

            <div className="flex items-center gap-12">


              {/* USER CARD */}

              <div className="
                flex
                h-[275px]
                w-[410px]
                shrink-0
                flex-col
                items-center
                justify-center
                rounded-[28px]
                bg-white
                shadow-[0_8px_30px_rgba(0,0,0,0.10)]
              ">

                {/* Avatar */}

                <div className="
                  mb-4
                  flex
                  h-[125px]
                  w-[125px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#fce7f3]
                  text-[44px]
                  font-semibold
                  text-[#a21caf]
                ">
                  T
                </div>


                <h3 className="text-[34px] font-semibold leading-none">
                  Teymur
                </h3>

                <p className="mt-2 text-[16px] text-gray-500">
                  Гость
                </p>

              </div>


              {/* PROFILE COMPLETION */}

              <div className="max-w-[350px]">

                <h3 className="mb-4 text-[25px] font-semibold">
                  Заполните профиль
                </h3>

                <p className="mb-7 text-[17px] leading-[1.35] text-gray-500">
                  Профиль на Airbnb — важный элемент
                  любого бронирования. Заполните его,
                  чтобы хозяева и гости могли узнать
                  вас получше.
                </p>

                <button
                  type="button"
                  className="
                    rounded-xl
                    bg-gradient-to-r
                    from-[#ff385c]
                    to-[#e6007e]
                    px-8
                    py-4
                    text-[18px]
                    font-semibold
                    text-white
                    transition
                    hover:brightness-95
                    active:scale-[0.98]
                  "
                >
                  Начать
                </button>

              </div>

            </div>


            {/* ================================================= */}
            {/* DIVIDER */}
            {/* ================================================= */}

            <div className="my-12 h-px w-full bg-gray-200" />


            {/* ================================================= */}
            {/* REVIEWS */}
            {/* ================================================= */}

            <button
              type="button"
              className="
                flex
                items-center
                gap-5
                text-[18px]
                font-medium
                hover:text-gray-500
                transition
              "
            >

              <MessageSquare className="h-7 w-7" />

              <span>
                Показать мои отзывы
              </span>

            </button>

          </div>

        </main>

      </div>

    </div>
  )
}

export default UserProfile