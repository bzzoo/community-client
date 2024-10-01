import { articleTypesDto } from '@/shared/api/article'
import { articleTypes } from '@/entities/article'
import { CreateArticle } from '@/features/article/create-article/create-article.contracts'

export function transCreateArticleToCreateArticleDto(
  article: articleTypes.Article,
): articleTypesDto.CreateArticleDto {
  return {
    title: article.contents.title,
    body: article.contents.body,
    keywords: article.keywords.map((keyword) => keyword.name)
  }
}

export function transCreateArticleToArticle(config: {
  createArticle: CreateArticle
}): articleTypes.Article {
  const { createArticle } = config
  return {
    id: 0,
    contents: {
      title: createArticle.title,
      body: createArticle.body,
    },
    type: createArticle.type,
    author: {
      id: 0,
      nickname: '',
      profileImagePath: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    keywords: createArticle.keywords.map((keyword, index) => ({
      id: index,
      name: keyword,
    })),
    createdAt: new Date(),
    updatedAt: new Date(),
    viewCount: 0,
    commentCount: 0,
    upvoteCount: 0,
  };
}
