import React from "react";

interface Option {
  label: string;
  value: string;
}

const categoryOptions: Option[] = [
  { label: "질문", value: "QUESTION" },
  { label: "공유", value: "SHARE" },
];

interface Props {
  onSelect: (category: string) => void;
  toggle: () => void;
}

const CategoryDropdown = ({ onSelect, toggle }: Props) => {
  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-solid z-10">
      {categoryOptions.map((option) => (
        <div
          key={option.value}
          className="p-3 cursor-pointer"
          onClick={() => {
            onSelect(option.value);
            toggle();
          }}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default CategoryDropdown;
