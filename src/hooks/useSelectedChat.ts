import { create } from "zustand";

interface SelectedChatState {
  opponent: {
    memberId: string | null;
    nickname: string | null;
  };
  selectedChatId: string | null;
  setSelectedChatId: (id: string | null) => void;
  setOpponent: (memberId: string | null, nickname: string | null) => void;
}

export const useSelectedChat = create<SelectedChatState>((set) => ({
  opponent: {
    memberId: null,
    nickname: null,
  },
  selectedChatId: null,
  setSelectedChatId: (id: string | null) => set({ selectedChatId: id }),
  setOpponent: (memberId: string | null, nickname: string | null) =>
    set({ opponent: { memberId, nickname } }),
}));
