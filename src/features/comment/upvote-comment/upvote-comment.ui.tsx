'use client'

import { useUpvoteCommentMutation } from './upvote-comment.mutation'
import { commentTypes } from '@/entities/comment'
import { Button } from '@/shared/ui/button'
import { IoHeart } from 'react-icons/io5'

type UpvotedCommentButtonProps = {
  comment: commentTypes.Comment
}

export function UpvoteCommentButton(props: UpvotedCommentButtonProps) {
  const { comment } = props

  const { mutate } = useUpvoteCommentMutation({
    mutationKey: ['brief', comment.id],
  })

  const handleUpvote = () => {
    const upvotedComment = upvote(comment)
    mutate(upvotedComment)
  }

  return (
    <Button
      color="primary"
      variant="outline"
      onClick={handleUpvote}
    >
      <IoHeart size={16} />
      {comment.upvoteCount}
    </Button>
  )
}

function upvote(comment: commentTypes.Comment): commentTypes.Comment {
  return {
    ...comment,
    upvoteCount: comment.upvoteCount + 1,
  }
}