import { useState } from "react";

export interface FormData {
  content: string;
  targetId: string;
  targetType: "COMMENT" | "REPLY" | null;
}

export default function useCommentForm(initialData: FormData) {
  const [formData, setFormData] = useState<FormData>(initialData);
  console.log(formData);
  const handleEditorChange = (content: string | null): void => {
    if (content === null) return;
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: content,
    }));
  };

  return {
    formData,
    setFormData,
    handleEditorChange,
  };
}
