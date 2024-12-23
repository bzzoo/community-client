import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import { CommentService } from '@/shared/api/comment'
import { queryClient } from '@/shared/lib/react-query'
import { Comments, Comment } from './comment.types'
import { FilterQuery, InfiniteComments } from '@/entities/comment'
import { transCommentDtoToComment, transCommentsDtoToComments } from '@/entities/comment/comment.lib'

export class CommentQueries {
  static readonly keys = {
    root: ['comment'] as const,

    singleComment: ['comment', 'single'] as const,

    articleComments: (articleId: number) =>
      ['comment', 'initial-load', articleId.toString()] as const,

    parentComments: (articleId: number) =>
      ['comment', 'parent', 'infinite', articleId.toString()] as const,

    childComments: (articleId: number, parentId: number) =>
      [
        'comment',
        'child',
        'infinite',
        articleId.toString(),
        parentId.toString(),
      ] as const,
  }

  static commentQuery(commentId: number) {
    return queryOptions({
      queryKey:[...this.keys.root, commentId],
      queryFn: async ({ signal }) => {
        const res = await CommentService.getComment({commentId})
        return transCommentDtoToComment(res)
      },
      initialData: () => this.getInitialData<Comment>(['comment', commentId.toString()]),
      initialDataUpdatedAt: () => this.getQueryDataUpdateAt(['comment', commentId.toString()]),
    })
  }

  static commentsQuery(articleId: number) {
    return queryOptions({
      queryKey: this.keys.articleComments(articleId),
      queryFn: async () => {
        const response = await CommentService.getCommentsInit({
          articleId,
        })
        const comments = transCommentsDtoToComments(response.content)
        this.setCommentData(comments)
        return comments
      },
      initialData: () =>
        queryClient.getQueryData<Comments>(
          this.keys.articleComments(articleId),
        ),
      initialDataUpdatedAt: () =>
        queryClient.getQueryState(this.keys.articleComments(articleId))
          ?.dataUpdatedAt,
    })
  }

  static commentsInfiniteQuery(articleId: number, filter?: FilterQuery) {
    const { size = 10, cursor = -1, depth, parentId } = filter || {}
    const queryKey = parentId
      ? this.keys.childComments(articleId, parentId)
      : this.keys.parentComments(articleId)

    return infiniteQueryOptions({
      queryKey,
      queryFn: async () => {
        const response = await CommentService.getComments({
          slug: articleId,
          params: {
            sz: size,
            cr: cursor,
            pid: parentId,
            aid: articleId,
            dp: parentId ? 2 : 1,
          },
        })
        const comments = transCommentsDtoToComments(response.content)
        this.setCommentData(comments)
        return {
          content: comments,
          nextCursor: response.nextCursor,
          isLast: response.isLast,
        }
      },
      initialPageParam: cursor,
      getNextPageParam: (lastPage) =>
        lastPage.isLast ? null : lastPage.nextCursor,
      // @ts-expect-error FIXME: https://github.com/TanStack/query/issues/7341
      initialData: () => this.getInitialData<InfiniteComments>(queryKey),
      initialDataUpdatedAt: () => this.getQueryDataUpdateAt(queryKey),
    })
  }

  private static getInitialData<T>(queryKey: readonly string[]) {
    return queryClient.getQueryData<T>(queryKey)
  }

  private static getQueryDataUpdateAt(queryKey: readonly string[]) {
    return queryClient.getQueryState(queryKey)?.dataUpdatedAt
  }

  private static setCommentData(comments: Comments) {
    comments.forEach((comment) => {
      queryClient.setQueryData([...this.keys.root, comment.id], comment)
    })
  }
}
