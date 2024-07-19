import { Keyword } from "@/types/article";
import React from "react";
import { BsChatSquareDots } from "react-icons/bs";

interface PostFooterProps {
  keywordList: Keyword[];
  commentCount: number | null;
}

const ArticleFooter = ({ keywordList, commentCount }: PostFooterProps) => {
  return (
    <div className="flex items-center justify-end gap-2 p-4 mt-2 mx-2">
      <div className="flex-1 flex gap-2">
        {keywordList?.map((keyword) => (
          <div className="text-gray text-xs border border-solid rounded-3xl bg-white p-2">
            #{keyword.keywordName}
          </div>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <BsChatSquareDots />
        <span className="text-sm text-gray-500">
          댓글 {commentCount ? commentCount : 0}
        </span>
      </div>
    </div>
  );
};

export default ArticleFooter;
