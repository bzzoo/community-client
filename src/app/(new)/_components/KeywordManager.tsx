import React from "react";
import KeywordInput from "@/app/(new)/_components/KeywordIntput";
import { HiOutlineXMark } from "react-icons/hi2";

const fakeKeywords: string[] = [
  "spring",
  "spring boot",
  "이직",
  "취업",
  "리액트",
  "자바스크립트",
  "자바스크립트",
  "typescript",
];

interface Props {
  selectedKeywords: string[];
  onKeywordsChange: (keywords: string[]) => void;
}
const KeywordManager = ({ selectedKeywords, onKeywordsChange }: Props) => {
  const addKeyword = (newKeyword: string) => {
    if (
      !selectedKeywords.includes(newKeyword.trim()) &&
      newKeyword.trim() !== ""
    ) {
      onKeywordsChange([...selectedKeywords, newKeyword.trim()]);
    }
  };

  const removeKeyword = (keyword: string) => {
    onKeywordsChange(selectedKeywords.filter((k) => k !== keyword));
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="font-bold text-sm">키워드</span>
        <KeywordInput onSubmit={addKeyword} fakeKeywords={fakeKeywords} />
      </div>
      <ul className="flex flex-wrap gap-4">
        {selectedKeywords.map((keyword, index) => (
          <li
            key={index}
            className="h-[24px] min-w-fit p-3 flex justify-center items-center border rounded-full bg-white hover:bg-[rgba(144,144,144,0.2)] cursor-pointer"
          >
            <span className="text-[12px] font-bold"># {keyword}</span>
            <button onClick={() => removeKeyword(keyword)}>
              <HiOutlineXMark />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default KeywordManager;
