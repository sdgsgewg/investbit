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

interface RankedPerformanceItem {
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

  // Maps each period key (e.g. date/week/year) to the calculated yield.
  yields: Record<string, number>;
}

export interface PerformanceAggregatedData {
  categoryName: string;
  items: PerformanceItem[];
}

export type PerformanceData = PerformanceAggregatedData[];

// Stores the minimum and maximum yield for each category and period.
export type CategoryStats = Record<
  string,
  Record<string, { min: number; max: number }>
>;

export interface PerformanceAnalyticsResponse {
  // Aggregated performance data grouped by category and mutual fund item.
  data: PerformanceData;

  // Periods currently displayed after applying range/limit filters.
  timePeriods: string[];

  // All periods available before applying range/limit filters.
  availablePeriods: string[];

  // Minimum and maximum values used by the analytics table for styling/statistics.
  categoryStats: CategoryStats;

  // Indicates whether older periods exist outside the current period limit.
  hasMoreOlder: boolean;
}
