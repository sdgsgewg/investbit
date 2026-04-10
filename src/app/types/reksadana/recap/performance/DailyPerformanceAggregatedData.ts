export type DailyPerformanceAggregatedData = {
  categoryName: string;
  items: {
    itemId: string;
    itemName: string;
    dailyYields: Record<string, number>; // date: yield_1d
  }[];
};
