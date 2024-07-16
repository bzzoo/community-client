import React from "react";
import CategoryDropdown from "@/app/(new)/_components/CategoryDropdown";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useToggle } from "../../../hooks/useToggle";

interface Option {
  label: string;
  value: string;
}

const categoryOptions: Option[] = [
  { label: "질문", value: "QUESTION" },
  { label: "공유", value: "SHARE" },
];

interface Props {
  category: string;
  onCategoryChange: (category: string) => void;
}

const CategorySelector = ({ category, onCategoryChange }: Props) => {
  const { show, toggle } = useToggle();

  return (
    <div className="flex flex-col gap-2">
      <span className="font-bold text-sm">분류</span>
      <div className="flex border border-solid border-slate-200 bg-white relative rounded-sm">
        <button
          className="p-3 w-full focus:outline-0 flex items-center justify-between"
          onClick={toggle}
        >
          <span className="text-base font-bold">{category}</span>
          <RiArrowDropDownLine />
        </button>

        {show && (
          <CategoryDropdown
            options={categoryOptions}
            onSelect={(item) => {
              onCategoryChange(item);
              toggle();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CategorySelector;
