import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";

type ItemInsert = Database["public"]["Tables"]["rd_items"]["Insert"];

export async function getItemsRepo(params: {
  name?: string;
  category_id?: string;
}) {
  const supabase = createClient(await cookies());

  let query = supabase
    .from("rd_items")
    .select(
      `
      id,
      name,
      category_id,
      rd_categories (
        id,
        name
      )
    `,
    )
    .order("name");

  if (params.name) {
    query = query.ilike("name", `%${params.name}%`);
  }

  if (params.category_id) {
    query = query.eq("category_id", params.category_id);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
}

export async function createItemsRepo(items: ItemInsert[]) {
  const supabase = createClient(await cookies());

  const item = items[0]; // Karena kita hanya insert 1 item

  // cek apakah name sudah dipakai item lain
  const { data: existing } = await supabase
    .from("rd_items")
    .select("id")
    .eq("name", item.name)
    .maybeSingle();

  if (existing) {
    throw new Error("Item name already exists");
  }

  // create
  const { data: result, error } = await supabase.from("rd_items").insert(items);

  if (error) throw error;
  return result;
}

export async function updateItemRepo(
  id: string,
  data: { name: string; category_id: string },
) {
  const supabase = createClient(await cookies());

  // cek apakah name sudah dipakai item lain
  const { data: existing } = await supabase
    .from("rd_items")
    .select("id")
    .eq("name", data.name)
    .neq("id", id)
    .maybeSingle();

  if (existing) {
    throw new Error("Item name already exists");
  }

  // update
  const { data: result, error } = await supabase
    .from("rd_items")
    .update({ name: data.name, category_id: data.category_id })
    .eq("id", id);

  if (error) throw error;
  return result;
}

export async function deleteItemRepo(id: string) {
  const supabase = createClient(await cookies());

  const { error } = await supabase.from("rd_items").delete().eq("id", id);

  if (error) throw error;
}
