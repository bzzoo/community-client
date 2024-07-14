import React from "react";
import { Button } from "./ui/button";

const RegisterButton = () => {
  return (
    <Button
      className="hidden h-[35px] w-[85px] items-center justify-center rounded-3xl border border-transparent 
        bg-blue-950 text-xs font-bold text-white hover:bg-blue-400 focus:outline-none focus:ring-offset-0 sm:flex"
    >
      회원가입
    </Button>
  );
};
export default RegisterButton;
