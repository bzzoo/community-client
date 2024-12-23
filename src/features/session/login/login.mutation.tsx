import {
  DefaultError,
  UseMutationOptions,
  useMutation,
} from '@tanstack/react-query'
import { AuthService, memberTypesDto } from '@/shared/api/auth'
import { sessionLib, useSessionStore } from '@/shared/session'

export function useLoginMutation(
  options?: Pick<
    UseMutationOptions<
      Awaited<ReturnType<typeof AuthService.currentMemberQuery>>,
      DefaultError,
      memberTypesDto.MemberDto,
      unknown
    >,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  >,
) {
  const {
    mutationKey = [],
    onMutate,
    onSuccess,
    onError,
    onSettled,
  } = options || {}

  return useMutation({
    mutationKey: ['session', 'login-user', ...mutationKey],

    mutationFn: async () => AuthService.currentMemberQuery(),

    onMutate,

    onSuccess: async (response, variables, context) => {
      const { setSession } = useSessionStore.getState()
      const session = sessionLib.transformUserDtoToSession(response)
      setSession(session)
      await onSuccess?.(response, variables, context)
    },

    onError,

    onSettled,
  })
}
