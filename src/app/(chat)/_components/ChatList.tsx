import { ChatInfo } from "@/types/chat";
import React from "react";
import Chat from "./Chat";

const ChatList = ({ chatList }: { chatList: ChatInfo[] }) => {
  return (
    <>
      {chatList.map((chat, index) => (
        <Chat key={index} chat={chat} />
      ))}
    </>
  );
};

export default ChatList;
