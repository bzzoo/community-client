'use client'

import { chatDtoTypes } from '@/shared/api/chat'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSessionStore } from '@/shared/session'
import { useSocketStore } from '@/shared/lib/socket/stomp.model'
import { SendMessageDtoSchema } from '@/shared/api/chat/chat.contracts'
import TextareaAutosize from 'react-textarea-autosize'

export function SendMessageForm({
  chatRoomId,
  onSend,
}: {
  chatRoomId: number
  onSend: () => void
}) {
  const { client } = useSocketStore()
  const { session } = useSessionStore()

  const {
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm<chatDtoTypes.SendMessageDto>({
    mode: 'onChange',
    resolver: zodResolver(SendMessageDtoSchema),
    defaultValues: {
      id: -1,
      chatId: chatRoomId,
      body: '',
      senderId: session?.id,
      senderNickname: session?.nickname,
    },
  })

  const sentMessage = (
    chatRoomId: number,
    message: chatDtoTypes.SendMessageDto,
  ) => {
    if (client !== null) {
      client.publish({
        destination: `/app/chat.sendMessage`,
        body: JSON.stringify({ ...message, chatId: chatRoomId }),
      })
      setValue('body', '')
      onSend()
    }
  }
  const formData = watch()
  const canSubmit = [isDirty, isValid].every(Boolean)
  const onSubmit = (chatMessage: chatDtoTypes.SendMessageDto) => {
    sentMessage(chatRoomId, chatMessage)
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full items-center max-h-60 border p-4 m-4 rounded-xl"
        >
          <TextareaAutosize
            className="w-full font-[15px] outline-none flex-1 resize-none"
            placeholder="새 메시지 보내기"
            value={formData.body}
            onChange={(e) => setValue('body', e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center w-8 h-8 justify-start"
          >
            전송
          </button>
        </form>
      </div>
    </div>
  )
}
