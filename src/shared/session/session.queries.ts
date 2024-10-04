import { queryOptions } from '@tanstack/react-query'
import { AuthService } from '@/shared/api/auth'
import { queryClient } from '../lib/react-query'
import { transformUserDtoToSession } from './session.lib'
import { Session } from './session.types'

export class SessionQueries {
  static currentSessionQuery() {
    return queryOptions({
      queryKey: ['session', 'current-user'],
      queryFn: async () => {
        const response = await AuthService.currentMemberQuery()
        return transformUserDtoToSession(response)
      },

      initialData: () =>
        queryClient.getQueryData<Session>(['session', 'current-auth']),
      initialDataUpdatedAt: () =>
        queryClient.getQueryState(['session', 'current-auth'])
          ?.dataUpdatedAt,
    })
  }
}
