import { z } from 'zod'

//FIXME 임시 API 수정
export const MemberDtoSchema = z.object({
  memberId: z.number(),
  profile: z.object({
    email: z.string().nullable(),
    nickname: z.object({
      value: z.string(),
    }),
    profileImagePath: z
      .string()
      .nullable()
      .transform((val) => (val === '' ? null : val)),
    memberSetting: z.object({
      chatPeePoint: z.number(),
      chatRefusal: z.boolean(),
    }),
    position: z.string().transform((val) => (val === '' ? null : val)),
  }),
  social: z.object({
    socialId: z.string(),
    memberSocialType: z.string(),
  }),
  grade: z.object({
    value: z.number(),
    tier: z.string().transform((val) => (val === '' ? null : val)),
  }),
  status: z.string().transform((val) => (val === '' ? null : val)),
})
