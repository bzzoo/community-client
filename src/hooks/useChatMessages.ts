import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { Message, MessagePageData } from "@/types/chat";
import { getMessageList } from "@/app/(chat)/_libs/getMessageList";

export const useChatMessages = (chatId: string) => {
  const query = useInfiniteQuery<
    MessagePageData,
    Error,
    InfiniteData<Message[], number>,
    [string, string],
    number
  >({
    queryKey: ["messages", chatId],
    queryFn: ({ pageParam }) => getMessageList({ cursor: pageParam, chatId }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: -1,
    select: (data) => ({
      pages: data.pages.map((page) => page.content),
      pageParams: data.pageParams,
    }),
  });

  return {
    ...query,
    messagesList: query.data?.pages.flat() ?? [],
  };
};
