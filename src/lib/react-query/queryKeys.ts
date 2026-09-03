import {
  CategoryLeaderboardQuery,
  PerformanceAnalyticsQuery,
  PerformanceQuery,
  TopPerformersQuery,
} from "@/types/mutual-fund/performance";
import { RecordQuery } from "@/types/mutual-fund/records";

export const queryKeys = {
  records: (params?: RecordQuery) => ["records", params] as const,

  topPerformers: (params?: TopPerformersQuery) =>
    ["top-performers", params] as const,

  categoryLeaderboard: (params?: CategoryLeaderboardQuery) =>
    ["category-leaderboard", params] as const,

  performanceAnalytics: (params?: PerformanceAnalyticsQuery) =>
    ["performance-analytics", params] as const,

  // Backward compatibility alias
  performance: (params?: PerformanceQuery) =>
    ["performance-analytics", params] as const,
};
