"use client";

import React from "react";
import ChatScreen from "./ChatScreen";
import NoChatScreen from "./NotChatScreen";
import { useSelectedChat } from "@/hooks/useSelectedChat";

const ChatScreenSuspense = () => {
  const { selectedChatId } = useSelectedChat();
  return (
    <section className="flex flex-1 flex-col relative">
      {selectedChatId ? (
        <ChatScreen chatId={selectedChatId} />
      ) : (
        <NoChatScreen />
      )}
    </section>
  );
};

export default ChatScreenSuspense;
