"use client";

import { useAuth } from "@/providers/AuthProvider";
import { AfterAuthSection } from "./AfterAuthSection";
import { BeforeAuthSection } from "./BeforeAuthSection";

export const UserSection = () => {
  const { isLoggedIn } = useAuth();
  return <>{isLoggedIn ? <AfterAuthSection /> : <BeforeAuthSection />}</>;
};
