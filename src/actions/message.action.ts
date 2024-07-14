import { MessagePageData } from "@/types/chat";

const dummyMessagePageData: MessagePageData = {
  totalElements: 10,
  isLast: false,
  nextCursor: 11,
  content: [
    {
      messageId: "1",
      sender: {
        memberId: "user1",
        content: "Hello there!",
      },
      content: "Hello there!",
      createdAt: new Date("2024-07-10T10:00:00Z"),
      messageType: "MESSAGE",
      isRead: true,
    },
    {
      messageId: "2",
      sender: {
        memberId: "user2",
        content: "How are you?",
      },
      content: "How are you?",
      createdAt: new Date("2024-07-10T10:05:00Z"),
      messageType: "MESSAGE",
      isRead: false,
    },
    {
      messageId: "3",
      sender: {
        memberId: "user1",
        content: "I'm fine, thanks!",
      },
      content: "I'm fine, thanks!",
      createdAt: new Date("2024-07-10T10:10:00Z"),
      messageType: "MESSAGE",
      isRead: true,
    },
    {
      messageId: "4",
      sender: {
        memberId: "user2",
        content: "What about you?",
      },
      content: "What about you?",
      createdAt: new Date("2024-07-10T10:15:00Z"),
      messageType: "MESSAGE",
      isRead: true,
    },
    {
      messageId: "5",
      sender: {
        memberId: "user1",
        content: "I'm good as well.",
      },
      content: "I'm good as well.",
      createdAt: new Date("2024-07-10T10:20:00Z"),
      messageType: "MESSAGE",
      isRead: true,
    },
    {
      messageId: "6",
      sender: {
        memberId: "user2",
        content: "Great to hear!",
      },
      content: "Great to hear!",
      createdAt: new Date("2024-07-10T10:25:00Z"),
      messageType: "MESSAGE",
      isRead: true,
    },
    {
      messageId: "7",
      sender: {
        memberId: "user1",
        content: "What are your plans for today?",
      },
      content: "What are your plans for today?",
      createdAt: new Date("2024-07-10T10:30:00Z"),
      messageType: "MESSAGE",
      isRead: false,
    },
    {
      messageId: "8",
      sender: {
        memberId: "user2",
        content: "I have a meeting in the afternoon.",
      },
      content: "I have a meeting in the afternoon.",
      createdAt: new Date("2024-07-10T10:35:00Z"),
      messageType: "MESSAGE",
      isRead: true,
    },
    {
      messageId: "9",
      sender: {
        memberId: "user1",
        content: "Sounds good!",
      },
      content: "Sounds good!",
      createdAt: new Date("2024-07-10T10:40:00Z"),
      messageType: "MESSAGE",
      isRead: false,
    },
    {
      messageId: "10",
      sender: {
        memberId: "user2",
        content: "Yep, talk to you later.",
      },
      content: "Yep, talk to you later.",
      createdAt: new Date("2024-07-10T10:45:00Z"),
      messageType: "MESSAGE",
      isRead: true,
    },
  ],
};

export default dummyMessagePageData;
