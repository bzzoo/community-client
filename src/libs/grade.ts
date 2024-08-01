export const getGradeForPoint = (value: number) => {
  if (value < 1000) return "bronze";
  if (value < 1200) return "silver";
  if (value < 1500) return "gold";
  if (value < 1800) return "emerald";
  if (value < 2100) return "diamond";
  return "ruby";
};

export const valueRanges = [
  { min: 0, max: 999, name: "BRONZE" },
  { min: 1000, max: 1199, name: "SILVER" },
  { min: 1200, max: 1499, name: "GOLD" },
  { min: 1500, max: 1799, name: "PLATINUM" },
  { min: 1800, max: 2099, name: "DIAMOND" },
  { min: 2100, max: 2999, name: "RUBY" },
];

export const calculateProgressValue = (value: number) => {
  const range = valueRanges.find((r) => value >= r.min && value <= r.max);
  if (!range) return 0;
  return ((value - range.min) / (range.max - range.min)) * 100;
};
