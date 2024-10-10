import { z } from 'zod'
import { InfiniteData } from '@tanstack/react-query'
import { Comments } from '@/entities/comment/comment.types'
import { FilterQuerySchema } from '@/entities/comment/comment.contracts'

export * as commentContracts from './comment.contracts'
export * as commentTypes from './comment.types'
export * as commentLib from './comment.lib'
export { CommentQueries } from './comment.queries'

export type FilterQuery = z.infer<typeof FilterQuerySchema>
export type InfiniteComments = InfiniteData<Comments, number>