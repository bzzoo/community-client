"use client";

import { useTab } from "@/providers/TabProvider";

const tabMenu = ["전체", "공유", "질문"];

const TabItems = () => {
  const { activeTab, setActiveTab } = useTab();

  const calculateIndicatorStyle = () => {
    const tabWidth = 100 / tabMenu.length;
    const left = activeTab * tabWidth;
    return { left: `${left}%`, width: `${tabWidth}%` };
  };

  return (
    <div className="w-full">
      <div className="flex justify-between w-full">
        <div className="flex relative">
          {tabMenu.map((menu, index) => (
            <div
              key={index}
              className={`flex items-center justify-center px-3 text-[12px] leading-4 whitespace-nowrap ${
                activeTab === index
                  ? "text-[rgb(66,143,143)] font-medium"
                  : "text-[rgb(150,152,152)] font-normal"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {menu}
            </div>
          ))}

          <div
            className="absolute top-6 bottom-0 left-0 h-0.5 bg-[rgb(66,143,143)]"
            style={calculateIndicatorStyle()}
          />
        </div>
      </div>
      <div className="w-full h-[1px] mt-2 bg-gray-400/30"></div>
    </div>
  );
};

export default TabItems;
