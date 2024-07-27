"use client";

import React from "react";
import CategoryDropdown from "@/app/(new)/_components/CategoryDropdown";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useToggle } from "../../../hooks/useToggle";

const CategorySelector = ({
  category,
  onSelect,
}: {
  category: string;
  onSelect: (category: string) => void;
}) => {
  const { show, toggle } = useToggle();

  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold text-sm">분류</span>
      <div className="flex border border-solid border-slate-200 bg-white relative rounded-sm">
        <button
          className="p-3 w-full focus:outline-0 flex items-center justify-between"
          onClick={toggle}
        >
          <span className="text-base font-bold">
            {category === "SHARE"
              ? "공유"
              : category === "QUESTION"
              ? "질문"
              : category}
          </span>
          <RiArrowDropDownLine />
        </button>

        {show && <CategoryDropdown onSelect={onSelect} toggle={toggle} />}
      </div>
    </div>
  );
};

export default CategorySelector;
