"use client";

import { useRouter } from "next/navigation";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import axios from "axios";
import { MemberInfo } from "@/types/member";
import { getAuthInfo } from "@/actions/auth.action";

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
    await axios.post("/api/logout");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
