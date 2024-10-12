import { z } from 'zod'

export const UpvoteSchema = z.object({
  opponentId: z.number(),
  targetId: z.number(),
  targetType: z.string(),
})
