import React from "react";
import { Comment as IComment } from "@/types/article";

import { IoEllipsisVerticalSharp } from "react-icons/io5";
import UserIcon from "../../../../components/UserIcon";
import ContentUserInfo from "@/components/ContentUserInfo";
import Editor from "@/components/Editor";
import LikeButton from "@/components/LikeButton";

const Reply = ({ reply }: { reply: IComment }) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <UserIcon size={"sm"} />
        <ContentUserInfo
          author={reply.author}
          createdAt={reply.createdAt}
          type={"answer"}
        />
        <IoEllipsisVerticalSharp size={18} color="gray" />
      </div>

      <div className="flex flex-col gap-2 ml-12">
        <div className="bg-neutral-400/10 p-2 rounded-md">
          <Editor
            onChange={() => {}}
            readOnly={true}
            placeholder=""
            value={reply.content}
            comment={true}
          />
        </div>

        <div className="flex justify-end">
          <LikeButton />
        </div>
      </div>
    </>
  );
};

export default Reply;
