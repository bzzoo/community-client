import type {
  ChatMessages,
  ChatMessage,
  ChatRoom,
  ChatRooms,
} from './chat.types'
import { chatTypes } from '@/shared/api/chat'

export function transChatRoomDtoToChatRoom(
  chatRoomDto: chatTypes.ChatRoomDto,
): ChatRoom {
  return {
    ...chatRoomDto,
  }
}

export function transChatRoomsDtoToChatRooms(
  chatRoomsDto: chatTypes.ChatRoomsDto,
): ChatRooms {
  return chatRoomsDto.map((chatRoom) => transChatRoomDtoToChatRoom(chatRoom))
}

export function transChatMessageDtoToChatMessage(
  chatMessageDto: chatTypes.ChatMessageDto,
): ChatMessage {
  return {
    ...chatMessageDto,
  }
}

export function transChatMessagesDtoToChatMessages(
  chatMessagesDto: chatTypes.ChatMassagesDto,
): ChatMessages {
  return chatMessagesDto.map((message) =>
    transChatMessageDtoToChatMessage(message),
  )
}
