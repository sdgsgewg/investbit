import { TimeFrameType } from "@/types/reksadana/recap/performance/TimeFrameType";

const PERFORMANCE_KEY_MAP = {
  daily: "dailyYields",
  weekly: "weeklyYields",
  monthly: "monthlyYields",
  ytd: "ytdYields",
  yearly: "yearlyYields",
} as const;

export function getPerformanceKey(type: TimeFrameType) {
  return PERFORMANCE_KEY_MAP[type];
}