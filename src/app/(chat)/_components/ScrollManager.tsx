"use client";

import {
  useInfiniteScroll,
  useScrollPosition,
  useScrollToBottom,
} from "@/hooks/useScroll";
import { Message } from "@/types/chat";
import React, { ReactNode } from "react";

interface ScrollManagerProps {
  oldMessages: Message[];
  newMessages: Message[];
  children: ReactNode;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export const ScrollManager: React.FC<ScrollManagerProps> = ({
  oldMessages,
  newMessages,
  children,
  onLoadMore,
  hasMore,
  isLoading,
}) => {
  const messagesEndRef = useScrollToBottom(newMessages);
  const messagesContainerRef = useScrollPosition(oldMessages);
  const handleScroll = useInfiniteScroll(
    messagesContainerRef,
    onLoadMore,
    hasMore,
    isLoading
  );

  return (
    <div
      ref={messagesContainerRef}
      className="flex-1 overflow-auto"
      onScroll={handleScroll}
    >
      {isLoading && <div>Loading more messages...</div>}
      {children}
      <div ref={messagesEndRef} />
    </div>
  );
};
