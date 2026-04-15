import { getPerformanceRepo } from "@/lib/repositories/reksadana/recap/performance.repo";
import { performanceQuerySchema } from "@/lib/validations/reksadana/recap/performance.schema";

export async function getPerformanceService(query: unknown) {
  const parsed = performanceQuerySchema.parse(query);

  return await getPerformanceRepo(parsed);
}
