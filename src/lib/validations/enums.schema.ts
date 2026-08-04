import { TimeFrameType } from "@/enums/TimeFrameType";
import z from "zod";

// Performance

export const timeFrameTypeSchema = z
  .enum([
    TimeFrameType.DAILY,
    TimeFrameType.WEEKLY,
    TimeFrameType.MONTHLY,
    TimeFrameType.YTD,
    TimeFrameType.YEARLY,
  ])
  .default(TimeFrameType.WEEKLY);
