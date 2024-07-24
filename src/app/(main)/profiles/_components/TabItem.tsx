import TabContent from "@/components/TabContent";

const tabMenu = ["공유글", "질문 / 답변", "포인트 내역"];

const TabItems = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between w-full">
        <TabContent
          tabMenu={tabMenu}
          className="text-[12px] font-normal"
          color="[rgb(66,143,143)]"
        />
      </div>
      <div className="w-full h-[1px] mt-2 bg-gray-400/30"></div>
    </div>
  );
};

export default TabItems;
