import React from "react";

const ContentExpand = ({
  setExpand,
}: {
  setExpand: (expand: boolean) => void;
}) => {
  return (
    <button
      onClick={() => {
        setExpand(true);
      }}
      className="absolute bottom-0 left-0 right-0 trans bg-gradient-to-t from-white z-0 w-full block h-1/5"
    ></button>
  );
};

export default ContentExpand;
