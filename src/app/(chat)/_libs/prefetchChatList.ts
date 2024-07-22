import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getChatList } from "@/actions/chat.action";

export const prefetchChatList = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["chats"],
    queryFn: getChatList,
  });

  const dehydratedState = dehydrate(queryClient);
  return { dehydratedState };
};
