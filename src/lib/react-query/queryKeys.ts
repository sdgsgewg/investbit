import { PerformanceQuery } from "@/types/mutual-fund/performance";
import { RecordQuery } from "@/types/mutual-fund/records";

export const queryKeys = {
  records: (params?: RecordQuery) => ["records", params] as const,

  performance: (params?: PerformanceQuery) => ["performance", params] as const,
};
