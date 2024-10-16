import { useState, useRef, useCallback } from 'react'

export function useChatScrollManagement() {
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false)
  const isNearBottomRef = useRef(true)

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
    const scrollThreshold = 100
    isNearBottomRef.current =
      scrollHeight - scrollTop - clientHeight < scrollThreshold
  }, [])

  const scrollToBottom = useCallback(() => {
    setShouldScrollToBottom(true)
  }, [])

  return {
    shouldScrollToBottom,
    setShouldScrollToBottom,
    isNearBottomRef,
    handleScroll,
    scrollToBottom,
  }
}
