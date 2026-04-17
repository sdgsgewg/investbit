export const queryKeys = {
  categories: () => ["categories"] as const,

  records: (date: string) => ["records", date] as const,

  performance: (params: { timeFrame: string; categoryId?: string }) =>
    ["performance", params.timeFrame, params.categoryId ?? "all"] as const,
};
