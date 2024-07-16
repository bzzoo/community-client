import { ChatInfo } from "@/types/chat";

const dummyChatData: ChatInfo[] = [
  {
    chatId: "1",
    sender: {
      memberId: "sender1",
      nickname: "Alice",
    },
    receiver: {
      memberId: "receiver1",
      nickname: "Bob",
    },
    lastMessages: "Hey Bob, how are you?",
    createdAt: new Date("2024-07-10T10:20:30Z"),
    updatedAt: new Date("2024-07-12T14:20:30Z"),
    endDate: new Date("2024-07-15T10:20:30Z"),
    isEnd: false,
  },
  {
    chatId: "2",
    sender: {
      memberId: "sender2",
      nickname: "Charlie",
    },
    receiver: {
      memberId: "receiver2",
      nickname: "Dave",
    },
    lastMessages: "Let's meet tomorrow.",
    createdAt: new Date("2024-07-08T08:15:00Z"),
    updatedAt: new Date("2024-07-12T09:15:00Z"),
    endDate: new Date("2024-07-14T08:15:00Z"),
    isEnd: true,
  },
  {
    chatId: "3",
    sender: {
      memberId: "sender3",
      nickname: "Eve",
    },
    receiver: {
      memberId: "receiver3",
      nickname: "Frank",
    },
    lastMessages: "Can you send me the report?",
    createdAt: new Date("2024-07-05T12:00:00Z"),
    updatedAt: new Date("2024-07-12T13:00:00Z"),
    endDate: new Date("2024-07-18T12:00:00Z"),
    isEnd: false,
  },
  {
    chatId: "4",
    sender: {
      memberId: "sender4",
      nickname: "Grace",
    },
    receiver: {
      memberId: "receiver4",
      nickname: "Heidi",
    },
    lastMessages: "Sure, I will do it.",
    createdAt: new Date("2024-07-09T14:30:00Z"),
    updatedAt: new Date("2024-07-12T15:30:00Z"),
    endDate: new Date("2024-07-20T14:30:00Z"),
    isEnd: false,
  },
  {
    chatId: "5",
    sender: {
      memberId: "sender5",
      nickname: "Ivan",
    },
    receiver: {
      memberId: "receiver5",
      nickname: "Judy",
    },
    lastMessages: "Good night!",
    createdAt: new Date("2024-07-07T18:45:00Z"),
    updatedAt: new Date("2024-07-12T19:45:00Z"),
    endDate: new Date("2024-07-17T18:45:00Z"),
    isEnd: true,
  },
];

export default dummyChatData;
