import React from "react";

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TitleInput = ({ value, onChange }: Props) => {
  return (
    <textarea
      id="title"
      placeholder="제목을 입력해주세요"
      className="w-full h-auto font-bold text-3xl line-clamp-3 border-gray-500/30 placeholder-gray-500/80 focus:border-gray-500 focus:outline-none focus:ring-0"
      value={value}
      onChange={onChange}
    />
  );
};

export default TitleInput;
