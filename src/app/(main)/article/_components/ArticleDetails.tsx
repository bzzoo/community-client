"use client";
import { generateArticle } from "@/actions/article.actions";
import ContentHeader from "@/components/ContentHeader";
import ArticleKeyword from "@/components/ArticleKeyword";
import React from "react";
import Editor from "@/components/Editor";

type Props = {
  articleId: string;
};

const ArticleDetails = ({ articleId }: Props) => {
  const article = generateArticle();
  return (
    <>
      <article className="flex flex-col bg-white p-4 rounded-2xl border gap-3">
        <ContentHeader
          author={article.memberInfo}
          createdAt={article.createdAt}
          type="share"
        />
        <h1 className="block break-all text-lg font-semibold leading-7 sm:text-3xl sm:leading-10">
          {article.title}
        </h1>
        <div className="text-sm text-gray-700 sm:my-8 sm:text-base">
          <Editor
            onChange={() => {}}
            readOnly={true}
            value={article.content}
            comment={false}
            placeholder={""}
          />
        </div>
        <ul className="max-w-full overflow-x-auto flex flex-row gap-2">
          {article.keywordList?.map((keyword, index) => (
            <ArticleKeyword key={index} keyword={keyword} />
          ))}
        </ul>
        <button>훌륭해요 {article.upvoteCount}</button>
      </article>
      <div className="p-2 text-slate-600 text-xl">
        댓글 {article.commentCount}
      </div>
    </>
  );
};

export default ArticleDetails;
