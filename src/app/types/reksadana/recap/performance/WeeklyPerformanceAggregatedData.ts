export type WeeklyPerformanceAggregatedData = {
  categoryName: string;
  items: {
    itemId: string;
    itemName: string;
    weeklyYields: { [weekStart: string]: number };
  }[];
};
