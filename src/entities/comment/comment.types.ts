import { z } from 'zod'
import {
  CommentSchema,
  CommentsSchema,
  FilterQuerySchema,
} from './comment.contracts'

export type Comment = z.infer<typeof CommentSchema>
export type Comments = z.infer<typeof CommentsSchema>
export type FilterQuery = z.infer<typeof FilterQuerySchema>
