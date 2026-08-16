'use client'

import {LogOut} from 'lucide-react'
import Link from 'next/link'



const AvatarModal = ({ isOpen, onClose }) => {


  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-end bg-black/30 px-4 py-20 "
      onClick={onClose}
    >
      <div
        className="w-[220px] max-w-sm rounded-3xl bg-white p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
       <div className="flex flex-col items-center gap-3">
        <Link href="/favoritesApartments" className="w-full">
          <button>Favorites</button>
        </Link>
        <Link href="/messages" className="w-full">
          <button>Messages</button>
        </Link>
        <Link href="/profile" className="w-full">
          <button>Profile</button>
        </Link>
       </div>
        <div className="mt-5 space-y-2">
          <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors">
            <LogOut className="h-4 w-4" />
            Выйти
          </button>
        </div>
      </div>
    </div>
  )
}

export default AvatarModal