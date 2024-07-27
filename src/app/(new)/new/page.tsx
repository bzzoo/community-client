"use client";

import React from "react";
import FormHeader from "../_components/FormHeader";
import TitleInput from "../_components/TitleInput";
import CategorySelector from "../_components/CategorySelector";
import KeywordManager from "../_components/KeywordManager";
import Editor from "@/components/Editor";
import useArticleForm from "@/hooks/useArticleForm";
import { createArticle } from "@/actions/article.actions";

const page = () => {
  const {
    formData,
    handleEditorChange,
    handleTitleChange,
    setKeywordList,
    setCategory,
  } = useArticleForm();
  const handleSubmit = async () => {
    const result = await createArticle(formData);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };
  console.log(formData);
  return (
    <div className="flex flex-col items-center gap-8">
      <FormHeader sumbmit={handleSubmit} />
      <div className="flex flex-col justify-center w-[672px]">
        <div className="space-y-8 my-auto mb-20">
          <TitleInput value={formData.title} onChange={handleTitleChange} />
          <Editor
            onChange={handleEditorChange}
            placeholder="내용을 적어주세요."
            readOnly={false}
            value={formData.content}
            comment={false}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 bg-slate-50 w-[672px]">
        <CategorySelector
          category={formData.articleType}
          onSelect={setCategory}
        />
        <KeywordManager
          selectedKeywords={formData.keywordList}
          onKeywordsChange={setKeywordList}
        />
      </div>
    </div>
  );
};

export default page;
