import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query'
import { ArticleService } from '@/shared/api/article'
import { queryClient } from '@/shared/lib/react-query/query-client'
import { transCreateArticleToCreateArticleDto } from '@/features/article/create-article/create-artice.lib'
import { transArticleDtoToArticle } from '@/entities/article/article.lib'
import { ArticleQueries, articleTypes } from '@/entities/article'

export function useCreateArticleMutation(
  options?: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof ArticleService.createArticleMutation>>,
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
    mutationKey: ['article', 'create', ...mutationKey],

    mutationFn: (article: articleTypes.Article) => {
      const createArticleDto = transCreateArticleToCreateArticleDto(article)
      return ArticleService.createArticleMutation({ createArticleDto })
    },

    onMutate: async (variables) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ArticleQueries.keys.root }),
        onMutate?.(variables),
      ])
    },

    onSuccess: async (response, variables, context) => {
      //FIXME :: 세션 작성되면 서버 호출하지 않고 바로 캐싱 OR 서버 리턴 수정
      const id = response!!
      const articleDetail = await ArticleService.getArticle(id)
      const article = transArticleDtoToArticle(articleDetail)
      queryClient.setQueryData(
        ArticleQueries.articleQuery(id).queryKey,
        article,
      )

      await onSuccess?.(response, variables, context)
    },

    onError,

    onSettled: async (response, error, variables, context) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ArticleQueries.keys.root }),
        onSettled?.(response, error, variables, context),
      ])
    },
  })
}
