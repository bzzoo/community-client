"use client";

import { useMemo, useState, useEffect } from "react";
import QuillWrapper from "./QuillWrapper";

const TEXT_NODE = 3;

type Props = {
  placeholder: string;
  onChange: (content: string | null) => void;
  readOnly: boolean;
  value: string | "";
  comment: boolean;
};

const Editor = ({
  onChange,
  placeholder,
  readOnly,
  value,
  comment = false,
}: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modules = useMemo(() => {
    if (readOnly) {
      return {
        toolbar: false,
        clipboard: {
          matchVisual: false,
        },
      };
    }
    return {
      toolbar: {
        container: comment ? "#comment_toolbar" : "#toolbar",
      },
      clipboard: {
        matchVisual: false,
        matchers: [
          [
            "a",
            (delta: any) => {
              return delta;
            },
          ],
          [
            TEXT_NODE,
            (node: any, delta: any) => {
              const urlRegex = /https?:\/\/[^\s]+/g;
              if (typeof node.data === "string") {
                const matches = node.data.match(urlRegex);
                if (matches) {
                  const ops = [];
                  let str = node.data;
                  matches.forEach((match: any) => {
                    const split = str.split(match);
                    const beforeLink = split.shift();
                    ops.push({ insert: beforeLink });
                    ops.push({ insert: match, attributes: { link: match } });
                    str = split.join(match);
                  });
                  ops.push({ insert: str });
                  return { ops: ops };
                }
              }
              return delta;
            },
          ],
        ],
      },
    };
  }, [comment, readOnly, value]);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      {typeof window !== "undefined" && (
        <QuillWrapper
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
