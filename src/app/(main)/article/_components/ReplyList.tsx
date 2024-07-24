import React from "react";
import { Comment as IComment } from "@/types/article";
import Reply from "./Reply";

const ReplyList = ({ replyList }: { replyList: IComment[] }) => {
  return (
    <>
      {replyList.map((reply, index) => (
        <div
          key={index}
          className={`p-4 flex flex-col gap-3 ${index === 0 ? "border-t" : ""}`}
        >
          <Reply reply={reply} />
        </div>
      ))}
    </>
  );
};

export default ReplyList;
