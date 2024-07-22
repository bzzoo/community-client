import { formattedDate } from "@/libs/dateFommats";
import { Message as IMessage } from "@/types/chat";
import React from "react";

const Message = ({
  message,
  userId,
}: {
  message: IMessage;
  userId: string;
}) => {
  return (
    <div className="flex flex-col p-4">
      <div
        className={`${
          message.sender.memberId === userId ? "items-end" : "items-start"
        } flex flex-col`}
      >
        {/* 메시지 */}
        <div
          className={`${
            message.sender.memberId === userId ? "bg-blue-400" : "bg-green-400"
          } text-white rounded-tl-[22px] rounded-tr-[22px] ${
            message.sender.memberId === userId
              ? "rounded-bl-[22px]"
              : "rounded-br-[22px]"
          } px-3 py-4`}
        >
          {message.content}
        </div>

        {/* 날짜 */}
        <div className="text-[12px] text-slate-500">
          {formattedDate(message.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Message;
