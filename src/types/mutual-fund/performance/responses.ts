export interface PerformanceItem {
  itemId: string;
  itemName: string;
  yields: Record<string, number>;
}

export interface PerformanceAggregatedData {
  categoryName: string;
  items: PerformanceItem[];
}

export type PerformanceData = PerformanceAggregatedData[];

export type CategoryStats = Record<
  string,
  Record<string, { min: number; max: number }>
>;

export type PerformanceResponse = {
  data: PerformanceData;
  timePeriods: string[];
  availablePeriods: string[];
  categoryStats: CategoryStats;
  hasMoreOlder: boolean;
};
