import { TimeFrame } from "@/enums/TimeFrame";
import z from "zod";

// Mutual Fund

// Item

export const categorySortBySchema = z.enum(["name"]);

// Item

export const itemSortBySchema = z.enum(["name", "totalAum"]);

// Performance

export const timeFrameSchema = z.enum(TimeFrame).default(TimeFrame.WEEKLY);

// Filter, Sort, Pagination
export const sortOrderSchema = z.enum(["asc", "desc"]);
