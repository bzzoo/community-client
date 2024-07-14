"use client";
import React from "react";
import ChatList from "../_components/ChatList";
import dummyChatData from "@/actions/chat.action";
import ChatRoom from "../_components/ChatRoom";

const Page = async () => {
  const chatList = dummyChatData;
  const chatId = chatList[0].chatId;
  return (
    <div className="flex border-solid border-x h-full bg-white">
      {Array.isArray(chatList) && (
        <ChatList chatList={chatList} onRoomClick={() => {}} />
      )}
      <ChatRoom chatId={chatId} />
    </div>
  );
};

export default Page;
