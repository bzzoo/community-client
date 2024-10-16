import { z } from 'zod'

const ArticleSummaryResponse = z.object({
  id: z.number(),
  contents: z.object({
    title: z.string(),
    body: z.string(),
  }),
  type: z.string(),
  author: z.object({
    id: z.number(),
    nickname: z.string(),
    profileImagePath: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
  keywords: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  viewCount: z.number(),
  commentCount: z.number(),
  upvoteCount: z.number(),
})

export const ArticleDtoSchema = ArticleSummaryResponse

export const ArticlesDtoSchema = z.array(ArticleSummaryResponse)

export const PageParamsDtoSchema = z.object({
  cr: z.number(),
  sz: z.number(),
  tp: z.string(),
})

export const FilterParamDtoSchema = z.object({
  tag: z.string().optional(),
  author: z.string().optional(),
  pop: z.boolean().optional(),
})

export const ArticlesParamsDtoSchema = z.intersection(
  PageParamsDtoSchema,
  FilterParamDtoSchema,
)

export const CreateArticleDtoSchema = z.object({
  title: z.string(),
  body: z.string(),
  type: z.string(),
  keywords: z.array(z.string()).max(5).default([]),
})

export const UpdateArticleDtoSchema = z.object({
  title: z.string(),
  body: z.string(),
  keywords: z.array(z.string()).max(5).nullable().default([]),
})
