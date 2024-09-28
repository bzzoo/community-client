import { Header } from '@/widgets/header/header-ui'

export default function RootLayout({
  main,
  side,
}: {
  main: React.ReactNode
  side: React.ReactNode
}) {
  return (
    <div className="flex flex-col w-full">
      <Header />
      <main className="flex mx-auto w-full max-w-5xl">
        <MainSection>{main}</MainSection>
        <SideSection>{side}</SideSection>
      </main>
    </div>
  )
}

function MainSection({ children }: { children: React.ReactNode }) {
  return <section className="flex-1">{children}</section>
}

function SideSection({ children }: { children: React.ReactNode }) {
  return <section className="flex w-[320px]">{children}</section>
}