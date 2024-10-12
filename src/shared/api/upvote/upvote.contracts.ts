import { z } from 'zod'

const UpvoteRequest = z.object({
  opponentId: z.number(),
  targetId: z.number(),
  targetType: z.string(),
})

export const UpvoteRequestDtoSchema = UpvoteRequest