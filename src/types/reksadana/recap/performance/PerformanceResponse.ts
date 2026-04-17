import { CategoryStats } from "./CategoryStats";
import { DataType } from "./DataType";

export type PerformanceResponse = {
  data: DataType;
  timePeriods: string[];
  categoryStats: CategoryStats;
};
