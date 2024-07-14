import Link from "next/link";
import React from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

const ChatIcon = () => {
  return (
    <Link href={"/chat/"}>
      <IoChatboxEllipsesOutline size={28} />
    </Link>
  );
};

export default ChatIcon;
