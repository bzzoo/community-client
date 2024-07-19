import React, { Fragment } from "react";

import Share from "./Share";
import { generateArticlePageData } from "@/actions/article.actions";

const AllArticleList = () => {
  const data = generateArticlePageData();
  return (
    <>
      {data.content.map((article, i) => (
        <Fragment key={i}>
          <div key={article.articleId}>
            {article.articleType === "SHARE" ? (
              <Share share={article} />
            ) : (
              <Share share={article} />
            )}
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default AllArticleList;
