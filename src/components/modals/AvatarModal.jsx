'use client'

import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLogout } from '../../hooks/useAuth.js'

const AvatarModal = ({ isOpen, onClose }) => {
  const router = useRouter()

  const { mutate: handleLogout, isPending } = useLogout({
    onSuccess: () => {
      onClose() // Закрываем модальное окно
      router.push('/')
    },
    onError: () => {
      onClose() // Закрываем модалку даже при ошибке (клиентский стейт всё равно сбросился)
    }
  })

  if (!isOpen) return null

  const onLogoutClick = () => {
    handleLogout()
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-end bg-black/30 px-4 py-20"
      onClick={onClose}
    >
      <div
        className="w-[220px] max-w-sm rounded-3xl bg-white p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-3">
          <Link href="/favoritesApartments" className="w-full" onClick={onClose}>
            <button className="w-full text-left py-1 text-sm font-medium text-gray-700 hover:text-black">
              Favorites
            </button>
          </Link>
          <Link href="/messages" className="w-full" onClick={onClose}>
            <button className="w-full text-left py-1 text-sm font-medium text-gray-700 hover:text-black">
              Messages
            </button>
          </Link>
          <Link href="/userProfile" className="w-full" onClick={onClose}>
            <button className="w-full text-left py-1 text-sm font-medium text-gray-700 hover:text-black">
              Profile
            </button>
          </Link>
        </div>

        <div className="mt-5 border-t border-gray-100 pt-3">
          <button 
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            onClick={onLogoutClick}
            disabled={isPending}
          >
            <LogOut className="h-4 w-4" />
            {isPending ? 'Выход...' : 'Выйти'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AvatarModal
