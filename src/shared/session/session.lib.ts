import { Session } from './session.types'
import { memberTypesDto } from '@/shared/api/auth'

export function transformUserDtoToSession(
  userDto: memberTypesDto.MemberDto,
): Session {
  return {
    id: userDto.memberId,
    nickname: userDto.profile.nickname.value,
    image: userDto.profile.profileImagePath,
  }
}
