import { ChatInfo } from "@/types/chat";
import Room from "./Chat";

const ChatList = ({
  chatList,
  onRoomClick,
}: {
  chatList: ChatInfo[];
  onRoomClick: (chatId: string) => void;
}) => {
  const sortedChatList = [...chatList].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <section className="w-[360px] border-solid border-r">
      <div className="flex flex-col">
        <span className="p-2">채팅 리스트</span>
        {sortedChatList.map((chat) => (
          <Room key={chat.chatId} chat={chat} onRoomClick={onRoomClick} />
        ))}
        <div className="border-t"></div>
      </div>
    </section>
  );
};

export default ChatList;
