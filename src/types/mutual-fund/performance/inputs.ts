import { performanceQuerySchema } from "@/lib/validations/mutual-fund/performance.schema";
import z from "zod";

/**
 * Input dari client (dari URL / API route)
 */
export type PerformanceQuery = Partial<z.input<typeof performanceQuerySchema>>;

/**
 * Khusus dipakai setelah parse, termasuk state React
 */
export type PerformanceFilter = z.infer<typeof performanceQuerySchema>;
