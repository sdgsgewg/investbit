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
import { ensureUniqueFieldsRepo } from "../helpers/uniqueness";
import { requireEntity } from "../helpers/require-entity";
import {
  mapCategoryDetailResponse,
  mapCategoryListItem,
} from "@/lib/mutual-fund/categories/mapper";
import { Option } from "@/types/option";
import { mapEntityOption } from "@/lib/entities/mapper";
import { slugify } from "@/lib/utils/slugify";

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

  let query = supabase.from(getTable()).select(getCategoriesBaseQuery());

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

/**
 *
 * @returns Option[]
 */
export async function getCategoryOptionsRepo(): Promise<Option[]> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(
      `
      id,
      name
    `,
    )
    .order("name", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) return [];

  return data.map((data) => mapEntityOption(data));
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

export async function ensureCategoryUniqueRepo({
  name,
  ignoreId,
}: {
  name: string;
  ignoreId?: string;
}): Promise<string> {
  const slug = slugify(name);

  await ensureUniqueFieldsRepo({
    table: getTable(),
    fields: [
      {
        field: "slug",
        value: slug,
        message: "Category name already exists",
      },
    ],
    ignoreId,
  });

  return slug;
}

export async function createCategoryRepo(
  category: CategoryCreateInput,
): Promise<CategoryDetailResponse> {
  const supabase = await getSupabase();

  const slug = await ensureCategoryUniqueRepo({
    name: category.name,
  });

  // create
  const { data: insertedCategory, error } = await supabase
    .from(getTable())
    .insert({ ...category, slug })
    .select("*")
    .single();

  if (error) throw error;

  const result = await getCategoryDetailRepo(insertedCategory.id);

  if (!result) {
    throw new Error("Failed to retrieve created category");
  }

  return result;
}

export async function updateCategoryRepo(
  id: string,
  category: CategoryUpdateInput,
): Promise<CategoryDetailResponse> {
  const supabase = await getSupabase();

  await requireEntity(getCategoryDetailRepo, id, getLabel());

  const slug = await ensureCategoryUniqueRepo({
    name: category.name,
    ignoreId: id,
  });

  const { error } = await supabase
    .from(getTable())
    .update({
      name: category.name,
      slug,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  const result = await getCategoryDetailRepo(id);

  if (!result) {
    throw new Error("Failed to retrieve updated category");
  }

  return result;
}

export async function deleteCategoryRepo(id: string) {
  const supabase = await getSupabase();

  await requireEntity(getCategoryDetailRepo, id, getLabel());

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;
}
