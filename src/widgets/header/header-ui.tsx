import Link from 'next/link'
import { Button } from '@/shared/ui/button'

export function Header() {
  return (
    <header className="flex sticky top-0 z-20 bg-white bg-opacity-75 p-4">
      <div className="flex w-full max-w-6xl mx-auto">
        <HomeLink />
        <div className="flex gap-4">
          <SignInLink />
          <SignUpLink />
        </div>
      </div>
    </header>
  )
}


function HomeLink() {
  return (
    <div className="flex w-full items-center">
      <Link href="/">
        <h1 className="text-3xl font-bold">COMMUNITY</h1>
      </Link>
    </div>
  )
}

function SignUpLink() {
  return <Button>회원 가입</Button>
}

function SignInLink() {
  return <Button>로그인</Button>
}
