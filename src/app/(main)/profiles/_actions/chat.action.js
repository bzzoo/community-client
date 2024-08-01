"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const requestChat = async (respondentId) => {
  const token = cookies().get("mb_token")?.value;

  if (!token) {
    console.error("Token is not available");
    return null;
  }

  try {
    const res = await axios.get(
      `http://localhost:8080/api/chats/check/${respondentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const chatData = res.data;
    if (chatData && chatData.chatId) {
      return chatData;
    } else {
      console.error("Invalid res:", res.data);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
