// "use client";

// import getCommentList from "@/app/(main)/_lib/getCommentList";
// import { CommentPageData } from "@/types";
// import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
// import React, { Fragment } from "react";
// import Comments from "./Comments";
// type Props = {
//   articleId: string;
// };
// const CommentList = ({ articleId }: Props) => {
//   const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
//     CommentPageData,
//     Object,
//     InfiniteData<CommentPageData>,
//     [_1: string, _2: string, _3: string]
//   >({
//     queryKey: ["articles", articleId, "comments"],
//     queryFn: getCommentList,
//     initialPageParam: -1,
//     getNextPageParam: (lastPage) => {
//       lastPage.isLast ? null : lastPage.nextCursor;
//     },
//     staleTime: 60 * 1000,
//     gcTime: 300 * 1000,
//   });

//   return (
//     <div>
//       {data?.pages.map((page, i) => (
//         <Fragment key={i}>
//           {page.content?.map((comment, commentId) => (
//             <Comments key={commentId} comment={comment} />
//           ))}
//         </Fragment>
//       ))}
//       {hasNextPage && (
//         <button onClick={() => fetchNextPage()}>Load more</button>
//       )}
//     </div>
//   );
// };

// export default CommentList;
