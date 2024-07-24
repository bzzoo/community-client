import React from "react";

interface TextLabelProps {
  type: "answer" | "question" | "reply" | "share" | "comment";
}

const SubLabelDecider = ({ type }: TextLabelProps) => {
  const getTextAndColor = (type: TextLabelProps["type"]) => {
    switch (type) {
      case "answer":
        return { text: "답변", color: "text-sm text-pink-500" };
      case "question":
        return { text: "질문", color: "text-sm text-green-500" };
      case "reply":
        return { text: "댓글", color: "text-sm text-blue-500" };
      case "share":
        return { text: "공유", color: "text-sm text-purple-500" };
      default:
        return { text: "", color: "text-gray-800" };
    }
  };

  const { text, color } = getTextAndColor(type);

  return <span className={`font-semibold ${color}`}>{text}</span>;
};

export default SubLabelDecider;
