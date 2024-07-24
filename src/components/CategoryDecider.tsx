"use client";

import { useTab } from "@/providers/TabProvider";
import React from "react";
import ArticleList from "./ArticleList";

const CategoryDecider = () => {
  const { activeTab } = useTab();
  return (
    <>
      <ArticleList />
    </>
  );
};

export default CategoryDecider;
