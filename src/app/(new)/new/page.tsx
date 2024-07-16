"use client";
import React from "react";
import FormHeader from "../_components/FormHeader";
import TitleInput from "../_components/TitleInput";
import CategorySelector from "../_components/CategorySelector";
import KeywordManager from "../_components/KeywordManager";
import Editor from "@/components/Editor";
import useArticleForm from "@/hooks/useArticleForm";

const page = () => {
  const {
    formData,
    handleEditorChange,
    handleTitleChange,
    setCategory,
    setKeywordList,
  } = useArticleForm({
    title: "",
    content: "",
    articleType: "질문",
    keywordList: [],
  });

  function handleSubmit(formData: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <FormHeader sumbmit={() => handleSubmit(formData)} />
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
          onCategoryChange={setCategory}
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
