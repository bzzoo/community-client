import { ChatService } from '@/shared/api/chat'
import {
  transChatMessagesDtoToChatMessages,
  transChatRoomsDtoToChatRooms,
} from '@/entities/chat/chat.lib'
import { InfiniteMessages, InfiniteRooms } from './chat.types'
import { infiniteQueryOptions } from '@tanstack/react-query'
import { queryClient } from '@/shared/lib/react-query'

export class ChatQueries {
  static chatRoomsInfiniteQuery(memberId: number) {
    return infiniteQueryOptions({
      queryKey: ['chatRooms', memberId.toString()],
      queryFn: async () => {
        const response = await ChatService.getChatRooms({
          memberId: memberId,
          params: {
            sz: 20,
            cr: -1,
          },
        })
        const chatRooms = transChatRoomsDtoToChatRooms(response.content)
        return {
          ...response,
          content: chatRooms,
        }
      },
      initialPageParam: -1,
      getNextPageParam: (lastPage) =>
        lastPage.isLast ? null : lastPage.nextCursor,
      // @ts-expect-error FIXME: https://github.com/TanStack/query/issues/7341
      initialData: () =>
        this.getInitialData<InfiniteRooms>(['chatRooms', memberId.toString()]),
      initialDataUpdatedAt: () =>
        this.getQueryDataUpdateAt(['chatRooms', memberId.toString()]),
    })
  }

  static chatMessagesInfiniteQuery(roomId: number) {
    const queryKey = ['chatMessages', roomId.toString()]
    return infiniteQueryOptions({
      queryKey,
      queryFn: async ({ pageParam = -1 }) => {
        const response = await ChatService.getChatMessages({
          roomId: roomId,
          params: {
            sz: 20,
            cr: pageParam as number,
          },
        })
        const chatMessages = transChatMessagesDtoToChatMessages(
          response.content,
        )
        return {
          ...response,
          content: chatMessages,
        }
      },
      initialPageParam: -1,
      getNextPageParam: (lastPage) =>
        lastPage.isLast ? null : lastPage.nextCursor,
      // @ts-expect-error FIXME: https://github.com/TanStack/query/issues/7341
      initialData: () => this.getInitialData<InfiniteMessages>(queryKey),
      initialDataUpdatedAt: () => this.getQueryDataUpdateAt(queryKey),
    })
  }

  private static getInitialData<T>(queryKey: string[]) {
    return queryClient.getQueryData<T>(queryKey)
  }

  private static getQueryDataUpdateAt<T>(id: string[]) {
    return queryClient.getQueryState<T>(id)?.dataUpdatedAt
  }
}
