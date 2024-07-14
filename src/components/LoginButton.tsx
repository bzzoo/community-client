import React from "react";
import { Button } from "./ui/button";

const LoginButton = () => {
  return (
    <Button
      className="hidden h-[35px] w-[85px] items-center justify-center rounded-3xl border border-gray-500/30
           bg-white text-center text-xs font-bold text-gray-900 shadow-sm hover:bg-gray-100 focus:outline-none sm:flex"
    >
      로그인
    </Button>
  );
};

export default LoginButton;
