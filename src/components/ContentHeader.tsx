import React from "react";

import { IoEllipsisVerticalSharp } from "react-icons/io5";

import UserIcon from "./UserIcon";
import { MemberInfo } from "@/types/member";
import ContentUserInfo from "./ContentUserInfo";

interface ContentHeaderProps {
  author: MemberInfo;
  createdAt: Date;
  type: "question" | "share";
}

const ContentHeader = ({ author, createdAt, type }: ContentHeaderProps) => {
  return (
    <div className="flex items-center gap-3">
      <UserIcon size={"md"} />
      <ContentUserInfo author={author} createdAt={createdAt} type={type} />
      <IoEllipsisVerticalSharp size={18} color="gray" />
    </div>
  );
};

export default ContentHeader;
