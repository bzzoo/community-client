import { z } from 'zod'
import {
  CommentDtoSchema,
  CommentsDtoSchema,
  CreateCommentDtoSchema, UpdateCommentDtoSchema,
} from './comment.contracts'
import { CommentsParamsDtoSchema, PageParamsDtoSchema } from './comment.contracts'

export type CommentDto = z.infer<typeof CommentDtoSchema>
export type CommentsDto = z.infer<typeof CommentsDtoSchema>
export type PageParamsDto = z.infer<typeof PageParamsDtoSchema>
export type CommentsParamsDto = z.infer<typeof CommentsParamsDtoSchema>
export type CreateCommentDto = z.infer<typeof CreateCommentDtoSchema>
export type UpdateCommentDto = z.infer<typeof UpdateCommentDtoSchema>
