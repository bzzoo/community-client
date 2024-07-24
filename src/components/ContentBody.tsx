"use client";

import { cn } from "@/libs/utils";
import { Article } from "@/types/article";
import { useState } from "react";
import Editor from "./Editor";
import Link from "next/link";
import ContentExpand from "./ContentExpand";

const ShareBody = ({ share }: { share: Article }) => {
  const [expand, setExpand] = useState(false);
  return (
    <div
      className={cn(
        "overflow-y-hidden flex flex-col mx-auto items-start gap-2 relative",
        !expand && "max-h-[400px]"
      )}
    >
      <Link href={`/article/${share.articleId}`} className="w-full">
        <p className="font-bold text-[1.5rem] px-4 py-2">{share.title}</p>
        <Editor
          onChange={() => {}}
          readOnly={true}
          value={share.content}
          comment={false}
          placeholder={""}
        />
      </Link>
      {!expand && <ContentExpand setExpand={setExpand} />}
    </div>
  );
};

export default ShareBody;
