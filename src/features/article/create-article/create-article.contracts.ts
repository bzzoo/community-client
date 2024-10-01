import { z } from 'zod'

export const CreateArticleSchema = z.object({
  title: z.string().min(10, {
    message: '제목을 10자 이상 작성해주세요/',
  }).max(40,{
    message: '제목을 40자 이하 작성해주세요/',
  }),
  body: z.string().min(10, {
    message: '내용을 10자 이상 작성해주세요.',
  }),
  keywords: z.array(z.string()).max(5, {
    message: '키워드는 최대 5개 포함시킬 수 있습니다.'
  }).default([]),
  type: z.enum(['QUESTION', 'SHARE']),
})

export type CreateArticle = z.infer<typeof CreateArticleSchema>
