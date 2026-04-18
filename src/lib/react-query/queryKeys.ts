export const queryKeys = {
  categories: () => ["categories"] as const,

  items: () => ["items"] as const,

  categoriesWithItems: () => ["categoriesWithItems"] as const,

  records: (date: string) => ["records", date] as const,

  performance: (params: { timeFrame: string; categoryId?: string }) =>
    ["performance", params.timeFrame, params.categoryId ?? "all"] as const,
};
