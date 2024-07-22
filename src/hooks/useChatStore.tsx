import { Message } from "@/types/chat";
import { create } from "zustand";

interface ChatState {
  messages: Record<string, Message[]>;
  addMessage: (chatId: string, message: Message) => void;
  setMessages: (chatId: string, messages: Message[]) => void;
  resetChatStore: (chatId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: {},
  addMessage: (chatId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] || []), message],
      },
    })),
  setMessages: (chatId, messages) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: messages,
      },
    })),
  resetChatStore: (chatId) =>
    set((state) => {
      const newMessages = { ...state.messages };
      delete newMessages[chatId];
      return { messages: newMessages };
    }),
}));

export const updateMessages = (chatId: string, message: Message) => {
  const { messages, addMessage, setMessages } = useChatStore.getState();

  if (messages[chatId]) {
    addMessage(chatId, message);
  } else {
    setMessages(chatId, [message]);
  }
};
