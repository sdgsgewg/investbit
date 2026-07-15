import { createClient } from "@/utils/supabase/server";
import { ENTITY_CONFIG } from "@/config/entities";
import {
  GetItemsParams,
  ItemCreateInput,
  ItemDetailResponse,
  ItemListItem,
  ItemUpdateInput,
} from "@/types/reksadana/item";
import { ensureUniqueRecord } from "../helpers/uniqueness";
import { requireEntity } from "../helpers/require-entity";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["rdItem"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["rdItem"]["table"];
};

export async function getItemsRepo(
  params: GetItemsParams,
): Promise<ItemListItem[]> {
  const supabase = await getSupabase();

  let query = supabase
    .from(getTable())
    .select(
      `
        *,
        category:rd_categories (
          id,
          name
        )
      `,
    )
    .order("category(name)", { ascending: true })
    .order("name", { ascending: true });

  if (params.name) {
    query = query.ilike("name", `%${params.name}%`);
  }

  if (params.category_id) {
    query = query.eq("category_id", params.category_id);
  }

  const { data, error } = await query;

  if (error) throw error;

  return (data ?? []).map((item) => ({
    ...item,
  }));
}

export async function getItemByIdRepo(
  id: string,
): Promise<ItemDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(
      `
      *,
      category:rd_categories!rd_items_category_id_fkey(
        id,
        name
      )
    `,
    )
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function createItemRepo(
  item: ItemCreateInput,
): Promise<ItemDetailResponse> {
  const supabase = await getSupabase();

  await ensureUniqueRecord({
    table: getTable(),
    name: item.name,
  });

  // create
  const { data, error } = await supabase
    .from(getTable())
    .insert({ ...item })
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function updateItemRepo(
  id: string,
  item: ItemUpdateInput,
): Promise<ItemDetailResponse> {
  const supabase = await getSupabase();

  await requireEntity(getItemByIdRepo, id, getLabel());

  // cek apakah name sudah dipakai item lain
  await ensureUniqueRecord({
    table: getTable(),
    name: item.name,
    ignoreId: id,
  });

  // update
  const { data, error } = await supabase
    .from(getTable())
    .update({
      name: item.name,
      category_id: item.category_id,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function deleteItemRepo(id: string) {
  const supabase = await getSupabase();

  await requireEntity(getItemByIdRepo, id, getLabel());

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;
}
