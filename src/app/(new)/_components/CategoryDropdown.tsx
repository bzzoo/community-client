import React from "react";

interface CategoryOption {
  label: string;
  value: string;
}
interface Props {
  options: CategoryOption[];
  onSelect: (category: string) => void;
}

const CategoryDropdown = ({ options, onSelect }: Props) => {
  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-solid z-10">
      {options.map((option, index) => (
        <div
          key={option.value}
          className="p-3 cursor-pointer"
          onClick={() => {
            onSelect(option.label);
          }}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default CategoryDropdown;
