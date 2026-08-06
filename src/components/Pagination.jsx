"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

const Pagination = ({
  currentPage = 1, // 🟢 Исправлено: по умолчанию 1
  totalPages = 1,  // 🟢 Исправлено: по умолчанию 1
  onPageChange
}) => {
  // 🟢 Приводим к числам на случай, если из URL пришла строка ("1")
  const pageNum = Number(currentPage) || 1
  const totalNums = Number(totalPages) || 1

  const handlePageChange = (page) => {
    if (page < 1 || page > totalNums || page === pageNum) {
      return
    }

    onPageChange?.(page)
  }

  // Создаём страницы для отображения
  const getPages = () => {
    if (totalNums <= 5) {
      return Array.from(
        { length: totalNums },
        (_, index) => index + 1
      )
    }

    if (pageNum <= 3) {
      return [1, 2, 3, 4, "...", totalNums]
    }

    if (pageNum >= totalNums - 2) {
      return [
        1,
        "...",
        totalNums - 3,
        totalNums - 2,
        totalNums - 1,
        totalNums
      ]
    }

    return [
      1,
      "...",
      pageNum - 1,
      pageNum,
      pageNum + 1,
      "...",
      totalNums
    ]
  }

  const pages = getPages()

  return (
    <nav
      className="flex items-center justify-center gap-1"
      aria-label="Pagination"
    >
      {/* PREVIOUS */}
      <button
        type="button"
        onClick={() => handlePageChange(pageNum - 1)}
        disabled={pageNum <= 1}
        className="
          w-10
          h-10
          flex
          items-center
          justify-center
          rounded-full
          text-gray-800
          transition-colors
          hover:bg-gray-100
          disabled:opacity-30
          disabled:cursor-not-allowed
        "
        aria-label="Предыдущая страница"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* PAGES */}
      {pages.map((page, index) => {
        // Троеточие
        if (page === "...") {
          return (
            <span
              key={`dots-${index}`}
              className="
                w-10
                h-10
                flex
                items-center
                justify-center
                text-gray-700
                font-medium
                select-none
              "
            >
              ...
            </span>
          )
        }

        const isActive = page === pageNum

        return (
          <button
            key={page}
            type="button"
            onClick={() => handlePageChange(page)}
            className={`
              w-10
              h-10
              flex
              items-center
              justify-center
              rounded-full
              text-sm
              font-medium
              transition-all
              duration-200
              ${
                isActive
                  ? "bg-[#222222] text-white font-semibold"
                  : "text-gray-800 hover:bg-gray-100"
              }
            `}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </button>
        )
      })}

      {/* NEXT */}
      <button
        type="button"
        onClick={() => handlePageChange(pageNum + 1)}
        disabled={pageNum >= totalNums}
        className="
          w-10
          h-10
          flex
          items-center
          justify-center
          rounded-full
          text-gray-800
          transition-colors
          hover:bg-gray-100
          disabled:opacity-30
          disabled:cursor-not-allowed
        "
        aria-label="Следующая страница"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  )
}

export default Pagination