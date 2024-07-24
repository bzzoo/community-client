"use client";
import React from "react";
import { useTab } from "@/providers/TabProvider";
import { calculateIndicatorStyle } from "@/libs/tabIndicator";
import { cn } from "@/libs/utils";

const TabContent = ({
  tabMenu,
  className = "",
  color = "",
}: {
  tabMenu: string[];
  className?: string;
  color?: string;
}) => {
  const { activeTab, setActiveTab } = useTab();

  return (
    <div className="flex relative">
      {tabMenu.map((menu, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center justify-center px-3 leading-4 whitespace-nowrap",
            `text-${color}`,
            className
          )}
          onClick={() => setActiveTab(index)}
        >
          {menu}
        </div>
      ))}
      <div
        className={cn("absolute top-6 bottom-0 h-0.5 ", `bg-${color}`)}
        style={calculateIndicatorStyle({ tabMenu, activeTab })}
      />
    </div>
  );
};

export default TabContent;
