"use server";

import axiosInstance from "@/libs/axiosInstance";

export interface FormData {
  content: string;
  targetId: string;
  targetType: "COMMENT" | "REPLY" | null;
}

export const submit = async ({
  content,
  targetId,
  targetType,
}: FormData): Promise<void> => {
  console.log(content, targetId, targetType);
  try {
    const res = await axiosInstance.post(`/api/comments/${targetId}`, {
      content: content,
      targetType: targetType,
    });

    console.log("Comment submitted successfully:", res.data);

    return res.data;
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error;
  }
};
