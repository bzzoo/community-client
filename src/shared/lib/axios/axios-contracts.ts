import { AxiosHeaders, AxiosResponse } from 'axios'
import { z, ZodType, ZodTypeAny } from 'zod'
import { AxiosValidationError } from './axios-validator-error'
import { CursorResultType, PaginatedApiResponseSchema } from '@/shared/api/common/response.contracts'

export class AxiosContracts {
  static responseContract<Data>(schema: ZodType<Data>) {
    return (response: AxiosResponse<unknown>): Data => {
      const validation = schema.safeParse(response.data)

      if (!validation.success) {
        throw new AxiosValidationError(
          response.config,
          response.request,
          response,
          validation.error.errors,
        )
      }

      return validation.data as Data
    }
  }

  static pageResponseContract<Data extends ZodTypeAny>(schema: Data) {
    return (
      response: AxiosResponse<unknown>,
    ): CursorResultType<Data> => {
      const pagedSchema = PaginatedApiResponseSchema(z.array(schema));
      const validation = pagedSchema.safeParse(response.data)

      if (!validation.success) {
        throw new AxiosValidationError(
          response.config,
          response.request,
          response,
          validation.error.errors,
        )
      }

      return validation.data.data as CursorResultType<Data>
    }
  }

  static requestContract<Data>(schema: ZodType<Data>, data: unknown) {
    const validation = schema.safeParse(data)

    if (validation.error) {
      throw new AxiosValidationError(
        { headers: new AxiosHeaders() },
        undefined,
        undefined,
        validation.error.errors,
      )
    }

    return validation.data
  }
}
