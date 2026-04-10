export type MonthlyPerformanceAggregatedData = {
  categoryName: string;
  items: {
    itemId: string;
    itemName: string;
    monthlyYields: { [monthStart: string]: number };
  }[];
};
