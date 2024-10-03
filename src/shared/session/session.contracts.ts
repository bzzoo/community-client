import { z } from 'zod'

export const SessionSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  image: z.string().nullable(),
})
