export enum TimeFrameType {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YTD = "ytd",
  YEARLY = "yearly",
}

export const TimeFrameTypeLabels: Record<TimeFrameType, string> = {
  [TimeFrameType.DAILY]: "Daily",
  [TimeFrameType.WEEKLY]: ".Weekly",
  [TimeFrameType.MONTHLY]: ".Monthly",
  [TimeFrameType.YTD]: "YTD",
  [TimeFrameType.YEARLY]: ".Yearly",
};
