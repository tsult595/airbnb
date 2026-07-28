'use client'

import { Search } from 'lucide-react'

const SearchInput = ({ value, onChange, placeholder = 'Начать поиск...' }) => {
  return (
    <div className="relative w-full max-w-md">
      {/* Иконка лупы */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
        <Search className="h-5 w-5 text-gray-400" />
      </div>

      {/* Поле ввода */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      />
    </div>
  )
}

export default SearchInput