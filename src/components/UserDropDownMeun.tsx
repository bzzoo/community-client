import Link from "next/link";
import React from "react";
import LogoutButton from "./LogoutButton";

const UserDropDownMeun = () => {
  const profileMenu = [
    { name: "내 프로필", href: `/` },
    { name: "계정 관리", href: "/" },
    { name: "활동 내역", href: "/" },
  ];
  return (
    <div className="absolute right-0 mt-2 w-52 origin-top-right divide-y divide-gray-500/30 rounded-md bg-white p-4 shadow-lg ring-1 ring-gray-900 ring-opacity-5 focus:outline-none transform opacity-100 scale-100">
      <div className="space-y-3.5">
        {profileMenu.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            className="text-gray-700 text-md font-semibold group flex items-center gap-2 hover:bg-gray-400/30"
          >
            {name}
          </Link>
        ))}
        <div className="border-b-2 border-gray-300"></div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default UserDropDownMeun;
