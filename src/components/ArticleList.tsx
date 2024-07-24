"use client";

import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { getArticleList } from "@/actions/article.actions";
import { ArticlePageData } from "@/types/article";

const ArticleList = () => {
  const [data, setData] = useState<ArticlePageData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getArticleList();
        setData(result);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {data?.content.map((article, index) => (
        <ArticleCard key={index} share={article} />
      ))}
    </>
  );
};

export default ArticleList;
