import {
  PerformanceAnalyticsQuery,
  PerformanceQuery,
} from "@/types/mutual-fund/performance";
import { RecordQuery } from "@/types/mutual-fund/records";

export const queryKeys = {
  records: (params?: RecordQuery) => ["records", params] as const,

  topPerformers: (params?: PerformanceQuery) =>
    ["top-performers", params] as const,

  categoryLeaderboard: (params?: PerformanceQuery) =>
    ["category-leaderboard", params] as const,

  performanceAnalytics: (params?: PerformanceAnalyticsQuery) =>
    ["performance-analytics", params] as const,
};
