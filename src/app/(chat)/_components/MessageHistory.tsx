"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { Message as IMessage } from "@/types/chat";
import Message from "./Message";
import { useAuth } from "@/providers/AuthProvider";

const MessageHistory = ({ messageList }: { messageList: IMessage[] }) => {
  const { user } = useAuth();
  return (
    <>
      {messageList
        .slice()
        .reverse()
        .map((message, index) => (
          <Message
            key={index}
            message={message}
            userId={user?.memberId ?? ""}
          />
        ))}
    </>
  );
};

export default MessageHistory;
