"use client";

import React, { Fragment, useState } from "react";
import { Comment as IComment } from "@/types/article";
import UserIcon from "../../../../components/UserIcon";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { BsChatSquareDots } from "react-icons/bs";
import ReplyForm from "@/app/(main)/article/_components/ReplyForm";
import Reply from "./Reply";
import LikeButton from "@/components/LikeButton";
import ContentUserInfo from "@/components/ContentUserInfo";
import Editor from "@/components/Editor";

const Comments = ({ comment }: { comment: IComment }) => {
  const [replyClick, setReplyClick] = useState(false);
  return (
    <>
      <section className="border bg-white rounded-2xl ">
        <div className="flex flex-col gap-6 px-4 py-4">
          <div className="flex items-center gap-3 ">
            <UserIcon size={"md"} />
            <ContentUserInfo
              author={comment.author}
              createdAt={comment.createdAt}
              type={"question"}
            />
            <IoEllipsisVerticalSharp size={18} color="gray" />
          </div>
          <div>
            <Editor
              onChange={() => {}}
              readOnly={true}
              placeholder=""
              value={comment.content}
              comment={true}
            />
          </div>
          <div className="flex gap-4">
            <LikeButton />
            <button
              onClick={() => {
                setReplyClick(!replyClick);
              }}
              className="flex items-center gap-2"
            >
              <BsChatSquareDots />
              <span className="text-sm text-gray-500">
                댓글 {comment.childList ? comment.childList.length : 0}
              </span>
            </button>
          </div>
        </div>

        {replyClick && (
          <ReplyForm
            articleId={comment.articleId}
            parentId={comment.commentId}
          />
        )}

        {comment.childList?.map((reply, index) => (
          <Fragment key={index}>
            <div
              className={`p-4 flex flex-col gap-3 ${
                index === 0 ? "border-t" : ""
              }`}
            >
              <Reply reply={reply} />
            </div>
          </Fragment>
        ))}
      </section>
    </>
  );
};
export default Comments;
