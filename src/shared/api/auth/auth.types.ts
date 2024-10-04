import { z } from 'zod'
import { MemberDtoSchema } from '@/shared/api/auth/auth.contracts'

export type MemberDto = z.infer<typeof MemberDtoSchema>
