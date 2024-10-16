import { z } from 'zod'

export const SendMessageDtoSchema = z.object({
  id: z.number().default(-1),
  chatId:z.number(),
  senderId: z.number(),
  senderNickname: z.string(),
  body: z.string(),
})

export const ChatMessageDtoSchema = z.object({
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

export const ChatRoomDtoSchema = z.object({
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

export const ChatMessagesDtoSchema = z.array(ChatMessageDtoSchema)
export const ChatRoomsDtoSchema = z.array(ChatRoomDtoSchema)
