import { z } from 'zod'
import { UpvoteRequestDtoSchema } from '@/shared/api/upvote/upvote.contracts'

export type UpvoteRequestDto = z.infer<typeof UpvoteRequestDtoSchema>
