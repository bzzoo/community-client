import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import { CommentService } from '@/shared/api/comment'
import { queryClient } from '@/shared/lib/react-query'
import { transCommentsDtoToComments } from './comment.lib'
import { Comments } from './comment.types'
import { FilterQuery, InfiniteComments } from '@/entities/comment'

export class CommentQueries {
  static readonly keys = {
    articleComments: (articleId: number) =>
      ['comment', 'initial-load', articleId.toString()] as const,

    comments: (articleId: number, parentId?: number) =>
      parentId
        ? ([
            'comment',
            'child',
            articleId.toString(),
            parentId.toString(),
          ] as const)
        : (['comment', 'parent', articleId.toString()] as const),
  }

  static commentsQuery(articleId: number) {
    return queryOptions({
      queryKey: this.keys.articleComments(articleId),
      queryFn: async () => {
        const response = await CommentService.getCommentsInit({
          articleId,
        })
        const comments = transCommentsDtoToComments(response.content)
        this.setCommentData(articleId, comments)
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
    const { size = 10, cursor = -1, depth = 1, parentId } = filter || {}
    const queryKey = this.keys.comments(articleId, parentId)

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
        this.setCommentData(articleId, comments)
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

  private static setCommentData(articleId: number, comments: Comments) {
    const existingComments =
      queryClient.getQueryData<Comments>(
        this.keys.articleComments(articleId),
      ) || []
    const mergedComments = [...existingComments, ...comments]
    queryClient.setQueryData(
      this.keys.articleComments(articleId),
      mergedComments,
    )
  }
}
