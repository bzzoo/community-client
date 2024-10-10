import {
  DefaultError,
  UseMutationOptions,
  useMutation,
} from '@tanstack/react-query'
import { CommentService } from '@/shared/api/comment'
import { queryClient } from '@/shared/lib/react-query'
import { CommentQueries, commentTypes } from '@/entities/comment'
import { transCreateCommentToCreateCommentDto } from '@/features/comment/create-comment/create-comment.lib'

export function useCreateCommentMutation(
  options?: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof CommentService.createCommentMutation>>,
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
    mutationKey: ['comment', 'create', ...mutationKey],

    mutationFn: (comment: commentTypes.Comment) => {
      const createCommentDto = transCreateCommentToCreateCommentDto({ comment })
      return CommentService.createCommentMutation(createCommentDto)
    },

    onMutate: async (variables) => {
      const { articleId } = variables
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: CommentQueries.keys.articleComments(articleId),
        }),
        onMutate?.(variables),
      ])

      const previousComments = queryClient.getQueryData(
        CommentQueries.commentsQuery(articleId).queryKey,
      )

      const updatedComments = [...Array.from(previousComments || []), variables]

      queryClient.setQueryData(
        CommentQueries.commentsQuery(articleId).queryKey,
        updatedComments,
      )

      await onMutate?.(variables)

      return { previousComments }
    },

    onSuccess,

    onError: async (error, variables, context) => {
      const { articleId } = variables
      const { previousComments } = context || {}

      queryClient.setQueryData(
        CommentQueries.commentsQuery(articleId).queryKey,
        previousComments,
      )

      await onError?.(error, variables, context)
    },

    onSettled: async (data, error, variables, context) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: CommentQueries.keys.articleComments(variables.articleId),
        }),
        onSettled?.(data, error, variables, context),
      ])
    },
  })
}