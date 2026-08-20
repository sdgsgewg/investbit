import { createClient } from "@/utils/supabase/server";
import { ENTITY_CONFIG } from "@/config/entities";
import {
  CategoryCreateInput,
  CategoryDetailResponse,
  CategoryFilter,
  CategoryListItem,
  CategoryUpdateInput,
  DbCategoryDetailRow,
  DbCategoryListRow,
} from "@/types/mutual-fund/categories";
import { ensureUniqueRecord } from "../helpers/uniqueness";
import { requireEntity } from "../helpers/require-entity";
import {
  mapCategoryDetailResponse,
  mapCategoryListItem,
} from "@/lib/mutual-fund/categories/mapper";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["rdCategory"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["rdCategory"]["table"];
};

function getCategoriesBaseQuery() {
  return `
    id,
    name
  `;
}

export async function getCategoriesRepo(
  params: CategoryFilter,
): Promise<CategoryListItem[]> {
  const supabase = await getSupabase();

  let query = supabase
    .from(getTable())
    .select(getCategoriesBaseQuery())
    .order("name");

  // Filter

  if (params.search) {
    query = query.ilike("name", `%${params.search}%`);
  }

  // Sort

  query = query.order(params.sortBy, {
    ascending: params.sortOrder === "asc",
  });

  // Execute

  const { data, error } = await query.overrideTypes<DbCategoryListRow[]>();

  if (error) throw error;

  return data.map(mapCategoryListItem);
}

function getCategoryDetailBaseQuery() {
  return `
    *
  `;
}

export async function getCategoryDetailRepo(
  id: string,
): Promise<CategoryDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(getCategoryDetailBaseQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbCategoryDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapCategoryDetailResponse(data);
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

  await requireEntity(getCategoryDetailRepo, id, getLabel());

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

  await requireEntity(getCategoryDetailRepo, id, getLabel());

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;
}
