import { ItemResponse } from "../items/responses";
import { Record } from "./database";

// API Response DTO

export type RecordListItem = Pick<Record, "id" | "date"> & {
  nav1d: number | null;
  yield1d: number | null;
  yieldYtd: number | null;
  item: ItemResponse;
};
