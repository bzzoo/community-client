import { z } from 'zod'

export const FilterQuerySchema = z.object({
  cursor: z.number().optional().default(-1),
  size: z.number().default(20),
  depth: z.number().default(1),
  parentId: z.number().optional(),
  articleId: z.number(),
})

export const CommentSchema = z.object({
  id: z.number(),
  articleId: z.number(),
  parentId: z.number().nullable(),
  targetType: z.string(),
  body: z.string(),
  status: z.string(),
  author: z.object({
    id: z.number(),
    nickname: z.string(),
    profileImagePath: z.string().nullable(),
    createdAt: z.coerce.date().nullable(),
    updatedAt: z.coerce.date().nullable(),
  }),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
  childCount: z.number(),
})

export const CommentsSchema = z.array(CommentSchema)
