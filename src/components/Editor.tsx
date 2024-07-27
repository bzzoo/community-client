"use client";

import React, { useMemo, useState, useEffect } from "react";
import DynamicQuillWrapper from "./QuillWrapper";

const TEXT_NODE = 3;

type EditorProps = {
  placeholder: string;
  onChange: (content: string | null) => void;
  readOnly: boolean;
  value: string;
  comment: boolean;
};

const Editor: React.FC<EditorProps> = ({
  onChange,
  placeholder,
  readOnly,
  value,
  comment = false,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: readOnly
        ? false
        : { container: comment ? "#comment_toolbar" : "#toolbar" },
      clipboard: {
        matchVisual: false,
        matchers: [
          ["a", (delta: any) => delta],
          [
            TEXT_NODE,
            (node: any, delta: any) => {
              const urlRegex = /https?:\/\/[^\s]+/g;
              if (typeof node.data === "string") {
                const matches = node.data.match(urlRegex);
                if (matches) {
                  return {
                    ops: node.data
                      .split(urlRegex)
                      .reduce((acc: any[], text: string, i: number) => {
                        if (i > 0)
                          acc.push({
                            insert: matches[i - 1],
                            attributes: { link: matches[i - 1] },
                          });
                        if (text) acc.push({ insert: text });
                        return acc;
                      }, []),
                  };
                }
              }
              return delta;
            },
          ],
        ],
      },
    }),
    [comment, readOnly]
  );

  if (!mounted) return null;

  return (
    <div>
      {typeof window !== "undefined" && (
        <DynamicQuillWrapper
          modules={modules}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  );
};

export default Editor;
