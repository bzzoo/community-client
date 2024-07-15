"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MemberInfo } from "@/types/member";
import { getAuthInfo } from "@/actions/auth.action";

export const useAuth = () => {
  const [user, setUser] = useState<MemberInfo | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { loggedIn, userInfo } = await getAuthInfo();
      setIsLoggedIn(loggedIn);
      setUser(userInfo!);
    };
    checkAuth();
  }, []);

  const logout = async () => {
    // 로그아웃 로직 추가 필요
    setIsLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  return { user, isLoggedIn, setIsLoggedIn, logout };
};
