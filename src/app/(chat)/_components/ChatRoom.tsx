import React from "react";
import ChatHeader from "./ChatHeader";
import ChatForm from "./ChatForm";
import MessageSuspence from "./MessageSuspence";

const Chat = ({ chatId }: { chatId: string }) => {
  return (
    <section className="flex flex-1 flex-col relative">
      <ChatHeader />
      <MessageSuspence chatId={chatId} />
      <ChatForm chatId={chatId} />
    </section>
  );
};

export default Chat;
