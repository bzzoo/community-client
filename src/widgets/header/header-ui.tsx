import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { GoogleSignInButton, KAKAOSignInButton } from '@/features/session/login/login.ui'

export function Header() {
  return (
    <header className="flex sticky top-0 z-20 border-b bg-white bg-opacity-75 p-4">
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
        <h2 className="text-3xl font-bold">COMMUNITY</h2>
      </Link>
    </div>
  )
}

function SignUpLink() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>회원 가입</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>커뮤니티 회원가입</DialogTitle>
        <KAKAOSignInButton/>
        <GoogleSignInButton/>
        <VisuallyHidden>
          <DialogDescription />
        </VisuallyHidden>
      </DialogContent>
    </Dialog>
  )
}

function SignInLink() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>로그인</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>커뮤니티 로그인</DialogTitle>
        <KAKAOSignInButton/>
        <GoogleSignInButton/>
        <VisuallyHidden>
          <DialogDescription />
        </VisuallyHidden>
      </DialogContent>
    </Dialog>
  )
}
