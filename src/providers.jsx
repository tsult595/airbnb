'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useState } from 'react'

export default function ReactQueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          const status = error?.response?.status
          return status !== 401 && status !== 403 && status !== 404 && failureCount < 2
        },
      },
    },
  }))

  // 🔥 Подставляем твой Client ID из Google Cloud Console
  // Рекомендуется вынести его в .env.local как NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </GoogleOAuthProvider>
  )
}
