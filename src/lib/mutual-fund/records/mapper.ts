import { DbRecordListRow, RecordListItem } from "@/types/mutual-fund/records";
import { mapItemResponse } from "../items/mapper";

export function mapRecordListItem(record: DbRecordListRow): RecordListItem {
  const { id, date, yield_1d, yield_ytd, item } = record;

  return {
    id,
    date,
    yield1d: yield_1d,
    yieldYtd: yield_ytd,
    item: mapItemResponse(item),
  };
}
