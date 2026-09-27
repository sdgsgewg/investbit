import {
  performanceAnalyticsQuerySchema,
  performanceQuerySchema,
} from "@/lib/validations/mutual-fund/performance.schema";
import z from "zod";

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
