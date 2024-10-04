'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { ArticleQueries } from '@/entities/article'
import { QuillWrapper } from '@/shared/lib/quill'
import { cn, formattedDate } from '@/shared/lib/utils'
import { Article } from '@/entities/article/article.types'
import { useState } from 'react'
import UserIcon from '@/shared/ui/member-icon'
import { BsChatSquareDots } from 'react-icons/bs'
import { UpvoteArticleButton } from '@/features/article/upvote-article/upvote-article.ui'

export function ArticlesFeed() {
  const articlesInfiniteQueryOptions = ArticleQueries.articlesInfiniteQuery()
  const {
    data: articles,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(articlesInfiniteQueryOptions)

  const isEmpty = isSuccess && !hasNextPage

  const canShowNextPageButton = hasNextPage && !isFetchingNextPage
  const canShowLoadingPageButton = hasNextPage && isFetchingNextPage

  return (
    <>
      {isSuccess &&
        articles.pages.map((page, pageIndex) =>
          page.content.map((article) => (
            <ArticleMeta key={article.id} article={article} />
          )),
        )}

      {canShowNextPageButton && (
        <button onClick={() => fetchNextPage()}>Load more</button>
      )}

      {canShowLoadingPageButton && <p>Loading more...</p>}

      {isEmpty && <p>No articles found.</p>}
    </>
  )
}

function ArticleMeta({ article }: { article: Article }) {
  const [expand, setExpand] = useState(false)
  const { author, contents, createdAt, viewCount, commentCount, upvoteCount } =
    article
  return (
    <article>
      <div className="flex items-center gap-3">
        <UserIcon size={'md'} />
        <div className="flex flex-col w-full">
          <div className="flex gap-1 items-center">
            <span className="text-sm font-bold text-gray-500 hover:underline">
              {author.nickname}
            </span>
          </div>
          <div className="text-xs text-gray-500 ">
            {formattedDate(createdAt)}
          </div>
        </div>
      </div>

      <div className="rounded-2xl ml-8 mt-2 border">
        <div
          className={cn(
            'overflow-y-hidden flex flex-col mx-auto items-start gap-2 relative',
            !expand && 'max-h-[400px]',
          )}
        >
          <h2 className="font-bold text-[1.5rem] px-4 py-2">
            {contents.title}
          </h2>
          <ReadOnlyEditor content={contents.body} />

          {!expand && (
            <div
              className="absolute bottom-0 left-0 right-0 trans bg-gradient-to-t from-white z-0 w-full block h-1/6"
              onClick={() => setExpand(true)}
            ></div>
          )}
        </div>

        <div className="flex items-center justify-around gap-2 p-4">
          <UpvoteArticleButton article={article}/>

          <div className="flex gap-2 items-center">
            <BsChatSquareDots />
            <span className="text-sm text-gray-500">{upvoteCount}</span>
          </div>
          <div className="flex gap-2 items-center">
            <BsChatSquareDots />
            <span className="text-sm text-gray-500">{viewCount}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

function ReadOnlyEditor({ content }: { content: string }) {
  return (
    <QuillWrapper
      modules={{ toolbar: false }}
      readOnly={true}
      placeholder=""
      value={content}
      onChange={() => {}}
    />
  )
}

export function FeedTabs() {
  return (
    <div className="flex justify-start">
      <Tabs defaultValue="pop">
        <TabsList>
          <TabsTrigger value="pop">인기</TabsTrigger>
          <TabsTrigger value="new">최신</TabsTrigger>
        </TabsList>

        <TabsContent value="pop"></TabsContent>
        <TabsContent value="new"></TabsContent>
      </Tabs>
    </div>
  )
}
