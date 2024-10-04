'use client'

import { useRouter } from 'next/navigation'
import { useLoginMutation } from '@/features/session/login'
import { useEffect } from 'react'

export default function page() {
  const router = useRouter()

  const loginMutation = useLoginMutation({
    onSuccess: async () => {
      router.push('/')
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })

  useEffect(() => {
    // @ts-ignore
    loginMutation.mutate()
  }, [])
}
