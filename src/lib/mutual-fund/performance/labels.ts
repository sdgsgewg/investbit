import { TimeFrame } from "@/enums/TimeFrame";
import { Translate } from "@/types/translate";

export const getTimeFrameLabel = (
  timeFrame: TimeFrame,
  tTimeFrame: Translate,
): string => {
  switch (timeFrame) {
    case TimeFrame.DAILY:
      return tTimeFrame("daily.label");
    case TimeFrame.WEEKLY:
      return tTimeFrame("weekly.label");
    case TimeFrame.MONTHLY:
      return tTimeFrame("monthly.label");
    case TimeFrame.YTD:
      return tTimeFrame("ytd.label");
    case TimeFrame.YEARLY:
      return tTimeFrame("yearly.label");
  }
};
