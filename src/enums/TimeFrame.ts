export enum TimeFrame {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export const TimeFrameLabels: Record<TimeFrame, string> = {
  [TimeFrame.DAILY]: "Daily",
  [TimeFrame.WEEKLY]: ".Weekly",
  [TimeFrame.MONTHLY]: ".Monthly",
  [TimeFrame.YEARLY]: ".Yearly",
};
