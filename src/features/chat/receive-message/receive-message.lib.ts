import { useEffect } from 'react'
import { useSocketStore } from '@/shared/lib/socket'
import { handleReceivedMessage } from './receive-message.model'
import { chatTypes } from '@/entities/chat'

export function useChatRoomListener(
  chatRooms: chatTypes.ChatRooms,
  onNewMessage: (message: chatTypes.ChatMessage) => void,
) {
  const { connect, client } = useSocketStore()
  useEffect(() => {
    connect()
    if (client !== null && Array.isArray(chatRooms)) {
      const subscriptions = chatRooms.map((chatRoom) => {
        return client.subscribe(`/topic/chat/${chatRoom.id}`, (message) => {
          const newMessage = handleReceivedMessage(message, chatRoom.id)
          if (newMessage) {
            onNewMessage(newMessage)
          }
        })
      })

      return () => {
        subscriptions.forEach((subscription) => subscription.unsubscribe())
      }
    }
  }, [client, chatRooms, onNewMessage])
}
