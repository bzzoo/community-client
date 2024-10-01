import { z } from 'zod';

const ArticleSummaryResponse = z.object({
  id: z.number(),
  contents: z.object({
    title: z.string(),
    body: z.string(),
  }),
  type: z.string(),
  author: z.object({
    id: z.number(),
    nickname: z.string(),
    profileImagePath: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
  keywords: z.array(
    z.object({
      id: z.number().nullable(),
      name: z.string().nullable(),
    })
  ),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  viewCount: z.number(),
  commentCount: z.number(),
  upvoteCount: z.number(),
});

export const ArticleDtoSchema = z.object({
  article: ArticleSummaryResponse,
});

export const ArticlesDtoSchema = z.array(ArticleSummaryResponse);

export const PageParamsDtoSchema = z.object({
  cursor: z.string(),
  size: z.string(),
  type: z.string(),
});

export const CreateArticleDtoSchema = z.object({
  title: z.string(),
  body: z.string(),
  keywords: z.optional(z.string().array()),
});

export const UpdateArticleDtoSchema = z.object({
  title: z.string(),
  body: z.string(),
  keywords: z.optional(z.string().array()),
});
