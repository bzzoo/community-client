import { z } from 'zod'

export const CreateCommentSchema = z.object({
  articleId: z.number(),
  body: z.string().min(10, {}),
  targetId: z.number(),
  targetType: z.string(),
})

export type CreateComment = z.infer<typeof CreateCommentSchema>