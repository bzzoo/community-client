"use client";

import React, { useEffect, useRef } from "react";
import { formattedDate } from "@/libs/dateFommats";
import { MessagePageData } from "@/types/chat";

const MessageList = ({ messagePage }: { messagePage: MessagePageData }) => {
  const user = {
    memberId: "1",
  };
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex-1 overflow-auto no-scrollbar">
      {messagePage?.content.map((message, pageIndex) => (
        <div key={message.messageId} className="flex flex-col p-4">
          <div
            className={`${
              message.sender.memberId === user?.memberId
                ? "items-end"
                : "items-start"
            } flex flex-col`}
          >
            <div
              className={`${
                message.sender.memberId === user?.memberId
                  ? "bg-blue-400"
                  : "bg-green-400"
              } text-white rounded-tl-[22px] rounded-tr-[22px] ${
                message.sender.memberId === user?.memberId
                  ? "rounded-bl-[22px]"
                  : "rounded-br-[22px]"
              } px-3 py-4`}
            >
              {message.content}
            </div>
            <div className="text-[12px] text-slate-500">
              {formattedDate(message.createdAt)}
            </div>
          </div>
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
