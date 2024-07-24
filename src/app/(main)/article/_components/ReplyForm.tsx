"use client";

import React from "react";
import UserIcon from "../../../../components/UserIcon";
import Editor from "@/components/Editor";
import useCommentForm from "@/hooks/useCommentForm";
import { submit } from "@/actions/comment.action";

const ReplyForm = ({
  articleId,
  parentId,
}: {
  articleId: string;
  parentId: string;
}) => {
  const { formData, handleEditorChange } = useCommentForm({
    content: "",
    targetId: parentId,
    targetType: "COMMENT",
  });

  const hasContent = (htmlString: string) => {
    const text = htmlString.replace(/<[^>]*>/g, "").trim();
    return text.length > 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasContent(formData.content)) {
      alert("댓글을 입력해주세요.");
      return;
    }

    try {
      await submit(formData);
      console.log("댓글이 성공적으로 제출되었습니다!");
    } catch (error) {
      console.error("댓글 제출 중 오류 발생:", error);
    }
  };

  return (
    <div className="border border-x-0 border-b-0 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-4 bg-neutral-400/10 rounded-2xl p-4">
          <UserIcon size={"md"} />
          <div className="flex-1 ">
            <Editor
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
