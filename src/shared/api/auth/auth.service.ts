import { AxiosContracts } from '@/shared/lib/axios'
import { axiosInstance } from '@/shared/lib/axios'
import { MemberDtoSchema } from './auth.contracts'

export class AuthService {
  static currentMemberQuery() {
    return axiosInstance
      .get('/members/me')
      .then(AxiosContracts.responseContract(MemberDtoSchema))
  }
}
