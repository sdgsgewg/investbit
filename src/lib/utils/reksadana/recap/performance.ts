import { TimeFrameType } from "@/features/reksadana/recap/performance/types/TimeFrameType";

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
