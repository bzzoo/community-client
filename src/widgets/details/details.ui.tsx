'use client'

import {
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { ArticleQueries } from '@/entities/article'
import { CommentQueries } from '@/entities/comment'
import { CreateCommentForm } from '@/features/comment/create-comment'
import { commentTypes } from '@/entities/comment'
import { articleTypes } from '@/entities/article'
import { useState, useEffect } from 'react'
import { Button } from '@/shared/ui/button'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { ReadOnlyEditor } from '@/shared/lib/quill'
import { UpvoteCommentButton } from '@/features/comment/upvote-comment'
import Link from 'next/link'
import UserIcon from '@/shared/ui/member-icon'

export function Details({ id }: { id: number }) {
  const { data: article } = useSuspenseQuery(ArticleQueries.articleQuery(id))
  const parentCommentsInfiniteQueryOptions =
    CommentQueries.commentsInfiniteQuery(id)

  const {
    data: parentCommentData,
    fetchNextPage: fetchNextParentComments,
    hasNextPage: hasMoreParentComments,
    isFetchingNextPage: isFetchingMoreParentComments,
  } = useSuspenseInfiniteQuery(parentCommentsInfiniteQueryOptions)

  const { contents, author } = article
  const comments =
    parentCommentData?.pages.flatMap((page) => page.content) || []

  return (
    <div className="inset-0 overflow-auto shadow-[0px_4px_8px_-2px_rgba(0,0,0,0.10),_0px_0px_0px_1px_rgba(0,0,0,0.03)] relative md:rounded-[20px]">
      <div className="border-b mt-10" />
      <div className="flex flex-col border-b px-3 py-2">
        <div className="my-4 cursor-pointer px-6">
          <div className="flex items-center gap-2">
            <UserIcon />
            {author.nickname}
          </div>
        </div>

        <div className="px-6 text-[15px] leading-6">
          <h1 className="ml-4 text-xl">{contents.title}</h1>
          <ReadOnlyEditor content={contents.body} />
        </div>
      </div>

      <div className="border-b p-2">
        <Button>{article?.commentCount ?? 0}</Button>
        <Button>{article?.upvoteCount ?? 0}</Button>
        <Button>{article?.viewCount ?? 0}</Button>
      </div>
      <div className="px-6 pb-6 mt-4">
        <CreateCommentForm
          articleId={article.id}
          targetId={article.id}
          targetType={article.type}
        />
        <CommentList
          initLoadComments={comments}
          article={article}
        />
        {hasMoreParentComments && (
          <Button onClick={() => fetchNextParentComments()}>
            {isFetchingMoreParentComments
              ? 'Loading more...'
              : '부모 댓글 더보기'}
          </Button>
        )}
      </div>
    </div>
  )
}

function CommentList({
  initLoadComments,
  article,
}: {
  initLoadComments: commentTypes.Comments
  article: articleTypes.Article
}) {
  const [openComments, setOpenComments] = useState<Record<number, boolean>>({})
  const [loadedComments, setLoadedComments] = useState<Record<number, boolean>>(
    {},
  )

  const toggleComments = (parentId: number) => {
    setOpenComments((prev) => ({
      ...prev,
      [parentId]: !prev[parentId],
    }))

    if (!loadedComments[parentId]) {
      setLoadedComments((prev) => ({
        ...prev,
        [parentId]: true,
      }))
    }
  }

  return (
    <>
      {initLoadComments
        .filter((comment) => comment.parentId === null)
        .map((parent: commentTypes.Comment) => (
          <div key={parent.id}>
            <CommentMeta
              comment={parent}
              article={article}
              parentCommentId={parent.id}
            />
            {parent.childCount > 0 && (
              <div
                className="flex items-center gap-2 ml-4 text-purple-400"
                onClick={() => toggleComments(parent.id)}
              >
                {openComments[parent.id] ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
                댓글 {parent.childCount}개
              </div>
            )}
            {openComments[parent.id] && loadedComments[parent.id] && (
              <ChildCommentList
                parentId={parent.id}
                article={article}
              />
            )}
          </div>
        ))}
    </>
  )
}

function ChildCommentList({
  parentId,
  article,
}: {
  parentId: number
  article: articleTypes.Article
}) {
  const commentsInfiniteQueryOptions = CommentQueries.commentsInfiniteQuery(
    article.id,
    {
      size: 10,
      cursor: -1,
      depth: 2,
      articleId: article.id,
      parentId: parentId,
    },
  )

  const {
    data: childCommentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(commentsInfiniteQueryOptions)

  const childComments =
    childCommentsData?.pages.flatMap((page) => page.content) || []

  return (
    <>
      {childComments.map((child: commentTypes.Comment) => (
        <div
          key={child.id}
          className="ml-12"
        >
          <CommentMeta
            comment={child}
            article={article}
            parentCommentId={parentId}
          />
        </div>
      ))}

      {hasNextPage && (
        <Button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? 'Loading more...' : '자식 댓글 더보기'}
        </Button>
      )}
    </>
  )
}

function CommentMeta({
  comment,
  article,
  parentCommentId,
}: {
  comment: commentTypes.Comment
  article: articleTypes.Article
  parentCommentId?: number
}) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const toggleReplyForm = () => setShowReplyForm((prev) => !prev)

  const targetId = parentCommentId || comment.id

  return (
    <div className="block mt-4 mb-4">
      <div className="flex flex-col">
        <div className="flex items-center mb-1 gap-2">
          <Link href={'/'}>
            <UserIcon size={'md'} />
          </Link>
          <div className="flex flex-col">
            <span className="font-medium text-md whitespace-nowrap cursor-pointer mr-2">
              {comment.author.nickname}
            </span>
            <div className="flex items-center">
              <span className="text-xs text-gray-400 text-ellipsis overflow-hidden">
                Build. Connect. inspire
              </span>
            </div>
          </div>
        </div>
        <div className="ml-6">
          <ReadOnlyEditor content={comment.body} />
          <div className="flex items-center gap-3">
            <UpvoteCommentButton comment={comment} />
            <ReplyButton onClick={toggleReplyForm} />
          </div>

          {showReplyForm && (
            <div>
              <CreateCommentForm
                articleId={article.id}
                targetId={targetId}
                targetType={'COMMENT'}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ReplyButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="text-sm"
      onClick={onClick}
    >
      답글
    </div>
  )
}
