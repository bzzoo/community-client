import { AxiosContracts, axiosInstance } from '@/shared/lib/axios'
import { ChatMessagesDtoSchema, ChatRoomsDtoSchema } from './chat.contracts'
import { PageParamsDto } from '@/shared/api/comment/comment.types'

export class ChatService {
  static getChatRooms(config: { memberId: number; params: PageParamsDto }) {
    const { memberId, params } = config
    return axiosInstance
      .get(`/chats`, { params })
      .then(AxiosContracts.pageResponseContract(ChatRoomsDtoSchema))
  }

  static getChatMessages(config: { roomId: number; params: PageParamsDto }) {
    const { roomId, params } = config
    return axiosInstance
      .get(`/chats/${roomId}/messages`, { params })
      .then(AxiosContracts.pageResponseContract(ChatMessagesDtoSchema))
  }
}
