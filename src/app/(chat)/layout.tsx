import { Header } from '@/widgets/header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-screen bg-neutral-400/10">
      <Header />
      <main className="mx-auto h-[calc(100vh-62px)] max-w-5xl">{children}</main>
    </div>
  )
}
