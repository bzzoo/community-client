import { z } from 'zod'

const CommentDto = z.object({
  id: z.number(),
  articleId: z.number(),
  parentId: z.number().nullable(),
  body: z.string(),
  status: z.string(),
  targetType: z.string(),
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
  upvoteCount: z.number().default(0)
})

export const CommentDtoSchema = CommentDto
export const CommentsDtoSchema = z.array(CommentDto)
export const PageParamsDtoSchema = z.object({
  cr: z.number().default(-1),
  sz: z.number().default(10),
})
export const FilterParamDtoSchema = z.object({
  dp: z.number().default(1),
  pid: z.number().optional(),
  aid: z.number(),
})

export const CommentsParamsDtoSchema = z.intersection(
  PageParamsDtoSchema,
  FilterParamDtoSchema,
)
export const CreateCommentDtoSchema = z.object({
  articleId: z.number(),
  body: z.string().min(10, {}),
  targetId: z.number(),
  targetType: z.string(),
})
export const UpdateCommentDtoSchema = z.object({
  body: z.string().min(10, {}),
})
