import { Database } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

type RecordInsert = Database["public"]["Tables"]["rd_records"]["Insert"];

export async function getRecordsRepo(params: {
  startDate?: string;
  endDate?: string;
  categoryId?: string | undefined;
}) {
  const supabase = createClient(await cookies());

  let query = supabase
    .from("rd_records")
    .select(
      `
      id,
      item_id,
      date,
      yield_1d,
      yield_ytd,
      rd_items (
        id,
        name,
        category_id,
        rd_categories (
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

export async function upsertRecordsRepo(records: RecordInsert[]) {
  const supabase = createClient(await cookies());

  const { data, error } = await supabase
    .from("rd_records")
    .upsert(records, { onConflict: "item_id, date" });

  if (error) throw error;
  return data;
}
