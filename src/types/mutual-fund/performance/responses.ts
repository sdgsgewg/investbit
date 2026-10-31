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

export interface PerformanceLeaderboardItem {
  itemId: string;
  itemName: string;
  categoryId: string;
  categoryName: string;
  baselineDate: string;
  baselineNav: number;
  endDate: string;
  endNav: number;
  yieldValue: number;
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

  /**
   * Maps each period key to its calculated yield.
   * Periods without a valid baseline or end NAV are omitted.
   */
  yields: Record<string, number>;
}

export interface PerformanceAggregatedData {
  categoryId: string;
  categoryName: string;
  items: PerformanceItem[];
}

export type PerformanceData = PerformanceAggregatedData[];

/**
 * Minimum and maximum yield for each category and period.
 * The first key is categoryId, not categoryName.
 */
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

// --- Performance Analytics RPC Types ---

/**
 * Satu baris untuk satu mutual fund pada satu periode.
 * NAV dapat null apabila record pada tanggal yang diharapkan tidak tersedia.
 */
export interface PerformanceAnalyticsMatrixRow {
  itemId: string;
  itemName: string;
  categoryId: string;
  categoryName: string;

  period: string;

  baselineDate: string;
  baselineNav: number | null;

  endDate: string;
  endNav: number | null;
}
