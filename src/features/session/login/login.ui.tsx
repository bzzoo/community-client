'use client'

import { Button } from '@/shared/ui/button'

export function KAKAOSignInButton() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao'
  }

  return <Button onClick={handleLogin}>Kakao 계속하기</Button>
}

export function GoogleSignInButton() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google'
  }
  return <Button onClick={handleLogin}>Google 계속하기</Button>
}
