"use client";
import UserIcon from "@/components/UserIcon";
import { useSelectedChat } from "@/hooks/useSelectedChat";
import React from "react";

const ChatHeader = () => {
  const { opponent } = useSelectedChat();
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 border-b px-4 py-2">
        <UserIcon size="lg" />
        <span>{opponent.nickname}</span>
      </div>
    </div>
  );
};

export default ChatHeader;
