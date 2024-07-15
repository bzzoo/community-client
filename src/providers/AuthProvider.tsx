"use client";
import { useAuth } from "@/hooks/useAuth";
import { MemberInfo } from "@/types/member";
import React, { createContext, ReactNode, useContext } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  user: MemberInfo | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
