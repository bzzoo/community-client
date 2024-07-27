import React, { useState, KeyboardEvent, useRef, useEffect } from "react";

interface Props {
  onSubmit: (keyword: string) => void;
  fakeKeywords: string[];
}

const KeywordInput = ({ onSubmit, fakeKeywords }: Props) => {
  const [input, setInput] = useState("");
  const [filteredKeywords, setFilteredKeywords] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.length > 0) {
      const filtered = fakeKeywords.filter((keyword) =>
        keyword.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredKeywords(filtered);
      setShowDropdown(true);
      setActiveIndex(0);
    } else {
      setShowDropdown(false);
    }
  }, [input, fakeKeywords]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const currentSelection =
        activeIndex === 0 ? input : filteredKeywords[activeIndex - 1];
      onSubmit(currentSelection);
      setInput("");
      setShowDropdown(false);
      setActiveIndex(0);
    } else if (event.key === "ArrowDown" && showDropdown) {
      setActiveIndex((prevIndex) =>
        prevIndex < filteredKeywords.length ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp" && showDropdown) {
      setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    }
  };

  const handleKeywordClick = (keyword: string) => {
    onSubmit(keyword);
    setInput("");
    setShowDropdown(false);
    setActiveIndex(0);
  };

  return (
    <div className="p-3 relative w-full flex border bg-white items-center gap-2 ">
      <span className="font-bold text-base">#</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="키워드를 적어주세요 (예: spring, 이직)"
        className="w-full outline-none bg-white"
      />
      {showDropdown && (
        <ul className="absolute w-full top-14 left-0 right-0 border border-slate-200 bg-white overflow-auto">
          <li
            className={`p-2 w-full flex items-center gapw hover:bg-slate-100 cursor-pointer ${
              activeIndex === 0 ? "bg-slate-100" : ""
            }`}
            onClick={() => handleKeywordClick(input)}
          >
            "{input}"
            <span className="text-[0.7rem] font-bold text-gray-500">
              {"직접 입력"}
            </span>
          </li>

          {filteredKeywords.map((keyword, index) => (
            <li
              key={index}
              onClick={() => handleKeywordClick(keyword)}
              className={`p-2 hover:bg-slate-100 cursor-pointer ${
                index + 1 === activeIndex ? "bg-slate-100" : ""
              }`}
            >
              {keyword}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default KeywordInput;
