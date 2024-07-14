export interface ChatInfo {
  chatId: string;
  sender: {
    memberId: string;
    nickname: string;
  };
  receiver: {
    memberId: string;
    nickname: string;
  };
  lastMessages: string | "";
  createdAt: Date;
  updatedAt: Date;
  endDate: Date;
  isEnd: boolean;
}

export interface MessagePageData {
  totalElements: number;
  isLast: boolean;
  nextCursor: number | null;
  content: Message[];
}

export interface Message {
  chatId: string;
  messageId: string;
  sender: {
    memberId: string;
    content: string;
  };
  content: string;
  createdAt: Date;
  messageType: "MESSAGE";
  isRead: Boolean;
}
