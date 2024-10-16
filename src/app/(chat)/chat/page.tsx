'use client'

import { ChatWidget } from '@/widgets/chat-widget'

type PageProps = {
  params: {
    id: number
  }
}

export default function page() {
  return <ChatWidget memberId={1}/>
}
