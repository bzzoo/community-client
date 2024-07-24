"use server";

import axiosInstance from "@/libs/axiosInstance";
import axiosInstanceWithoutHeaders from "@/libs/axiosInstanceWithoutHeaders ";
import { Article, ArticlePageData, CommentPageData } from "@/types/article";

export const getArticleList = async (): Promise<ArticlePageData> => {
  const res = await axiosInstance.get("/api/articles");
  return res.data as ArticlePageData;
};

export const getArticle = async ({
  articleId,
}: {
  articleId: string;
}): Promise<Article> => {
  const res = await axiosInstance.get(`/api/articles/${articleId}`);
  return res.data as Article;
};

export const getCommentList = async ({
  articleId,
  cursor = -1,
}: {
  articleId: string;
  cursor?: number;
}): Promise<CommentPageData> => {
  const res = await axiosInstance.get(`/api/comments/${articleId}`, {
    params: {
      c: cursor,
    },
  });
  return res.data as CommentPageData;
};
