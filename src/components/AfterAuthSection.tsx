import React from "react";
import ChatIcon from "./ChatIcon";
import NotificationIcon from "./NotificationIcon";
import UserProfile from "./UserProfile";

export const AfterAuthSection = () => {
  return (
    <div className="flex gap-6 items-center ml-4">
      <ChatIcon />
      <NotificationIcon />
      <UserProfile />
    </div>
  );
};
