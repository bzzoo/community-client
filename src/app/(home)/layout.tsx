import { Header } from '@/widgets/header/header-ui'

export default function RootLayout({
  children,
  side,
}: {
  children: React.ReactNode
  side: React.ReactNode
}) {
  return (
    <div className="flex flex-col w-full gap-4">
      <Header />
      <main className="flex mx-auto w-full max-w-5xl">
        <MainSection>{children}</MainSection>
        <SideSection>{side}</SideSection>
      </main>
    </div>
  )
}

function MainSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 min-w-0 p-4">
      <div className="w-full flex flex-col gap-4">{children}</div>
    </div>
  )
}

function SideSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden gap-8 w-[320px] shrink-0 lg:block p-4">
      <div className="flex flex-col justify-center items-center mb-4">
        <div className="h-[200px] w-full rounded-2xl bg-defaultGray"></div>
      </div>
      <div className="flex flex-col justify-center items-center sticky top-20">
        <div className="h-[520px] w-full rounded-2xl bg-defaultGray"></div>
      </div>
    </div>
  )
}
