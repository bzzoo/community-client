import { z } from 'zod'

export const FilterQuerySchema = z.object({
  cursor: z.number().min(0).nullable(),
  size: z.number().min(1).nullable(),
  tag: z.string().nullable(),
  authorId: z.number().nullable(),
})

export const ArticleSchema = z.object({
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

export const ArticlesSchema = z.array(ArticleSchema)
