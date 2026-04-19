export const queryKeys = {
  categories: () => ["categories"] as const,

  items: () => ["items"] as const,

  categoriesWithItems: () => ["categoriesWithItems"] as const,

  records: (date: string) => ["records", date] as const,

  performance: (params: { timeFrame: string; categoryId?: string; periodLimit?: number; }) =>
    ["performance", params.timeFrame, params.categoryId ?? "all", params.periodLimit?.toString() ?? "10"] as const,
};
