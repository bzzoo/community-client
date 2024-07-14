import UserIcon from "@/components/UserIcon";
import React from "react";

const ChatHeader = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 border-b px-4 py-2">
        <UserIcon size="lg" />
        <span>이름</span>
      </div>
    </div>
  );
};

export default ChatHeader;
