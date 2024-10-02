import { articleTypesDto } from '@/shared/api/article'
import type { Article, Articles } from './article.types'

export function transArticleDtoToArticle(
  articleDto: articleTypesDto.ArticleDto,
): Article {
  return {
    ...articleDto,
  }
}

export function transArticlesDtoToArticles(
  articlesDto: articleTypesDto.ArticlesDto,
): Articles {
  return articlesDto.map((article) => transArticleDtoToArticle(article))
}
