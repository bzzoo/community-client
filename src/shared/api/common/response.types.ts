import { z } from 'zod';
import { CursorResultSchema, ApiResponseSchema } from '@/shared/api/common/response.contracts';

// 타입 정의
export type CursorResultType<T extends z.ZodTypeAny> = z.infer<ReturnType<typeof CursorResultSchema<T>>>;
export type ApiResponseType<T extends z.ZodTypeAny> = z.infer<ReturnType<typeof ApiResponseSchema<T>>>;