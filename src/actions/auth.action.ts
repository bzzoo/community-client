"use server";

import axiosInstance from "@/libs/axiosInstance";
import { MemberInfo } from "@/types/member";

export const getAuthInfo = async (): Promise<{
  loggedIn: boolean;
  userInfo?: MemberInfo | null;
}> => {
  try {
    const response = await axiosInstance.get("/api/members/me");
    const user: MemberInfo = response.data;
    if (user && user.memberId) {
      return { loggedIn: true, userInfo: user };
    } else {
      return { loggedIn: false, userInfo: null };
    }
  } catch (error) {
    return { loggedIn: false, userInfo: null };
  }
};

export const logout = async () => {};
