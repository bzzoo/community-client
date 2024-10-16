import { z } from 'zod'
import {
  ArticleDtoSchema,
  ArticlesDtoSchema,
  CreateArticleDtoSchema,
} from './article.contracts'
import { AxiosContracts, axiosInstance } from '@/shared/lib/axios'
import { ArticlesParamsDto, CreateArticleDto } from './article.types'

export class ArticleService {
  static getArticle(id: string) {
    return axiosInstance
      .get(`/articles/${id}`)
      .then(AxiosContracts.responseContract(ArticleDtoSchema))
  }

  static getArticles(config: { params: ArticlesParamsDto }) {
    return axiosInstance
      .get('/articles', config)
      .then(AxiosContracts.pageResponseContract(ArticlesDtoSchema))
  }

  static createArticleMutation(data: { createArticleDto: CreateArticleDto }) {
    const createArticleDto = AxiosContracts.requestContract(
      CreateArticleDtoSchema,
      data.createArticleDto,
    )
    return axiosInstance
      .post('/articles', createArticleDto)
      .then(AxiosContracts.responseContract(z.null()))
  }

  static deleteArticleMutation(id: string) {
    return axiosInstance.put(`/articles/${id}`)
  }

  static updateArticleMutation(id: number) {
    return axiosInstance
      .post(`/articles/${id}`)
      .then(AxiosContracts.responseContract(ArticleDtoSchema))
  }
}
