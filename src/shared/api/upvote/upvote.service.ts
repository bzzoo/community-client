import { AxiosContracts, axiosInstance } from '@/shared/lib/axios'
import { UpvoteRequestDto } from './upvote.types'
import { UpvoteRequestDtoSchema } from './upvote.contracts'

export class UpvoteService {
  static upvoteMutation(data: { upvoteDto: UpvoteRequestDto }) {
    const upvoteRequestDto = AxiosContracts.requestContract(
      UpvoteRequestDtoSchema,
      data.upvoteDto,
    )
    return axiosInstance.post(`/upvotes`, upvoteRequestDto)
  }
}
