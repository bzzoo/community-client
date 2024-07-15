import React from "react";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import ArticleToolBar from "./ArticleToolBar";

interface FormHeaderProps {
  sumbmit: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ sumbmit }) => {
  const router = useRouter();
  const pushBack = () => router.back();

  return (
    <div className="flex min-w-max w-full items-center border-b border-solid px-8">
      <button onClick={pushBack}>
        <FaArrowLeft size={22} />
      </button>
      <ArticleToolBar />
      <button
        onClick={sumbmit}
        className="ml-auto py-2 bg-slate-700 w-20 rounded-md"
      >
        <span className="text-sm text-white font-bold">저장</span>
      </button>
    </div>
  );
};
export default FormHeader;
