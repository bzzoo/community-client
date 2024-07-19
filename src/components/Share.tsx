"use client";

import React, { useState } from "react";

import Link from "next/link";
import { cn } from "@/libs/utils";
import ContentHeader from "./ContentHeader";
import { Article } from "@/types/article";
import Editor from "./Editor";
import ArticleFooter from "./QuestionFooter";

const Share = ({ share }: { share: Article }) => {
  const [expand, setExpand] = useState(false);

  return (
    <article>
      <ContentHeader
        author={share.memberInfo}
        createdAt={share.createdAt}
        type="share"
      />
      <div className="rounded-3xl ml-8 mt-2 bg-white ">
        <Link href={`/article/${share.articleId}`}>
          <div
            className={cn(
              "overflow-y-hidden flex flex-col items-start p-4 gap-2 relative",
              !expand && "max-h-[400px]"
            )}
          >
            <p className="font-bold text-[1.5rem] mb-4">{share.title}</p>
            <Editor
              onChange={() => {}}
              readOnly={true}
              value={share.content}
              comment={false}
              placeholder={""}
            />
            {!expand && (
              <button
                onClick={() => {
                  setExpand(true);
                }}
                className="absolute bottom-0 left-0 right-0 trans bg-gradient-to-t from-white z-0 w-full block h-1/5"
              ></button>
            )}
          </div>
        </Link>
        <ArticleFooter
          keywordList={share.keywordList}
          commentCount={share.commentCount}
        />
      </div>
    </article>
  );
};

export default Share;
