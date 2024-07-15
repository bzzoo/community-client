"use client";

import React from "react";
import { PiNotePencilBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
import UserIcon from "./UserIcon";

const NewPostButton = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/new");
  };

  return (
    <button
      onClick={handleNavigate}
      className="bg-white w-full flex items-center gap-4 px-4 py-3 rounded-full relative"
    >
      <UserIcon size={"md"} />
      <span className="text-base text-slate-400">
        {"새로운 글을 작성해 보세요"}
      </span>
      <PiNotePencilBold className="absolute right-8" size={24} color="gray" />
    </button>
  );
};

export default NewPostButton;
