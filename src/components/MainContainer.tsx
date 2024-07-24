import React from "react";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 min-w-0">
      <div className="w-full flex flex-col gap-4">{children}</div>
    </div>
  );
};

export default MainContainer;
