import React from "react";
import { Comment as IComment } from "@/types";
import UserIcon from "../../../../components/UserIcon";
import ContentUserInfo from "../../_components/ContentUserInfo";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import LikeButton from "../../_components/LikeButton";
import QuillEditor from "../../_components/QuillEditor";

const Reply = ({ reply }: { reply: IComment }) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <UserIcon size={"smd"} />
        <ContentUserInfo
          author={reply.author}
          createdAt={reply.createdAt}
          type={"question"}
        />
        <IoEllipsisVerticalSharp size={18} color="gray" />
      </div>

      <div className="flex flex-col gap-4 ml-12">
        <div className="bg-neutral-400/10 p-4 rounded-md">
          <QuillEditor
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
