import { ChatInfo } from "@/types/chat";
import { QueryClient } from "@tanstack/react-query";

export const updateChatList = (
  queryClient: QueryClient,
  chatId: string,
  message: any
) => {
  queryClient.setQueryData<ChatInfo[]>(["chats"], (oldData) => {
    if (!oldData) return [];

    return oldData.map((c) =>
      c.chatId === chatId
        ? {
            ...c,
            lastMessages: message.content,
            createdAt: new Date(),
          }
        : c
    );
  });
};
