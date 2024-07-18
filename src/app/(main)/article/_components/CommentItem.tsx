import LikeButton from "../../_components/LikeButton";
import QuillEditor from "@/app/_components/editor/QuillEditor";
import ContentUserInfo from "../../_components/ContentUserInfo";
import UserIcon from "@/app/_components/UserIcon";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { Comment as IComment } from "@/types";

const CommentItem = ({
  comment,
  isReply = false,
}: {
  comment: IComment;
  isReply?: boolean;
}) => (
  <>
    <div className={`p-4 flex flex-col gap-3 ${isReply ? "ml-12" : ""}`}>
      <div className="flex items-center gap-4">
        <UserIcon size={isReply ? "lg" : "md"} />
        <ContentUserInfo
          author={comment.author}
          createdAt={comment.createdAt}
          type="question"
        />
        <IoEllipsisVerticalSharp size={18} color="gray" />
      </div>
      <div
        className={`flex flex-col gap-4 ${
          !isReply ? "" : "bg-neutral-400/10 p-4 rounded-md"
        }`}
      >
        <QuillEditor
          onChange={() => {}}
          readOnly={true}
          placeholder=""
          value={comment.content}
          comment={true}
        />
        <div className="flex justify-end">
          <LikeButton />
        </div>
      </div>
    </div>
  </>
);

export default CommentItem;
