"use client";

import { useAuth } from "@/providers/AuthProvider";
import { Message as IMessage } from "@/types/chat";
import React from "react";
import Message from "./Message";

const NewMessages = ({ messages }: { messages: IMessage[] }) => {
  const { user } = useAuth();
  return (
    <>
      {messages.map((message, index) => (
        <Message key={index} message={message} userId={user?.memberId ?? ""} />
      ))}
    </>
  );
};

export default NewMessages;
