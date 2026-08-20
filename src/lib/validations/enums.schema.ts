import { TimeFrame } from "@/enums/TimeFrame";
import z from "zod";

// Mutual Fund

// Item

export const itemSortBySchema = z.enum(["name", "created_at"]);

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

// Filter, Sort, Pagination
export const sortOrderSchema = z.enum(["asc", "desc"]);
