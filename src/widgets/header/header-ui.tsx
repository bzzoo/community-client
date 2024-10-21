'use client'

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
import {
  GoogleSignInButton,
  KAKAOSignInButton,
} from '@/features/session/login/login.ui'
import { useSessionStore } from '@/shared/session'
import MemberIcon from '@/shared/ui/member-icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { FaBell } from 'react-icons/fa6'
import { IoChatbubbleSharp } from 'react-icons/io5'

export function Header() {
  const { session } = useSessionStore.use

  return (
    <header className="flex sticky top-0 z-20 border-b bg-white bg-opacity-75 p-2">
      <div className="flex w-full max-w-6xl mx-auto">
        <HomeLink />
        {session() ? <MemberSection /> : <GuestSection />}
      </div>
    </header>
  )
}

function HomeLink() {
  return (
    <div className="flex w-full items-center">
      <Link href="/">
        <h2 className="text-2xl font-bold">COMMUNITY</h2>
      </Link>
    </div>
  )
}

function GuestSection() {
  return (
    <div className="flex gap-4">
      <SignInLink />
      <SignUpLink />
    </div>
  )
}

function MemberSection() {
  return (
    <div className="flex gap-6 items-center">
      <IoChatbubbleSharp
        size={24}
        className="text-gray-400"
      />
      <FaBell
        size={24}
        className="text-gray-400"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full w-11 h-11">
            <MemberIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          side={'bottom'}
          align={'end'}
        >
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Activity Bar</DropdownMenuItem>
          <DropdownMenuItem>Panel</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
        <KAKAOSignInButton />
        <GoogleSignInButton />
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
        <KAKAOSignInButton />
        <GoogleSignInButton />
        <VisuallyHidden>
          <DialogDescription />
        </VisuallyHidden>
      </DialogContent>
    </Dialog>
  )
}
