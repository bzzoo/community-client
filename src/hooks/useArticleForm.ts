import { useCallback, useState } from "react";

export interface FormData {
  title: string;
  content: string;
  articleType: string;
  keywordList: string[];
}

export default function useArticleForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    articleType: "QUESTION",
    keywordList: [],
  });

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      title: event.target.value,
    }));
  };

  const handleEditorChange = (content: string | null): void => {
    if (content === null) return;
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: content,
    }));
  };

  const setCategory = useCallback((category: string) => {
    setFormData((prev) => ({ ...prev, articleType: category }));
  }, []);

  function setKeywordList(keywordList: string[]) {
    setFormData({ ...formData, keywordList: keywordList });
  }

  return {
    formData,
    setFormData,
    handleTitleChange,
    handleEditorChange,
    setCategory,
    setKeywordList,
  };
}
