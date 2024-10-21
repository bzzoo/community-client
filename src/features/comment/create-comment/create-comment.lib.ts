import { commentTypesDto } from '@/shared/api/comment'
import { commentTypes } from '@/entities/comment'
import { CreateComment } from '@/features/comment/create-comment/create-comment.contracts'

export function transCreateCommentToComment(config: {
  createComment: CreateComment
}): commentTypes.Comment {
  const { createComment } = config

  return {
    id: Infinity,
    articleId: createComment.articleId,
    parentId:
      createComment.targetType === 'COMMENT' ? createComment.targetId : null,
    targetType: createComment.targetType,
    status: 'STEADY',
    author: {
      id: -1,
      nickname: 'TemporaryNickname',
      profileImagePath: '/path/to/temp/profile.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    body: createComment.body,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    childCount: 0,
    upvoteCount: 0,
  }
}

export function transCreateCommentToCreateCommentDto(config: {
  comment: commentTypes.Comment
}): commentTypesDto.CreateCommentDto {
  const { comment } = config

  return {
    articleId: comment.articleId,
    body: comment.body,
    targetId: comment.parentId ?? comment.articleId,
    targetType: comment.targetType,
  }
}
