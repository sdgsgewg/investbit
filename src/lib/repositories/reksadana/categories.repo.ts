import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { CategoryData } from "@/features/reksadana/categories/types/CategoryData";

type CategoryMutationInput = {
  name: string;
};

type RawCategoryRow = {
  id: string;
  name: string | null;
};

export async function getCategoriesRepo(params: {
  name?: string;
}): Promise<CategoryData[]> {
  const supabase = createClient(await cookies());

  let query = supabase
    .from("rd_categories")
    .select(
      `
      id,
      name
    `,
    )
    .order("name");

  if (params.name) {
    query = query.ilike("name", `%${params.name}%`);
  }

  const { data, error } = await query;

  if (error) throw error;

  const mappedData: CategoryData[] =
    ((data ?? []) as RawCategoryRow[]).map((category) => ({
      id: category.id,
      name: category.name ?? "",
      created_at: "",
      updated_at: "",
    }));

  return mappedData;
}

export async function createCategoryRepo(category: CategoryMutationInput) {
  const supabase = createClient(await cookies());

  // cek apakah name sudah dipakai category lain
  const { data: existing } = await supabase
    .from("rd_categories")
    .select("id")
    .eq("name", category.name)
    .maybeSingle();

  if (existing) {
    throw new Error("Category name already exists");
  }

  // create
  const { data: result, error } = await supabase
    .from("rd_categories")
    .insert(category);

  if (error) throw error;
  return result;
}

export async function updateCategoryRepo(id: string, data: CategoryMutationInput) {
  const supabase = createClient(await cookies());

  // cek apakah name sudah dipakai category lain
  const { data: existing } = await supabase
    .from("rd_categories")
    .select("id")
    .eq("name", data.name)
    .neq("id", id)
    .maybeSingle();

  if (existing) {
    throw new Error("Category name already exists");
  }

  // update
  const { data: result, error } = await supabase
    .from("rd_categories")
    .update({ name: data.name })
    .eq("id", id);

  if (error) throw error;
  return result;
}

export async function deleteCategoryRepo(id: string) {
  const supabase = createClient(await cookies());

  const { error } = await supabase.from("rd_categories").delete().eq("id", id);

  if (error) throw error;
}
