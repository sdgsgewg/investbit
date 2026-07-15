import { createClient } from "@/utils/supabase/server";
import { ENTITY_CONFIG } from "@/config/entities";
import {
  CategoryCreateInput,
  CategoryDetailResponse,
  CategoryListItem,
  CategoryUpdateInput,
  GetCategoriesParams,
} from "@/types/reksadana/category";
import { ensureUniqueRecord } from "../helpers/uniqueness";
import { requireEntity } from "../helpers/require-entity";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["rdCategory"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["rdCategory"]["table"];
};

export async function getCategoriesRepo(
  params: GetCategoriesParams,
): Promise<CategoryListItem[]> {
  const supabase = await getSupabase();

  let query = supabase.from(getTable()).select("*").order("name");

  if (params.name) {
    query = query.ilike("name", `%${params.name}%`);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data ?? [];
}

export async function getCategoryByIdRepo(
  id: string,
): Promise<CategoryDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function createCategoryRepo(
  category: CategoryCreateInput,
): Promise<CategoryDetailResponse> {
  const supabase = await getSupabase();

  await ensureUniqueRecord({
    table: getTable(),
    name: category.name,
  });

  // create
  const { data, error } = await supabase
    .from(getTable())
    .insert({ ...category })
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function updateCategoryRepo(
  id: string,
  category: CategoryUpdateInput,
): Promise<CategoryDetailResponse> {
  const supabase = await getSupabase();

  await requireEntity(getCategoryByIdRepo, id, getLabel());

  await ensureUniqueRecord({
    table: getTable(),
    name: category.name,
    ignoreId: id,
  });

  const { data, error } = await supabase
    .from(getTable())
    .update({
      name: category.name,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function deleteCategoryRepo(id: string) {
  const supabase = await getSupabase();

  await requireEntity(getCategoryByIdRepo, id, getLabel());

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;
}
