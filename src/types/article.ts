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
  authorInfo: {};
  createdAt: Date;
  updatedAt: Date;
}

export interface Keyword {
  keywordId: number;
  keywordName: string;
}

export interface Comment {
  articleId: number;
  commentId: number;
  parentId: number;
  content: string;
  author: MemberInfo;
  childList: Comment[];
  createdAt: Date;
  updatedAt: Date;
  isVote: Boolean;
}
