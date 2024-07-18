import { BsChatSquareDots } from "react-icons/bs";

const ReplyButton = ({
  toggle,
  count,
}: {
  toggle: () => void;
  count: number;
}) => (
  <button onClick={toggle} className="flex items-center gap-2">
    <BsChatSquareDots />
    <span className="text-sm text-gray-500">댓글 {count}</span>
  </button>
);

export default ReplyButton;
