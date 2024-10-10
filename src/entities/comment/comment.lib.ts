import { commentTypesDto } from '@/shared/api/comment'
import { Comment, Comments } from './comment.types'

export function transCommentDtoToComment(
  commentDto: commentTypesDto.CommentDto,
): Comment {
  return {
    ...commentDto,
  }
}

export function transCommentsDtoToComments(
  commentsDto: commentTypesDto.CommentsDto,
): Comments {
  return commentsDto.map((comment) => transCommentDtoToComment(comment))
}

export function separateParentAndChildComments(comments: Comments) {
  const parents = comments.filter((comment) => comment.parentId === null)
  const children = comments.reduce((acc: { [key: number]: Comments }, comment) => {
    if (comment.parentId !== null) {
      acc[comment.parentId] = acc[comment.parentId] || []
      acc[comment.parentId].push(comment)
    }
    return acc
  }, {})

  return { parents, children }
}