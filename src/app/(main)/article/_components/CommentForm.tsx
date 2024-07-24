"use client";

import UserIcon from "../../../../components/UserIcon";
import CommentToolBar from "./CommentToolBar";
import Editor from "@/components/Editor";
import useCommentForm from "@/hooks/useCommentForm";
import { submit } from "@/actions/comment.action";

const CommentForm = ({ articleId }: { articleId: string }) => {
  const { formData, handleEditorChange } = useCommentForm({
    content: "",
    targetId: articleId,
    targetType: "ARTICLE",
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
    <section className="border border-gray-500/30 p-4 bg-white rounded-xl">
      <div className="flex justify-center gap-4">
        <UserIcon />
        <div className="flex-1 flex-col">
          <form onSubmit={handleSubmit}>
            <div className="flex-1">
              <p className="text-m mb-2 ml-1">답변 하기</p>
              <Editor
                onChange={handleEditorChange}
                readOnly={false}
                placeholder="답변을 적어주세요"
                value={formData.content}
                comment={true}
              />
              <div className="mt-8 border-b border-gray-500/30"></div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <CommentToolBar />
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
      </div>
    </section>
  );
};

export default CommentForm;
