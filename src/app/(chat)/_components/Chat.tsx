import React from "react";
import UserIcon from "@/components/UserIcon";
import { ChatInfo } from "@/types/chat";
import { formattedDate } from "@/libs/dateFommats";
import { useSelectedChat } from "@/hooks/useSelectedChat";

const Chat = ({ chat }: { chat: ChatInfo }) => {
  const { selectedChatId, setSelectedChatId, setOpponent } = useSelectedChat();

  const handleClick = () => {
    setOpponent(chat.receiver.memberId, chat.receiver.nickname);
    setSelectedChatId(chat.chatId);
  };

  const isSelected = selectedChatId === chat.chatId;

  return (
    <div
      onClick={handleClick}
      className={`flex items-center border-t p-4 gap-4 cursor-pointer ${
        isSelected ? "bg-gray-300" : "hover:bg-gray-200 active:bg-gray-300"
      }`}
    >
      <UserIcon size="lg" />
      <div className="flex flex-col">
        <span className="text-[14px]">{chat.receiver.nickname}</span>
        <span className="text-[13px] text-gray-600 whitespace-normal overflow-hidden text-ellipsis line-clamp-2">
          {chat.lastMessages}
        </span>
        <span className="text-[12px] text-gray-500">
          {formattedDate(chat.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default Chat;
