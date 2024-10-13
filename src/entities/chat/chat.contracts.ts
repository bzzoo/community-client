import { z } from 'zod'

export const ChatMessageSchema = z.object({
  id: z.number(),
  chatId: z.number(),
  sender: z.object({
    id: z.number(),
    nickname: z.string(),
  }),
  body: z.string(),
  createdAt: z.coerce.date().nullable(),
  messageType: z.enum(['MESSAGE', 'IMAGE', 'JOIN']).nullable(),
  isRead: z.boolean().nullable(),
})

export const ChatRoomSchema = z.object({
  id: z.number(),
  sender: z.object({
    id: z.number(),
    nickname: z.string(),
  }),
  receiver: z.object({
    id: z.number(),
    nickname: z.string(),
  }),
  period: z.object({
    createdAt: z.coerce.date(),
    endDate: z.coerce.date(),
  }),
  lastMessage: z.string().nullable(),
  lastUpdatedAt: z.coerce.date().nullable(),
})

export const ChatMessagesSchema = z.array(ChatMessageSchema)
export const ChatRoomsSchema = z.array(ChatRoomSchema)
