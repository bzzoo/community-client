"use client";

import React from "react";
import Editor from "@/components/Editor";
import { Article } from "@/types/article";
import KeywordList from "@/components/KeywordList";

const ArticleDetails = ({ article }: { article: Article }) => {
  return (
    <article className="flex flex-col bg-white p-4 rounded-2xl border gap-3">
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
        <KeywordList keywordList={article.keywordList} />
      </ul>
    </article>
  );
};

export default ArticleDetails;
