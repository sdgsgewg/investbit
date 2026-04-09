export type YearlyPerformanceAggregatedData = {
  categoryName: string;
  items: {
    itemId: string;
    itemName: string;
    yearlyYields: { [year: string]: number };
  }[];
};
