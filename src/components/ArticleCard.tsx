"use client";

import ContentHeader from "./ContentHeader";
import { Article } from "@/types/article";
import ContentBody from "./ContentBody";
import KeywordList from "./KeywordList";
import ArticleFooter from "./ContentFooter";

const ArticleCard = ({ share }: { share: Article }) => {
  return (
    <article>
      <ContentHeader
        author={share.author}
        createdAt={share.createdAt}
        type="share"
      />
      <div className="rounded-2xl ml-8 mt-2 bg-white">
        <ContentBody share={share} />
        <KeywordList keywordList={share.keywordList} />
        <ArticleFooter commentCount={share.commentCount} />
      </div>
    </article>
  );
};

export default ArticleCard;
