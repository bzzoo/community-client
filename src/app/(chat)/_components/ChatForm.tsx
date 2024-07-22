"use client";

import { useChatStore } from "@/hooks/useChatStore";
import { useAuth } from "@/providers/AuthProvider";
import { useSocket } from "@/providers/SocketProvider";
import { Message } from "@/types/chat";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const ChatForm = ({ chatId }: { chatId: string }) => {
  const { sendMessage } = useSocket();
  const { user } = useAuth();
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const newMessage: Message = {
        chatId: chatId,
        messageId: Date.now().toString(),
        sender: {
          memberId: user?.memberId || "",
          content: message,
        },
        content: message,
        createdAt: new Date(),
        messageType: "MESSAGE",
        isRead: false,
      };
      sendMessage(chatId, newMessage);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSendMessage}
        className="flex w-full items-center border p-4 m-4 rounded-xl"
      >
        <TextareaAutosize
          className="w-full font-[15px] max-h-60 outline-none flex-1 resize-none leading-4"
          placeholder="새 메시지 보내기"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center w-8 h-8 justify-start"
        >
          <span>등록</span>
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
