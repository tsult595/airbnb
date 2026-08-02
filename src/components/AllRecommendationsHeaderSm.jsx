'use client'

import SearchInput from "./ui/SearchInput"
import Link from 'next/link'
import { ArrowLeft, Filter } from 'lucide-react'

const AllRecommendationsHeaderSm = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 bg-white fixed flex items-center justify-between top-0 left-0 right-0 z-50 py-4 gap-4">
         <Link 
          href="/" 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <div className="flex-1">
          <SearchInput 
            value="" 
            onChange={() => {}} 
            placeholder="Поиск направлений..." 
          />
        </div>
        <Filter className="w-6 h-6 text-gray-700" />
    </div>
  )
}

export default AllRecommendationsHeaderSm