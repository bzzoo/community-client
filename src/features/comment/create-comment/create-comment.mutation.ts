'use client'

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

    onMutate: async (newComment) => {
      const { articleId, parentId } = newComment

      await queryClient.cancelQueries({ queryKey: CommentQueries.keys.root })

      const previousData = {
        comments: queryClient.getQueryData<commentTypes.InfiniteComments>(
          CommentQueries.keys.parentComments(articleId),
        ),
        childComments: parentId
          ? queryClient.getQueryData<commentTypes.InfiniteComments>(
              CommentQueries.keys.childComments(articleId, parentId),
            )
          : undefined,
        parentComment: parentId
          ? queryClient.getQueryData<commentTypes.Comment>([
              ...CommentQueries.keys.root,
              parentId,
            ])
          : undefined,
      }

      if (parentId) {
        queryClient.setQueryData(
          CommentQueries.keys.childComments(articleId, parentId),
          (old: commentTypes.InfiniteComments | undefined) => {
            if (!old)
              return { pages: [{ content: [newComment] }], pageParams: [] }
            return {
              ...old,
              pages: [
                {
                  ...old.pages[0],
                  content: [...old.pages[0].content, newComment],
                },
                ...old.pages.slice(1),
              ],
            }
          },
        )

        // Update parent comment's childCount
        queryClient.setQueryData(
          [...CommentQueries.keys.root, parentId],
          (old: commentTypes.Comment | undefined) => {
            if (!old) return old
            return { ...old, childCount: (old.childCount || 0) + 1 }
          },
        )
      } else {
        // Update parent comments
        queryClient.setQueryData(
          CommentQueries.keys.parentComments(articleId),
          (old: commentTypes.InfiniteComments | undefined) => {
            if (!old)
              return { pages: [{ content: [newComment] }], pageParams: [] }
            return {
              ...old,
              pages: [
                {
                  ...old.pages[0],
                  content: [...old.pages[0].content, newComment],
                },
                ...old.pages.slice(1),
              ],
            }
          },
        )
      }

      await onMutate?.(newComment)

      return previousData
    },

    onError: (err, newComment, context) => {
      const { articleId, parentId } = newComment
      if (context) {
        queryClient.setQueryData(
          CommentQueries.keys.parentComments(articleId),
          context.comments,
        )
        if (parentId) {
          queryClient.setQueryData(
            CommentQueries.keys.childComments(articleId, parentId),
            context.childComments,
          )
          queryClient.setQueryData(
            [...CommentQueries.keys.root, parentId],
            context.parentComment,
          )
        }
      }
      onError?.(err, newComment, context)
    },

    onSuccess: async (data, variables, context) => {
      await onSuccess?.(data, variables, context)
    },

    onSettled: async (data, error, variables, context) => {
      const { articleId, parentId } = variables
      await queryClient.invalidateQueries({
        queryKey: CommentQueries.keys.parentComments(articleId),
      })
      if (parentId) {
        await queryClient.invalidateQueries({
          queryKey: CommentQueries.keys.childComments(articleId, parentId),
        })
        await queryClient.invalidateQueries({
          queryKey: [...CommentQueries.keys.root, parentId],
        })
      }
      await onSettled?.(data, error, variables, context)
    },
  })
}
