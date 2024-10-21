'use client'

import UserIcon from '@/shared/ui/member-icon'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateCommentMutation } from './create-comment.mutation'
import { commentTypesDto } from '@/shared/api/comment'
import { transCreateCommentToComment } from './create-comment.lib'
import { CreateCommentEditor } from '@/shared/lib/quill'
import { CiLocationArrow1 } from 'react-icons/ci'
import {
  CreateComment,
  CreateCommentSchema,
} from '@/features/comment/create-comment/create-comment.contracts'
import { useEffect, useState } from 'react'

export function CreateCommentForm({
  articleId,
  targetId,
  targetType,
  onSubmit,
}: {
  articleId: number
  targetId: number
  targetType: string
  onSubmit?: () => void
}) {
  useEffect(() => {
    setToolbarId(Math.random().toString(36).substr(2, 9))
  }, [])

  const [toolbarId, setToolbarId] = useState<string | null>(null)
  const {
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<commentTypesDto.CreateCommentDto>({
    mode: 'onChange',
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      articleId: articleId,
      targetId: targetId,
      targetType: targetType,
      body: '',
    },
  })
  const hasContent = (htmlString: string) => {
    const text = htmlString.replace(/<[^>]*>/g, '').trim()
    return text.length > 0
  }

  const { mutate } = useCreateCommentMutation({
    mutationKey: [articleId, targetId],

    onMutate: () => {
      setValue('body', '')
    },

    onError: (error) => {
      setError('root', { message: error.message })
    },
  })

  const formData = watch()
  const canSubmit = [isDirty, isValid].every(Boolean)

  const onSubmitHandler = (createComment: CreateComment) => {
    const comment = transCreateCommentToComment({
      createComment,
    })
    mutate(comment, {
      onSuccess: () => {
        if (onSubmit) {
          onSubmit()
        }
      },
    })
  }

  return (
    <section>
      <div className="flex justify-center gap-4">
        <UserIcon size={'md'} />
        <div className="flex-1 items-center flex-col">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex items-center justify-center max-h-[240px] pr-2 overflow-auto rounded-xl bg-defaultGray">
              <div className="flex-1 items-center justify-center">
                <CreateCommentEditor
                  setValue={setValue}
                  watch={watch}
                  toolbarId={toolbarId}
                />
              </div>
              <button
                type="submit"
                disabled={!hasContent(formData.body)}
                className={`rounded-full p-2
                  ${
                    hasContent(formData.body)
                      ? 'text-white bg-gray-400'
                      : 'text-gray-400 bg-gray-200'
                  }`}
              >
                <CiLocationArrow1 />
              </button>
            </div>
            <CommentToolBar toolbarId={toolbarId} />
          </form>
        </div>
      </div>
    </section>
  )
}

function CommentToolBar({ toolbarId }: { toolbarId: string | null }) {
  return (
    <div
      id={toolbarId!!}
      style={{ padding: 0, height: '42px' }}
    >
      <button className="ql-code-block" />
      <button className="ql-image" />
    </div>
  )
}
