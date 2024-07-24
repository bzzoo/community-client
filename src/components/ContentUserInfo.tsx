import { MemberInfo } from "@/types/member";
import SubLableDecider from "./SubLableDecider";
import { formattedDate } from "@/libs/dateFommats";

interface ContentUserInfoProps {
  author: MemberInfo;
  createdAt: Date;
  type: "share" | "question";
}

const ContentUserInfo = ({
  author,
  createdAt,
  type = "question",
}: ContentUserInfoProps) => {
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex gap-1 items-center">
          <span className="text-sm font-bold text-gray-500 hover:underline">
            {author?.nickname ? author.nickname : "익명"}
          </span>

          <span className="text-sm text-gray-500">{"님의"}</span>
          <SubLableDecider type={type} />
        </div>
        <div className="text-xs text-gray-500 ">{formattedDate(createdAt)}</div>
      </div>
    </>
  );
};

export default ContentUserInfo;
