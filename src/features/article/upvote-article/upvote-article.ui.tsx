import { articleTypes } from '@/entities/article'
import { Button } from '@/shared/ui/button'
import { IoHeart } from 'react-icons/io5'
import { useUpvoteArticleMutation } from './upvote-article.mutation'

type UpvotedArticleButtonProps = {
  article: articleTypes.Article
}
export function UpvoteArticleButton(props: UpvotedArticleButtonProps) {
  const { article } = props

  const { mutate } = useUpvoteArticleMutation({
    mutationKey: ['brief', article.id],
  })

  const handleUpvote = () => {
    const upvotedArticle = upvote(article)
    mutate(upvotedArticle)
  }

  return (
    <Button
      color="primary"
      variant="outline"
      onClick={handleUpvote}
    >
      <IoHeart size={16} />
      {article.upvoteCount}
    </Button>
  )
}

function upvote(article: articleTypes.Article): articleTypes.Article {
  return {
    ...article,
    upvoteCount: article.upvoteCount + 1,
  }
}

