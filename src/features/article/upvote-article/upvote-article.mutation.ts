import {
  DefaultError,
  UseMutationOptions,
  useMutation,
} from '@tanstack/react-query'
import { UpvoteService } from '@/shared/api/upvote/upvote.service'
import { ArticleQueries, articleTypes } from '@/entities/article'
import { queryClient } from '@/shared/lib/react-query'
import { transUpvoteToCUpvoteRequestDto } from '@/entities/upvote/upvote.lib'

export function useUpvoteArticleMutation(
  options?: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof UpvoteService.upvoteMutation>>,
      DefaultError,
      articleTypes.Article,
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
    mutationKey: ['article', 'upvote', ...mutationKey],

    mutationFn: ({ id, type, author }: articleTypes.Article) => {
      const upvoteRequestDto = transUpvoteToCUpvoteRequestDto({
        opponentId: author.id,
        targetId: id,
        targetType: 'SHARE_ARTICLE',
      })
      return UpvoteService.upvoteMutation({ upvoteDto: upvoteRequestDto })
    },

    onMutate: async (article) => {
      await queryClient.cancelQueries({ queryKey: ArticleQueries.keys.root })

      const previousArticle = queryClient.getQueryData(
        ArticleQueries.articleQuery(article.id).queryKey,
      )

      const previousInfiniteArticles = queryClient.getQueriesData({
        queryKey: ArticleQueries.keys.rootInfinity,
      })

      queryClient.setQueryData(
        ArticleQueries.articleQuery(article.id).queryKey,
        article,
      )

      queryClient.setQueriesData(
        { queryKey: ArticleQueries.keys.rootInfinity },
        (infiniteArticles: articleTypes.InfiniteArticles | undefined) => {
          if (!infiniteArticles) return

          const updatedPages = infiniteArticles.pages.map((page) => {
            return {
              ...page,
              content: page.content.map((item) =>
                item.id === article.id ? { ...item, ...article } : item,
              ),
            }
          })

          return {
            ...infiniteArticles,
            pages: updatedPages,
          }
        },
      )

      await onMutate?.(article)
      return { previousArticle, previousInfiniteArticles }
    },

    onSuccess,

    onError: async (error, article, context) => {
      const { previousInfiniteArticles, previousArticle } = context || {}

      queryClient.setQueryData(
        ArticleQueries.articleQuery(article.id).queryKey,
        previousArticle,
      )

      previousInfiniteArticles?.forEach(([queryKey, data]) => {
        queryClient.setQueriesData({ queryKey }, data)
      })

      await onError?.(error, article, context)
    },

    onSettled: async (data, error, variables, context) => {
      // await Promise.all([
      //   queryClient.invalidateQueries({ queryKey: ArticleQueries.keys.root }),
      //   onSettled?.(data, error, variables, context),
      // ])
    },
  })
}
