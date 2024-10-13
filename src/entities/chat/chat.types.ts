import { z } from 'zod'
import {
  ChatMessageSchema,
  ChatMessagesSchema,
  ChatRoomSchema,
  ChatRoomsSchema,
} from '@/entities/chat/chat.contracts'
import { InfiniteData } from '@tanstack/react-query'
import { CursorResultType } from '@/shared/api/common/response.contracts'

export type ChatRoom = z.infer<typeof ChatRoomSchema>
export type ChatRooms = z.infer<typeof ChatRoomsSchema>
export type ChatMessage = z.infer<typeof ChatMessageSchema>
export type ChatMessages = z.infer<typeof ChatMessagesSchema>
export type InfiniteMessages = InfiniteData<CursorResultType<typeof ChatMessagesSchema>>
export type InfiniteRooms = InfiniteData<CursorResultType<typeof ChatRoomsSchema>>
