import { DbItemRow } from "../items";
import { Record } from "../records";

// Record List

export type DbRecordListRow = Pick<
  Record,
  "id" | "date" | "nav_1d" | "yield_1d" | "yield_ytd"
> & {
  item: DbItemRow;
};
