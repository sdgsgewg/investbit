import { ENTITY_CONFIG } from "@/config/entities";
import { mapRecordListItem } from "@/lib/mutual-fund/records/mapper";
import {
  DbRecordListRow,
  RecordFilter,
  RecordListItem,
  UpsertRecordsInput,
} from "@/types/mutual-fund/records";
import { createClient } from "@/utils/supabase/server";

async function getSupabase() {
  return createClient();
}

export const getRecordTable = () => {
  return ENTITY_CONFIG["rdRecord"]["table"];
};

export function getRecordsBaseQuery() {
  return `
    id,
    date,
    yield_1d,
    yield_ytd,

    item:rd_items!rd_records_item_id_fkey!inner (
      id,
      name,

      category:rd_categories!rd_items_category_id_fkey!inner (
        id,
        name
      )
    )
  `;
}

export async function getRecordsRepo(
  params: RecordFilter,
): Promise<RecordListItem[]> {
  const supabase = await getSupabase();

  let query = supabase
    .from(getRecordTable())
    .select(getRecordsBaseQuery())
    .order("date");

  // Filter

  if (params.startDate) {
    query = query.gte("date", params.startDate);
  }

  if (params.endDate) {
    query = query.lte("date", params.endDate);
  }

  if (params.categoryId) {
    query = query.eq("rd_items.category_id", params.categoryId);
  }

  const { data, error } = await query.overrideTypes<DbRecordListRow[]>();

  if (error) throw error;
  if (!data || data.length === 0) return [];

  return data.map(mapRecordListItem);
}

export async function upsertRecordsRepo(records: UpsertRecordsInput) {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getRecordTable())
    .upsert(records, { onConflict: "item_id, date" });

  if (error) throw error;

  return data;
}
