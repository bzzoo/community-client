"use client";

import ChatHeader from "./ChatHeader";
import ChatForm from "./ChatForm";
import MessageHistory from "./MessageHistory";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useChatStore } from "@/hooks/useChatStore";
import NewMessages from "./NewMessages";
import { ScrollManager } from "./ScrollManager";

const ChatScreen = ({ chatId }: { chatId: string }) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useChatMessages(chatId);

  const oldMessages = data?.pages.flat() ?? [];
  const newMessages = useChatStore((state) => state.messages[chatId]) || [];

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (status === "pending") {
    return <div>Loading messages...</div>;
  }

  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <ChatHeader />
      <ScrollManager
        oldMessages={oldMessages}
        newMessages={newMessages}
        onLoadMore={handleLoadMore}
        hasMore={!!hasNextPage}
        isLoading={isFetchingNextPage}
      >
        <MessageHistory messageList={oldMessages} />
        <NewMessages messages={newMessages} />
      </ScrollManager>
      <ChatForm chatId={chatId} />
    </>
  );
};

export default ChatScreen;
