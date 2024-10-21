import { CreateArticleModal } from '@/widgets/modal'
import { ArticlesFeed } from '@/widgets/article-feed'

export default function page() {
  return (
    <>
      <CreateArticleModal />
      <ArticlesFeed />
    </>
  )
}
