export type YtdPerformanceAggregatedData = {
  categoryName: string;
  items: {
    itemId: string;
    itemName: string;
    ytdYields: Record<string, number>; // year: sum yield_ytd
  }[];
};
