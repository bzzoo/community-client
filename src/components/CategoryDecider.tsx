"use client";

import { useTab } from "@/providers/TabProvider";
import React from "react";
import AllArticleList from "./AllArticleList";

const CategoryDecider = () => {
  const { activeTab } = useTab();

  return (
    <>
      {activeTab === 0 && <AllArticleList />}
      {/* {activeTab === 1 && <ShareArticleList />}
      {activeTab === 2 && <QuestionArticleList />} */}
    </>
  );
};

export default CategoryDecider;
