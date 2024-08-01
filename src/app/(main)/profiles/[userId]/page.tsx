import React from "react";

import { getUserProfileInfo } from "../_actions/profile.action";
import UserProfileInfo from "../_components/UserProfileInfo";
import UserGrade from "../_components/UserGrade";
import { MemberInfo } from "@/types/member";
import TabItems from "../_components/TabItem";

const page = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const member: MemberInfo = await getUserProfileInfo(userId);
  return (
    <>
      <UserProfileInfo member={member} />
      <UserGrade point={member.grade.point} />
      <TabItems />
    </>
  );
};

export default page;
