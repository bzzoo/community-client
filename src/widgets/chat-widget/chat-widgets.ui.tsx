'use client'

import UserIcon from '@/shared/ui/member-icon'
import { ChatQueries, chatTypes } from '@/entities/chat'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useSelectedChat } from '@/widgets/chat-widget/chat-widget.model'
import { SendMessageForm } from '@/features/chat/send-message'
import { useChatScrollManagement } from './chat-widget.lib'
import { useChatRoomListener } from '@/features/chat/receive-message/receive-message.lib'
import { useSessionStore } from '@/shared/session'
import { useEffect, useRef, useState } from 'react'
import { formattedDate } from '@/shared/lib/utils'

export function ChatWidget({ memberId }: { memberId: number }) {
  const {
    shouldScrollToBottom,
    setShouldScrollToBottom,
    isNearBottomRef,
    scrollToBottom,
  } = useChatScrollManagement()

  const roomInfiniteQueryOptions = ChatQueries.chatRoomsInfiniteQuery(memberId)
  const {
    data: chatRoomsData,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(roomInfiniteQueryOptions)

  const { selectedChatId, setSelectedChatId } = useSelectedChat()
  const isEmpty = isSuccess && !hasNextPage && !chatRoomsData
  const canShowNextPageButton = hasNextPage && !isFetchingNextPage
  const canShowLoadingPageButton = hasNextPage && isFetchingNextPage
  const chatRooms = chatRoomsData.pages.flatMap((page) => page.content || [])

  useChatRoomListener(chatRooms, () => {
    if (isNearBottomRef.current) {
      scrollToBottom()
    }
  })

  const handleSendMessage = () => {
    scrollToBottom()
  }

  return (
    <div className="flex h-full max-h-full bg-white">
      {isSuccess &&
        chatRooms.map((chatRoom) => (
          <ChatRoom
            key={chatRoom.id}
            chatRoom={chatRoom}
            onRoomClick={setSelectedChatId}
          />
        ))}
      {canShowNextPageButton && (
        <button onClick={() => fetchNextPage()}>Load more</button>
      )}
      {canShowLoadingPageButton && <p>Loading more...</p>}
      {isEmpty && <p>No articles found</p>}
      {selectedChatId && (
        <section className="flex flex-1 flex-col relative">
          <MessageHeader />
          <ChatMessageList
            chatRoomId={selectedChatId}
            shouldScrollToBottom={shouldScrollToBottom}
            onScrollChange={setShouldScrollToBottom}
          />
          <SendMessageForm
            chatRoomId={selectedChatId}
            onSend={handleSendMessage}
          />
        </section>
      )}
    </div>
  )
}

function MessageHeader() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 border-b px-4 py-2">
        <UserIcon size="lg" />
        <span>이름</span>
      </div>
    </div>
  )
}

function ChatMessageList({
  chatRoomId,
  shouldScrollToBottom,
  onScrollChange,
}: {
  chatRoomId: number
  shouldScrollToBottom: boolean
  onScrollChange: (isNearBottom: boolean) => void
}) {
  const { session } = useSessionStore()
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const [isNearBottom, setIsNearBottom] = useState(true)
  const messageInfiniteQueryOptions =
    ChatQueries.chatMessagesInfiniteQuery(chatRoomId)

  const {
    data: chatMessages,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(messageInfiniteQueryOptions)

  useEffect(() => {
    if (shouldScrollToBottom || isNearBottom) {
      scrollToBottom()
    }
  }, [chatMessages, shouldScrollToBottom, isNearBottom])

  useEffect(() => {
    scrollToBottom()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container
      const scrollBottom = scrollHeight - scrollTop - clientHeight
      const newIsNearBottom = scrollBottom < 50
      setIsNearBottom(newIsNearBottom)
      onScrollChange(newIsNearBottom)
    }
  }

  const handleFetchPreviousMessages = () => {
    const container = scrollContainerRef.current
    if (container) {
      const currentScrollHeight = container.scrollHeight
      const currentScrollTop = container.scrollTop

      fetchNextPage()
        .then(() => {
          setTimeout(() => {
            const newScrollHeight = container.scrollHeight
            const heightDifference = newScrollHeight - currentScrollHeight
            container.scrollTop = currentScrollTop + heightDifference
          }, 0)
        })
        .catch((error) => {
          console.error('이전 메시지를 로딩하는 중 오류가 발생했습니다:', error)
        })
    }
  }

  const canShowNextPageButton = hasNextPage && !isFetchingNextPage

  const reversedMessages = isSuccess
    ? chatMessages.pages.flatMap((page) => page.content).reverse()
    : []

  return (
    <section
      ref={scrollContainerRef}
      className="flex-1 overflow-auto scroll"
      onScroll={handleScroll}
    >
      <div className="p-2 flex flex-col justify-end">
        {canShowNextPageButton && (
          <button
            onClick={handleFetchPreviousMessages}
            disabled={isFetchingNextPage}
            className="text-blue-500"
          >
            {isFetchingNextPage ? '로딩 중...' : '더보기'}
          </button>
        )}

        {reversedMessages.map((message: chatTypes.ChatMessage) =>
          message.sender.id === session?.id ? (
            <MyMessage key={message.id} message={message} />
          ) : (
            <YourMessage key={message.id} message={message} />
          ),
        )}
      </div>
      <div ref={messagesEndRef} />
    </section>
  )
}

function MyMessage({ message }: { message: chatTypes.ChatMessage }) {
  return (
    <div className="flex flex-col items-end">
      <div className="bg-blue-400 text-[14px] text-white rounded-tl-[22px] rounded-tr-[22px] rounded-bl-[22px] px-2 py-3">
        {message.body}
      </div>
      <div className="text-[12px] text-slate-500">
        {formattedDate(message.createdAt || new Date())}
      </div>
    </div>
  )
}

function YourMessage({ message }: { message: chatTypes.ChatMessage }) {
  return (
    <div className="flex flex-col items-start">
      <div className="bg-green-400 text-[14px] text-white rounded-tl-[22px] rounded-br-[22px] px-2 py-3">
        {message.body}
      </div>
      <div className="text-[12px] text-slate-500">
        {formattedDate(message.createdAt || new Date())}
      </div>
    </div>
  )
}

function ChatRoom({
  chatRoom,
  onRoomClick,
}: {
  chatRoom: chatTypes.ChatRoom
  onRoomClick: (chatId: number) => void
}) {
  const { session } = useSessionStore()
  const opponentNickname =
    chatRoom.receiver.id !== session?.id
      ? chatRoom.receiver.nickname
      : chatRoom.sender.nickname

  if (!session) {
    return null
  }
  return (
    <div className="w-[360px] border-r">
      <div
        onClick={() => onRoomClick(chatRoom.id)}
        className="flex items-center border-b p-4 gap-4 cursor-pointer hover:bg-gray-200 active:bg-gray-300"
      >
        <UserIcon size="lg" />
        <div className="flex flex-col">
          <span className="text-[14px]">{opponentNickname}</span>
          <span className="text-[13px] text-gray-600 whitespace-normal overflow-hidden text-ellipsis line-clamp-2">
            {chatRoom.lastMessage}
          </span>
          <span className="text-[12px] text-gray-500">
            {formattedDate(chatRoom.period.createdAt)}
          </span>
        </div>
      </div>
    </div>
  )
}
