'use client'

import { create } from 'zustand'
import { StompClient } from './stomp-client'
import { Client } from '@stomp/stompjs'

interface SocketState {
  client: Client | null
  connected: boolean
  connect: () => void
  disconnect: () => void
}

const url = 'http://localhost:8080/ws'

export const useSocketStore = create<SocketState>((set, get) => ({
  client: null,
  connected: false,
  connect: () => {
    const { client, connected } = get()
    if (client && connected) {
      console.log('Already connected.')
      return
    }

    const stompClient = StompClient(
      url,
      () => set({ connected: true, client: stompClient }),
      () => set({ connected: false, client: null }),
    )
  },
  disconnect: () => {
    const { client } = get()
    if (client) {
      client.deactivate()
    }
    set({ connected: false, client: null })
  },
}))
