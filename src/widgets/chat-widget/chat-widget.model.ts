import { create } from 'zustand'

interface SelectedChatState {
  selectedChatId: number | null
  setSelectedChatId: (chatId: number) => void
}

export const useSelectedChat = create<SelectedChatState>((set) => ({
  selectedChatId: null,
  setSelectedChatId: (chatId: number) => set({ selectedChatId: chatId }),
}))
