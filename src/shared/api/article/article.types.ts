import { z } from 'zod'
import {
  ArticleDtoSchema,
  ArticlesDtoSchema,
  CreateArticleDtoSchema,
  PageParamsDtoSchema,
  UpdateArticleDtoSchema,
} from './article.contracts'

export type ArticleDto = z.infer<typeof ArticleDtoSchema>
export type ArticlesDto = z.infer<typeof ArticlesDtoSchema>
export type PageParamsDto = z.infer<typeof PageParamsDtoSchema>
export type CreateArticleDto = z.infer<typeof CreateArticleDtoSchema>
export type UpdateArticleDto = z.infer<typeof UpdateArticleDtoSchema>