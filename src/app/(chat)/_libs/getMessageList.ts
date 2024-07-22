"use server";

import axiosInstance from "@/libs/axiosInstance";
import { Message, MessagePageData } from "@/types/chat";

export const getMessageList = async ({
  chatId,
  cursor = -1,
}: {
  chatId: string;
  cursor?: number;
}): Promise<MessagePageData> => {
  const response = await axiosInstance.get(`/api/chats/${chatId}/messages`, {
    params: {
      c: cursor,
    },
  });

  return response.data as MessagePageData;
};
