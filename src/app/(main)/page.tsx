import CategoryDecider from "@/components/CategoryDecider";
import NewPostButton from "@/components/NewPostButton";
import TabItems from "@/components/TabItems";
import TabProvider from "@/providers/TabProvider";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-6">
      <NewPostButton />
      <TabProvider>
        <TabItems />
        <CategoryDecider />
      </TabProvider>
    </div>
  );
};

export default page;
