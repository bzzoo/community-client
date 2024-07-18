"use client";

import React from "react";
import UserIcon from "../../../../components/UserIcon";
import useArticleForm from "@/hooks/useArticleForm";
import { handleReplySubmit } from "../../_actions/submit.action";
import QuillEditor from "../../_components/QuillEditor";

const ReplyForm = ({
  articleId,
  parentId,
}: {
  articleId: number;
  parentId: number;
}) => {
  const { formData, handleEditorChange } = useArticleForm({
    title: "",
    content: "",
    articleType: "",
    keywordList: [],
  });

  const hasContent = (htmlString: string) => {
    const text = htmlString.replace(/<[^>]*>/g, "").trim();
    return text.length > 0;
  };

  return (
    <div className="border border-x-0 border-b-0 p-4">
      <form onSubmit={() => handleReplySubmit(formData, articleId, parentId)}>
        <div className="flex items-center gap-4 bg-neutral-400/10 rounded-2xl p-4">
          <UserIcon size={"md"} />
          <div className="flex-1 ">
            <QuillEditor
              onChange={handleEditorChange}
              readOnly={false}
              placeholder="댓글을 적어주세요"
              comment={true}
              value={formData.content}
            />
          </div>
          <button
            type="submit"
            disabled={!hasContent(formData.content)}
            className={`font-semibold text-sm p-2 rounded-lg
                ${
                  hasContent(formData.content)
                    ? "text-white bg-gray-400"
                    : "text-gray-400 bg-gray-200"
                }`}
          >
            <span>등록하기</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;
