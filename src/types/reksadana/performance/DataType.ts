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
