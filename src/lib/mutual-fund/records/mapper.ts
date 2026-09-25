import { DbRecordListRow, RecordListItem } from "@/types/mutual-fund/records";
import { mapItemResponse } from "../items/mapper";

export function mapRecordListItem(record: DbRecordListRow): RecordListItem {
  const { id, date, nav_1d, item } = record;

  return {
    id,
    date,
    nav1d: nav_1d,
    item: mapItemResponse(item),
  };
}
