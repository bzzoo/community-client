import React from "react";
import { HydrationBoundary } from "@tanstack/react-query";
import { SocketProvider } from "@/providers/SocketProvider";
import ChatListSuspense from "../_components/ChatListSuspense";
import ChatScreenSuspense from "../_components/ChatScreenSuspense";
import { prefetchChatList } from "../_libs/prefetchChatList";

const Page = async () => {
  const { dehydratedState } = await prefetchChatList();
  return (
    <HydrationBoundary state={dehydratedState}>
      <SocketProvider>
        <ChatListSuspense />
        <ChatScreenSuspense />
      </SocketProvider>
    </HydrationBoundary>
  );
};

export default Page;
