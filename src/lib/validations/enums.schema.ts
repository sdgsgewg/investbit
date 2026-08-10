import { TimeFrame } from "@/enums/TimeFrame";
import z from "zod";

// Performance

export const TimeFrameSchema = z
  .enum([
    TimeFrame.DAILY,
    TimeFrame.WEEKLY,
    TimeFrame.MONTHLY,
    TimeFrame.YTD,
    TimeFrame.YEARLY,
  ])
  .default(TimeFrame.WEEKLY);
