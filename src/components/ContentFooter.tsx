import React from "react";
import { BsChatSquareDots } from "react-icons/bs";

interface PostFooterProps {
  commentCount: number | null;
}

const ContentFooter = ({ commentCount }: PostFooterProps) => {
  return (
    <div className="flex items-center justify-between gap-2 p-4">
      <div className="flex gap-2 items-center">
        <BsChatSquareDots />
        <span className="text-sm text-gray-500">
          댓글 {commentCount ? commentCount : 0}
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <BsChatSquareDots />
        <span className="text-sm text-gray-500">
          조회수 {commentCount ? commentCount : 0}
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <BsChatSquareDots />
        <span className="text-sm text-gray-500">
          좋아요 {commentCount ? commentCount : 0}
        </span>
      </div>
    </div>
  );
};

export default ContentFooter;
