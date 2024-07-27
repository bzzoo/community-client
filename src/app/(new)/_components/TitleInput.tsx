import React from "react";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TitleInput = ({ value, onChange }: Props) => {
  return (
    <TextareaAutosize
      className="w-full h-auto font-bold text-3xl line-clamp-3 outline-none flex-1 resize-none"
      placeholder="제목을 입력하세요"
      value={value}
      onChange={onChange}
    />
  );
};

export default TitleInput;
