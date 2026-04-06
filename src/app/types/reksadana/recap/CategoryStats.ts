export type CategoryStats = Record<
  string,
  Record<string, { min: number; max: number }>
>;
