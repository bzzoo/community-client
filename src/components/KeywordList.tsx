import { Keyword } from "@/types/article";
import React from "react";

const KeywordList = ({ keywordList }: { keywordList: Keyword[] }) => {
  return (
    <div className="flex gap-2 ml-4">
      {keywordList?.map((keyword, index) => (
        <div key={index} className="text-gray text-xs bg-white">
          #{keyword.keywordName}
        </div>
      ))}
    </div>
  );
};

export default KeywordList;
