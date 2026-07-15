import { ENTITY_CONFIG } from "@/config/entities";
import { GetRecordsParams, ItemUpsertInput } from "@/types/reksadana/record";
import { createClient } from "@/utils/supabase/server";

async function getSupabase() {
  return createClient();
}

const getTable = () => {
  return ENTITY_CONFIG["rdRecord"]["table"];
};

export async function getRecordsRepo(params: GetRecordsParams) {
  const supabase = await getSupabase();

  let query = supabase
    .from(getTable())
    .select(
      `
      id,
      item_id,
      date,
      yield_1d,
      yield_ytd,
      items: rd_items(
        id,
        name,
        category_id,
        category: rd_categories(
          id,
          name
        )
      )
    `,
    )
    .order("date");

  if (params.startDate) {
    query = query.gte("date", params.startDate);
  }

  if (params.endDate) {
    query = query.lte("date", params.endDate);
  }

  if (params.categoryId) {
    query = query.eq("rd_items.category_id", params.categoryId);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
}

export async function upsertRecordsRepo(records: ItemUpsertInput) {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .upsert(records, { onConflict: "item_id, date" });

  if (error) throw error;

  return data;
}
