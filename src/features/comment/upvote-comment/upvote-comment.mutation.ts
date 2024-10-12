import {
  DefaultError,
  UseMutationOptions,
  useMutation,
} from '@tanstack/react-query'
import { UpvoteService } from '@/shared/api/upvote/upvote.service'
import { CommentQueries, commentTypes } from '@/entities/comment'
import { queryClient } from '@/shared/lib/react-query'
import { transUpvoteToCUpvoteRequestDto } from '@/entities/upvote/upvote.lib'

export function useUpvoteCommentMutation(
  options?: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof UpvoteService.upvoteMutation>>,
      DefaultError,
      commentTypes.Comment,
      unknown
    >,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  >,
) {
  const {
    mutationKey = [],
    onMutate,
    onSuccess,
    onError,
    onSettled,
  } = options || {}

  return useMutation({
    mutationKey: ['comment', 'upvote', ...mutationKey],

    mutationFn: ({ id, author, parentId }: commentTypes.Comment) => {
      const upvoteRequestDto = transUpvoteToCUpvoteRequestDto({
        opponentId: author.id,
        targetId: id,
        targetType: 'SHARE_ARTICLE',
      })
      return UpvoteService.upvoteMutation({ upvoteDto: upvoteRequestDto })
    },

    onMutate: async (comment) => {
      const { id, parentId } = comment
      const isParentComment = !parentId

      const previousComment = queryClient.getQueryData(
        CommentQueries.commentQuery(id).queryKey,
      )

      const previousInfiniteComments = queryClient.getQueriesData({
        queryKey: isParentComment
          ? CommentQueries.keys.parentComments(comment.articleId)
          : CommentQueries.keys.childComments(comment.articleId, parentId),
      })

      console.log(previousComment)
      console.log(previousInfiniteComments)

      queryClient.setQueryData(
        CommentQueries.commentQuery(comment.id).queryKey,
        comment
      );

      queryClient.setQueriesData(
        {
          queryKey: isParentComment
            ? CommentQueries.keys.parentComments(comment.articleId)
            : CommentQueries.keys.childComments(comment.articleId, parentId),
        },
        (infiniteComments: commentTypes.InfiniteComments | undefined) => {
          if (!infiniteComments) return

          const updatedPages = infiniteComments.pages.map((page) => {
            return {
              ...page,
              content: page.content.map((item) =>
                item.id === comment.id ? { ...item, ...comment } : item,
              ),
            }
          })

          return {
            ...infiniteComments,
            pages: updatedPages,
          }
        },
      )

      await onMutate?.(comment)
      return { previousComment, previousInfiniteComments }
    },

    onSuccess,

    onError: async (error, comment, context) => {
      const { previousInfiniteComments, previousComment } = context || {}

      queryClient.setQueryData(
        CommentQueries.commentQuery(comment.id).queryKey,
        previousComment,
      )

      previousInfiniteComments?.forEach(([queryKey, data]) => {
        queryClient.setQueriesData({ queryKey }, data)
      })

      await onError?.(error, comment, context)
    },

    onSettled: async (data, error, variables, context) => {
      // await Promise.all([
      //   queryClient.invalidateQueries({
      //     queryKey: CommentQueries.keys.root,
      //   }),
      //   onSettled?.(data, error, variables, context),
      // ])
    },
  })
}
