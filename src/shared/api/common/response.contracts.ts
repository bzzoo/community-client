import { z } from 'zod';


export const CursorResultSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    nextCursor: z.number().nullable(),
    isLast: z.boolean(),
    content: itemSchema,
  });


export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    result: z.string(),
    data: dataSchema,
  });
