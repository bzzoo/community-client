export const calculateIndicatorStyle = ({
  tabMenu,
  activeTab,
}: {
  tabMenu: string[];
  activeTab: number;
}) => {
  const tabWidth = 100 / tabMenu.length;
  const left = activeTab * tabWidth;
  return { left: `${left}%`, width: `${tabWidth}%` };
};
