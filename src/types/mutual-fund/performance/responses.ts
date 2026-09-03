// --- Top Performers Types ---

export interface PerformanceWinner {
  name: string;
  category: string;
  yieldValue: number;
}

export interface TopPerformersResponse {
  latestPeriod: string;
  overallBest: PerformanceWinner | null;
  categoryBests: PerformanceWinner[];
}

// --- Category Leaderboard Types ---

export interface RankedPerformanceItem {
  itemId: string;
  itemName: string;
  yieldValue: number;
  rank: number;
}

export interface RankedPerformanceCategory {
  categoryName: string;
  rankedItems: RankedPerformanceItem[];
}

export interface CategoryLeaderboardResponse {
  latestPeriod: string;
  rankedCategories: RankedPerformanceCategory[];
}

// --- Performance Analytics Types ---

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

export interface PerformanceAnalyticsResponse {
  data: PerformanceData;
  timePeriods: string[];
  availablePeriods: string[];
  categoryStats: CategoryStats;
  hasMoreOlder: boolean;
}

// Backward compatibility alias
export type PerformanceResponse = PerformanceAnalyticsResponse;
