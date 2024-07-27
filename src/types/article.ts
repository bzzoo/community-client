import { MemberInfo } from "./member";

export interface ArticlePageData {
  tatalElements: number;
  isLast: boolean;
  nextCursor: number | null;
  content: Article[];
}

export interface CommentPageData {
  tatalElements: number;
  isLast: boolean;
  nextCursor: number | null;
  content: Comment[];
}

export interface Article {
  articleId: number;
  title: string;
  content: string;
  articleType: "SHARE" | "QUESTION";
  upvoteCount: number | null;
  commentCount: number | null;
  keywordList: Keyword[];
  author: MemberInfo;
  createdAt: Date;
  updatedAt: Date;
}

export interface Keyword {
  keywordId: number;
  keywordName: string;
}

export interface Comment {
  articleId: string;
  commentId: string;
  parentId: number;
  content: string;
  author: MemberInfo;
  childCommentList: Comment[];
  createdAt: Date;
  updatedAt: Date;
  isVote: Boolean;
}

export interface ArticleFormData {
  title: string;
  content: string;
  articleType: string;
  keywordList: string[];
}
