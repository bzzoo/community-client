"use server";
import axiosInstance from "@/libs/axiosInstance";
import { MemberInfo } from "@/types/member";

export const getAuthInfo = async (): Promise<{
  loggedIn: boolean;
  userInfo?: MemberInfo | null;
}> => {
  try {
    const response = await axiosInstance.post("/api/logout");
    const user: MemberInfo = response.data;
    return { loggedIn: true, userInfo: user };
  } catch (error) {
    return { loggedIn: false, userInfo: null };
  }
};
