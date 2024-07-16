import React from "react";
import UserIcon from "@/components/UserIcon";
import { ChatInfo } from "@/types/chat";
import { formattedDate } from "@/libs/dateFommats";

const Chat = ({
  chat,
  onRoomClick,
}: {
  chat: ChatInfo;
  onRoomClick: (chatId: string) => void;
}) => {
  return (
    <>
      <div
        onClick={() => onRoomClick}
        className={`flex items-center border-t p-4 gap-4 cursor-pointer hover:bg-gray-200 active:bg-gray-300`}
      >
        <UserIcon size="lg" />
        <div className="flex flex-col">
          <span className="text-[14px]">{}</span>
          <span className="text-[13px] text-gray-600 whitespace-normal overflow-hidden text-ellipsis line-clamp-2">
            {chat.lastMessages}
          </span>
          <span className="text-[12px] text-gray-500">
            {formattedDate(chat.createdAt)}
          </span>
        </div>
      </div>
    </>
  );
};

export default Chat;
