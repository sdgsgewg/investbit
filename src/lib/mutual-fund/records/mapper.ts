import { DbRecordListRow, RecordListItem } from "@/types/mutual-fund/records";
import { mapItemResponse } from "../items/mapper";

export function mapRecordListItem(record: DbRecordListRow): RecordListItem {
  const { id, date, nav_1d, yield_1d, yield_ytd, item } = record;

  return {
    id,
    date,
    nav1d: nav_1d,
    yield1d: yield_1d,
    yieldYtd: yield_ytd,
    item: mapItemResponse(item),
  };
}
