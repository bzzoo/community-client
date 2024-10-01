import { AxiosContracts, axiosInstance } from '@/shared/lib/axios'
import { CursorResultSchema, ApiResponseSchema } from '@/shared/api/common/response.contracts'
import { ArticleDtoSchema, ArticlesDtoSchema } from '@/shared/api/article/article.contracts'

export class ArticleService {
  static getArticles(config: {}) {

    const cursorResultSchema = CursorResultSchema(ArticlesDtoSchema);
    const apiResponseSchema = ApiResponseSchema(cursorResultSchema);

    return axiosInstance
      .get('/articles', config)
      .then(AxiosContracts.responseContract(apiResponseSchema))
  }
}
