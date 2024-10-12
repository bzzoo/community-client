import { upvoteTypes } from '@/entities/upvote/index'
import { upvoteTypesDto } from '@/shared/api/upvote'

export function transUpvoteToCUpvoteRequestDto(
  upvote: upvoteTypes.Upvote,
): upvoteTypesDto.UpvoteRequestDto {
  return {
    ...upvote,
  }
}