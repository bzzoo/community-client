"use server";

import axiosInstance from "@/libs/axiosInstance";
import {
  Article,
  ArticleFormData,
  ArticlePageData,
  CommentPageData,
} from "@/types/article";
import { revalidatePath } from "next/cache";

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

export const createArticle = async (formData: ArticleFormData) => {
  try {
    if (!formData.title.trim()) {
      return { success: false, message: "제목을 입력해주세요." };
    }
    if (!formData.content.trim()) {
      return { success: false, message: "내용을 입력해주세요." };
    }
    if (formData.keywordList.length === 0) {
      return { success: false, message: "최소 하나의 키워드를 선택해주세요." };
    }

    const res = await axiosInstance.post("/api/articles/new", formData);

    if (res.status === 200) {
      revalidatePath("/articles");
      return {
        success: true,
        message: "게시글이 성공적으로 등록되었습니다.",
        data: res.data,
      };
    } else {
      return {
        success: false,
        message: "게시글 등록에 실패했습니다. 다시 시도해 주세요.",
      };
    }
  } catch (error) {
    console.error("Submit error:", error);
    return {
      success: false,
      message: "게시글 등록 중 오류가 발생했습니다. 다시 시도해 주세요.",
    };
  }
};
