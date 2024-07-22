import { Message } from "@/types/chat";
import React, { useEffect, useRef, useLayoutEffect, ReactNode } from "react";

export const useScrollToBottom = (newMessages: Message[]) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [newMessages]);

  return messagesEndRef;
};

export const useScrollPosition = (oldMessages: Message[]) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const previousHeightRef = useRef<number>(0);

  useLayoutEffect(() => {
    if (messagesContainerRef.current) {
      const currentHeight = messagesContainerRef.current.scrollHeight;
      const previousHeight = previousHeightRef.current;

      if (currentHeight > previousHeight && previousHeight !== 0) {
        messagesContainerRef.current.scrollTop +=
          currentHeight - previousHeight;
      }

      previousHeightRef.current = currentHeight;
    }
  }, [oldMessages]);

  return messagesContainerRef;
};

export const useInfiniteScroll = (
  messagesContainerRef: React.RefObject<HTMLDivElement>,
  onLoadMore: () => void,
  hasMore: boolean,
  isLoading: boolean
) => {
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop } = messagesContainerRef.current;
      if (scrollTop === 0 && hasMore && !isLoading) {
        onLoadMore();
      }
    }
  };

  return handleScroll;
};
