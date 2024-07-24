"use client";

import { useToggle } from "@/hooks/useToggle";
import UserDropDownMeun from "./UserDropDownMeun";
import UserIcon from "./UserIcon";

const UserProfile = () => {
  const { show } = useToggle();
  return (
    <div className="relative">
      <div className="relattive">
        <UserIcon />
        {show && <UserDropDownMeun />}
      </div>
    </div>
  );
};

export default UserProfile;
