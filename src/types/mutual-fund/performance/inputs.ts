import {
  categoryLeaderboardQuerySchema,
  performanceAnalyticsQuerySchema,
  performanceQuerySchema,
  topPerformersQuerySchema,
} from "@/lib/validations/mutual-fund/performance.schema";
import z from "zod";

// --- Top Performers Inputs ---
export type TopPerformersQuery = Partial<
  z.input<typeof topPerformersQuerySchema>
>;
export type TopPerformersFilter = z.infer<typeof topPerformersQuerySchema>;

// --- Category Leaderboard Inputs ---
export type CategoryLeaderboardQuery = Partial<
  z.input<typeof categoryLeaderboardQuerySchema>
>;
export type CategoryLeaderboardFilter = z.infer<
  typeof categoryLeaderboardQuerySchema
>;

// --- Performance Analytics Inputs ---
export type PerformanceAnalyticsQuery = Partial<
  z.input<typeof performanceAnalyticsQuerySchema>
>;
export type PerformanceAnalyticsFilter = z.infer<
  typeof performanceAnalyticsQuerySchema
>;

// Backward compatibility aliases
export type PerformanceQuery = Partial<z.input<typeof performanceQuerySchema>>;
export type PerformanceFilter = z.infer<typeof performanceQuerySchema>;
