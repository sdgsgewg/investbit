export enum TimeFrame {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YTD = "ytd",
  YEARLY = "yearly",
}

export const TimeFrameLabels: Record<TimeFrame, string> = {
  [TimeFrame.DAILY]: "Daily",
  [TimeFrame.WEEKLY]: ".Weekly",
  [TimeFrame.MONTHLY]: ".Monthly",
  [TimeFrame.YTD]: "YTD",
  [TimeFrame.YEARLY]: ".Yearly",
};
