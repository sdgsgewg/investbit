import { PerformanceQuery } from "@/types/mutual-fund/performance";
import { RecordQuery } from "@/types/mutual-fund/records";

export const queryKeys = {
  categories: () => ["categories"] as const,

  items: () => ["items"] as const,

  categoriesWithItems: () => ["categoriesWithItems"] as const,

  records: (params?: RecordQuery) => ["records", params] as const,

  performance: (params?: PerformanceQuery) => ["performance", params] as const,
};
