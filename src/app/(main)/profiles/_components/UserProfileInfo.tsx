"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import UserIcon from "../../../../components/UserIcon";

import { cn } from "@/libs/utils";
import { requestChat } from "../_actions/chat.action";
import { useRouter } from "next/navigation";
import { useSelectedChat } from "@/hooks/useSelectedChat";
import { MemberInfo } from "@/types/member";
import { getGradeForPoint } from "@/libs/grade";

const UserProfileInfo = ({ member }: { member: MemberInfo }) => {
  const router = useRouter();
  const { setSelectedChatId } = useSelectedChat();

  const initiateChat = async () => {
    const chatData = await requestChat(member.memberId);

    if (chatData && chatData.chatId) {
      setSelectedChatId(chatData.chatId);
      router.push(`/chat`);
    } else {
      console.error("Failed to initiate chat");
    }
  };

  const borderColor = getGradeForPoint(member.grade.point);
  console.log(borderColor);
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-36 h-36">
          <div className="absolute inset-1 flex items-center justify-center">
            <UserIcon size="xl" />
          </div>
          <div
            className={cn("absolute rounded-full w-full h-full border-4", {
              "border-orange-900": borderColor === "bronze",
              "border-silver": borderColor === "silver",
              "border-yellow-500": borderColor === "gold",
              "border-emerald-500": borderColor === "emerald",
              "border-blue-500": borderColor === "diamond",
              "border-rose-500": borderColor === "ruby",
            })}
          />
        </div>
        <div className="flex flex-col">
          <div>{member.nickname}</div>
        </div>
        <div className="flex">
          <Button onClick={initiateChat}>1:1 대화</Button>
        </div>
      </div>
    </>
  );
};

export default UserProfileInfo;
