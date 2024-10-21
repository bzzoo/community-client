import { z } from 'zod'
import {
  ArticleSchema,
  ArticlesSchema,
  FilterQuerySchema,
} from './article.contracts'
import { InfiniteData } from '@tanstack/react-query'
import { CursorResultType } from '@/shared/api/common/response.contracts'

export type Article = z.infer<typeof ArticleSchema>
export type Articles = z.infer<typeof ArticlesSchema>
export type FilterQuery = z.infer<typeof FilterQuerySchema>
export type InfiniteArticles = InfiniteData<
  CursorResultType<typeof ArticlesSchema>
>
