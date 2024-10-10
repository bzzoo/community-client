import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { CreateArticle } from '@/features/article/create-article/create-article.contracts'
import { DynamicQuillWrapper } from './quill-wrapper'
import { CreateCommentDto } from '@/shared/api/comment/comment.types'
import { useEffect, useState } from 'react'

type CreateArticleEditorProps = {
  setValue: UseFormSetValue<CreateArticle>
  watch: UseFormWatch<CreateArticle>
}

export function CreateArticleEditor({
  setValue,
  watch,
}: CreateArticleEditorProps) {
  const content = watch('body')
  const modules = {
    toolbar: { container: '#toolbar' },
  }

  return (
    <DynamicQuillWrapper
      modules={modules}
      readOnly={false}
      placeholder="내용을 10자 이상 적어주세요"
      value={content}
      onChange={(content) => setValue('body', content)}
    />
  )
}

type CreateCommentEditorProps = {
  setValue: UseFormSetValue<CreateCommentDto>
  watch: UseFormWatch<CreateCommentDto>
  toolbarId: string | null
}

export function CreateCommentEditor({
  setValue,
  watch,
  toolbarId,
}: CreateCommentEditorProps) {
  const content = watch('body')
  const modules = {
    toolbar: { container: `#${toolbarId}` },
  }
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }
  return (
    <DynamicQuillWrapper
      modules={modules}
      readOnly={false}
      placeholder=""
      value={content}
      onChange={(content) => setValue('body', content)}
    />
  )
}
