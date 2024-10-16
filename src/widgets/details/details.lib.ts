'use client'

import { useEffect, useState } from 'react'
import { commentTypes } from '@/entities/comment'
import { commentLib } from '@/entities/comment'

export function useReply(initLoadComments: commentTypes.Comments) {
  const [childComments, setChildComments] = useState<{
    [key: number]: commentTypes.Comments
  }>({})
  const [openComments, setOpenComments] = useState<{ [key: number]: boolean }>(
    {},
  )

  useEffect(() => {
    if (!initLoadComments) return
    const { parents, children } =
      commentLib.separateParentAndChildComments(initLoadComments)
    setChildComments(children)

    const commentCountThreshold = 10
    if (initLoadComments.length <= commentCountThreshold) {
      const initialOpenComments = parents.reduce(
        (acc: { [key: number]: boolean }, parent) => {
          acc[parent.id] = true
          return acc
        },
        {},
      )
      setOpenComments(initialOpenComments)
    }
  }, [])

  const toggleComments = (parentId: number) => {
    setOpenComments((prev) => ({
      ...prev,
      [parentId]: !prev[parentId],
    }))
  }

  return { childComments, openComments, toggleComments }
}
