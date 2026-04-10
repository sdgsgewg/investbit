import { DailyPerformanceAggregatedData } from "./DailyPerformanceAggregatedData";
import { MonthlyPerformanceAggregatedData } from "./MonthlyPerformanceAggregatedData";
import { WeeklyPerformanceAggregatedData } from "./WeeklyPerformanceAggregatedData";
import { YearlyPerformanceAggregatedData } from "./YearlyPerformanceAggregatedData";
import { YtdPerformanceAggregatedData } from "./YtdPerformanceAggregatedData";

export type DataType =
  | DailyPerformanceAggregatedData[]
  | WeeklyPerformanceAggregatedData[]
  | MonthlyPerformanceAggregatedData[]
  | YtdPerformanceAggregatedData[]
  | YearlyPerformanceAggregatedData[];
