import { getPerformanceRepo } from "@/lib/repositories/mutual-fund/recap/performance.repo";
import { performanceQuerySchema } from "@/lib/validations/mutual-fund/performance.schema";

export async function getPerformanceService(query: unknown) {
  const parsed = performanceQuerySchema.parse(query);

  return getPerformanceRepo(parsed);
}
