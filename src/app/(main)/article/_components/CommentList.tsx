"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import CommentItem from "./CommentItem";
import { CommentPageData, Comment as IComment } from "@/types/article";
import { getCommentList } from "@/actions/article.actions";

const CommentList = ({ articleId }: { articleId: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    CommentPageData,
    Error,
    InfiniteData<IComment[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ["comments", articleId],
    queryFn: ({ pageParam }) =>
      getCommentList({ articleId, cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: -1,
    select: (data) => ({
      pages: data.pages.map((page) => page.content),
      pageParams: data.pageParams,
    }),
  });

  const commentList = data?.pages.flat() ?? [];
  console.log(data);
  return (
    <>
      {commentList?.map((comment, index) => (
        <CommentItem key={index} comment={comment} />
      ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>Load more</button>
      )}
    </>
  );
};

export default CommentList;
