import React from "react";
import { GoThumbsup } from "react-icons/go";

const LikeButton = ({}) => (
  <button className="flex items-center gap-2">
    <GoThumbsup color="gray" />
    <span className="text-sm text-gray-500">좋아요 0</span>
    <span></span>
  </button>
);

export default LikeButton;
