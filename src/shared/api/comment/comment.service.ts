import {
  CommentDtoSchema,
  CommentsDtoSchema,
  CreateCommentDtoSchema,
} from './comment.contracts'
import { CommentsParamsDto, CreateCommentDto } from './comment.types'
import { AxiosContracts, axiosInstance } from '@/shared/lib/axios'

export class CommentService {
  static getCommentsInit(config: { articleId: number }) {
    console.log(config.articleId)
    return axiosInstance
      .get(`/v1/comments`, {
        params: {
          aid: config.articleId,
        },
      })
      .then(AxiosContracts.pageResponseContract(CommentsDtoSchema))
  }

  static getComments(config: { slug: number, params: CommentsParamsDto }) {
    return axiosInstance
      .get(`/v1/comments/more-button`, config)
      .then(AxiosContracts.pageResponseContract(CommentsDtoSchema))
  }

  static createCommentMutation(data: CreateCommentDto) {
    const createCommentDto = AxiosContracts.requestContract(
      CreateCommentDtoSchema,
      data,
    )
    return axiosInstance
      .post(`/comments`, createCommentDto)
      .then(AxiosContracts.responseContract(CommentDtoSchema))
  }

  static deleteCommentMutation(slug: string) {
    return axiosInstance.delete(`/comments/${slug}`)
  }
}
