import { CategoryStats } from "./CategoryStats";
import { PerformanceData } from "./DataType";

export type PerformanceResponse = {
  data: PerformanceData;
  timePeriods: string[];
  categoryStats: CategoryStats;
  hasMoreOlder: boolean;
};
