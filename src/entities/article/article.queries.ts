import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import { ArticleService } from '@/shared/api/article/article.service'
import { queryClient } from '@/shared/lib/react-query/query-client'
import {
  transArticleDtoToArticle,
  transArticlesDtoToArticles,
} from './article.lib'
import {
  Article,
  Articles,
  FilterQuery,
  InfiniteArticles,
} from './article.types'

export class ArticleQueries {
  static readonly keys = {
    root: ['article'] as const,
    rootById: ['article', 'by-id'] as const,
    rootInfinity: ['article', 'infinite-articles'] as const,
    // generalInfinity: [
    //   'article',
    //   'infinite-articles',
    //   'general-articles',
    //   'by-filter',
    // ] as const,
  }

  static articleQuery(id: number) {
    return queryOptions({
      queryKey: [...this.keys.root, id],
      queryFn: async ({ signal }) => {
        const res = await ArticleService.getArticle(id.toString())
        return transArticleDtoToArticle(res)
      },
      initialData: () => this.getInitialData<Article>(['article', id.toString()]),
      initialDataUpdatedAt: () => this.getQueryDataUpdateAt(['article', id.toString()]),
    })
  }

  static articlesInfiniteQuery(filter?: FilterQuery) {
    const { size = 10, cursor = -1, author, tag } = filter || {}
    const queryKey = [
      ...this.keys.rootInfinity,
      'general-articles',
      'by-filter',
      { author },
      { tag },
    ].filter(Boolean) as string[]

    return infiniteQueryOptions({
      queryKey,
      queryFn: async () => {
        const response = await ArticleService.getArticles({
          params: {
            tp: 'SHARE',
            sz: size.toString(),
            cr: cursor.toString(),
            ...(author && { author }),
            ...(tag && { tag }),
          },
        })
        const articles = transArticlesDtoToArticles(response.content)
        this.setArticleData(articles)
        return {
          content: articles,
          nextCursor: response.nextCursor,
          isLast: response.isLast,
        }
      },
      initialPageParam: cursor,
      getNextPageParam: (lastPage) =>
        lastPage.isLast ? null : lastPage.nextCursor,
      // @ts-expect-error FIXME: https://github.com/TanStack/query/issues/7341
      initialData: () => this.getInitialData<InfiniteArticles>(queryKey),
      initialDataUpdatedAt: () => this.getQueryDataUpdateAt(queryKey),
    })
  }

  private static getInitialData<T>(queryKey: string[]) {
    return queryClient.getQueryData<T>(queryKey)
  }

  private static getQueryDataUpdateAt<T>(id: string[]) {
    return queryClient.getQueryState<T>(id)?.dataUpdatedAt
  }

  private static setArticleData(articles: Articles) {
    articles.forEach((article) => {
      queryClient.setQueryData([...this.keys.root, article.id], article)
    })
  }
}
