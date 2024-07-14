import dummyMessagePageData from "@/actions/message.action";
import React from "react";
import MessageList from "./MessageList";

const MessageSuspence = ({ chatId }: { chatId: string }) => {
  const messages = dummyMessagePageData;
  return <MessageList messagePage={messages} />;
};

export default MessageSuspence;
