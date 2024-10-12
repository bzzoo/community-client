import { z } from 'zod'
import {
  CommentSchema,
  CommentsSchema,
  FilterQuerySchema,
} from './comment.contracts'
import { InfiniteData } from '@tanstack/react-query'
import { CursorResultType } from '@/shared/api/common/response.contracts'

export type Comment = z.infer<typeof CommentSchema>
export type Comments = z.infer<typeof CommentsSchema>
export type FilterQuery = z.infer<typeof FilterQuerySchema>
export type InfiniteComments = InfiniteData<CursorResultType<typeof CommentsSchema>>;
