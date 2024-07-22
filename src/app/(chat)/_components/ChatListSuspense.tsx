"use client";

import { useSocket } from "@/providers/SocketProvider";
import ChatList from "./ChatList";
import { useQueryClient } from "@tanstack/react-query";
import { ChatInfo } from "@/types/chat";
import { useCallback, useEffect } from "react";
import { updateChatList } from "../_libs/updateMessages";
import { useChatStore } from "@/hooks/useChatStore";

const ChatListSuspence = () => {
  const { subscribe, connected } = useSocket();
  const queryClient = useQueryClient();
  const chatList = queryClient.getQueryData<ChatInfo[]>(["chats"]) || [];
  const updateMessages = useChatStore((state) => state.addMessage);

  const subscribeToChats = useCallback(() => {
    if (connected && chatList) {
      chatList.forEach((chat) => {
        subscribe(chat.chatId, (message: any) => {
          console.log("Received message:", message);
          updateChatList(queryClient, chat.chatId, message);
          updateMessages(chat.chatId, message);
        });
      });
    }
  }, [connected]);

  useEffect(() => {
    subscribeToChats();
  }, [subscribeToChats]);

  return (
    <section className="w-[360px] border-solid border-r">
      <div className="flex flex-col">
        <span className="p-2">채팅 리스트</span>
        <ChatList chatList={chatList} />
        <div className="border-t"></div>
      </div>
    </section>
  );
};

export default ChatListSuspence;
