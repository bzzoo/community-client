"use server";

import axiosInstance from "@/libs/axiosInstance";
import { ChatInfo } from "@/types/chat";

export const getChatList = async (): Promise<ChatInfo[]> => {
  const res = await axiosInstance.get("/api/chats");
  return res.data as ChatInfo[];
};
