import { Header } from '@/widgets/header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-neutral-400/10">
      <Header />
      <main className="mx-auto w-full h-[calc(100vh-64px)] max-w-5xl">
        <div className="flex border-solid border-x h-full bg-white">
          {children}
        </div>
      </main>
    </div>
  )
}
