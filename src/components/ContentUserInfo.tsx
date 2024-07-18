import Link from "next/link";
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
          <Link href={`/profiles/${author?.memberId}`}>
            <span className="font-sans text-sm font-bold text-gray-500 hover:underline">
              {author?.nickname ? author.nickname : "익명"}
            </span>
          </Link>
          <span className="font-sans text-sm text-gray-500 hover:underline">
            님의
          </span>
          <SubLableDecider type={type} />
        </div>
        <div className="font-sans text-sm text-gray-500 ">
          {formattedDate(createdAt)}
        </div>
      </div>
    </>
  );
};

export default ContentUserInfo;
