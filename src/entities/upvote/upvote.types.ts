import { z } from 'zod'
import { UpvoteSchema } from '@/entities/upvote/upvote.contracts'

export type Upvote = z.infer<typeof UpvoteSchema>
