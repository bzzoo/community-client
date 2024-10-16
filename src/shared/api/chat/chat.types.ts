import { z } from 'zod'

import {
  ChatMessageDtoSchema,
  ChatMessagesDtoSchema,
  ChatRoomDtoSchema,
  ChatRoomsDtoSchema,
  SendMessageDtoSchema,
} from './chat.contracts'

export type ChatRoomDto = z.infer<typeof ChatRoomDtoSchema>
export type ChatRoomsDto = z.infer<typeof ChatRoomsDtoSchema>
export type ChatMessageDto = z.infer<typeof ChatMessageDtoSchema>
export type ChatMassagesDto = z.infer<typeof ChatMessagesDtoSchema>
export type SendMessageDto = z.infer<typeof SendMessageDtoSchema>
