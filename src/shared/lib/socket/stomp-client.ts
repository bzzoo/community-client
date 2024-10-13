import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'

export function StompClient(
  url: string,
  onConnect: () => void,
  onDisconnect: () => void,
) {
  const socket = new SockJS(url)
  const stompClient = new Client({
    webSocketFactory: () => socket as any,
    onConnect,
    onDisconnect,
    onStompError: (frame) => {
      console.error('브로커 메시지: ' + frame.headers['message'])
      console.error('추가 에러 정보: ' + frame.body)
    },
  })

  stompClient.activate()
  return stompClient
}
