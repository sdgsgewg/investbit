export type DailyPerformanceAggregatedData = {
  categoryName: string;
  items: {
    itemId: string;
    itemName: string;
    dailyYields: Record<string, number>; // date: yield_1d
  }[];
};

export type WeeklyPerformanceAggregatedData = {
  categoryName: string;
  items: {
    itemId: string;
    itemName: string;
    weeklyYields: { [weekStart: string]: number };
  }[];
};


export type MonthlyPerformanceAggregatedData = {
  categoryName: string;
  items: {
    itemId: string;
    itemName: string;
    monthlyYields: { [monthStart: string]: number };
  }[];
};

export type YtdPerformanceAggregatedData = {
  categoryName: string;
  items: {
    itemId: string;
    itemName: string;
    ytdYields: Record<string, number>; // year: sum yield_ytd
  }[];
};

export type YearlyPerformanceAggregatedData = {
  categoryName: string;
  items: {
    itemId: string;
    itemName: string;
    yearlyYields: { [year: string]: number };
  }[];
};


export type DataType =
  | DailyPerformanceAggregatedData[]
  | WeeklyPerformanceAggregatedData[]
  | MonthlyPerformanceAggregatedData[]
  | YtdPerformanceAggregatedData[]
  | YearlyPerformanceAggregatedData[];
