import { chatTypes, chatContracts } from '@/entities/chat'
import { queryClient } from '@/shared/lib/react-query'

export function updateChatMessagesCache(
  newMessage: chatTypes.ChatMessage,
  chatRoomId: number,
): boolean {
  const parsedMessage = chatContracts.ChatMessageSchema.safeParse(newMessage)
  if (!parsedMessage.success) return false
  queryClient.setQueryData<chatTypes.InfiniteMessages>(
    ['chatMessages', chatRoomId.toString()],
    (oldData) => {
      if (!oldData) return oldData

      return {
        ...oldData,
        pages: oldData.pages.map((page, index) =>
          index === 0
            ? { ...page, content: [parsedMessage.data, ...page.content] }
            : page,
        ),
      }
    },
  )

  return true
}

export function handleReceivedMessage(message: any, chatRoomId: number) {
  try {
    const receivedMessage = JSON.parse(message.body)
    return updateChatMessagesCache(receivedMessage, chatRoomId)
      ? receivedMessage
      : null
  } catch (error) {
    console.error('Failed to parse received message:', error)
    return null
  }
}
