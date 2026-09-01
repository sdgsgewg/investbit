import { createClient } from "@/utils/supabase/server";
import { ENTITY_CONFIG } from "@/config/entities";
import {
  DbItemDetailRow,
  ItemCreateInput,
  ItemDetailResponse,
  ItemFilter,
  ItemUpdateInput,
} from "@/types/mutual-fund/items";
import { ensureUniqueFieldsRepo } from "../helpers/uniqueness";
import { requireEntity } from "../helpers/require-entity";
import { DbItemListRow, GroupedItemFilter } from "@/types/mutual-fund/items";
import {
  GroupedItemListItem,
  ItemEditResponse,
  ItemListResponse,
} from "@/types/mutual-fund/items/responses";
import { createPaginatedResponse } from "@/lib/pagination/response";
import {
  mapGroupedItems,
  mapItemDetailResponse,
  mapItemEditResponse,
  mapItemListItem,
} from "@/lib/mutual-fund/items/mapper";
import { ItemLookupResponse } from "@/types/mutual-fund/items/misc";
import { slugify } from "@/lib/utils/slugify";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["rdItem"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["rdItem"]["table"];
};

function getItemsBaseQuery() {
  return `
    id,
    name,
    slug,
    total_aum,

    category:rd_categories!inner (
      id,
      name
    )
  `;
}

const sortColumnMap = {
  name: "name",
  totalAum: "total_aum",
} as const;

/**
 *
 * @param params
 * @returns ItemListResponse
 */
export async function getItemsRepo(
  params: ItemFilter,
): Promise<ItemListResponse> {
  const supabase = await getSupabase();

  let query = supabase.from(getTable()).select(getItemsBaseQuery(), {
    count: "exact",
  });

  // Filter

  if (params.search) {
    query = query.ilike("name", `%${params.search}%`);
  }

  if (params.categoryId) {
    query = query.eq("category.id", params.categoryId);
  }

  // Sort

  const sortColumn = sortColumnMap[params.sortBy];

  query = query.order(sortColumn, {
    ascending: params.sortOrder === "asc",
  });

  // Pagination

  const from = (params.page - 1) * params.limit;
  const to = from + params.limit - 1;

  query = query.range(from, to);

  // Execute

  const { data, error, count } = await query.overrideTypes<DbItemListRow[]>();

  if (error) throw error;

  return createPaginatedResponse({
    items: (data ?? []).map(mapItemListItem),
    count,
    page: params.page,
    limit: params.limit,
  });
}

/**
 *
 * @param params
 * @returns GroupedItemListItem[]
 */
export async function getGroupedItemsRepo(
  params: GroupedItemFilter,
): Promise<GroupedItemListItem[]> {
  const supabase = await getSupabase();

  // Base Query

  let query = supabase.from(getTable()).select(getItemsBaseQuery());

  // Filter

  if (params.search) {
    query = query.ilike("name", `%${params.search}%`);
  }

  if (params.categoryId) {
    query = query.eq("category.id", params.categoryId);
  }

  // Sort

  query = query.order(params.sortBy, {
    ascending: params.sortOrder === "asc",
  });

  const { data, error } = await query.overrideTypes<DbItemListRow[]>();

  if (error) {
    throw error;
  }

  if (!data?.length) {
    return [];
  }

  return mapGroupedItems(data);
}

function getItemDetailBaseQuery() {
  return `
    *,

    category:rd_categories!rd_items_category_id_fkey (
      id,
      name
    )
  `;
}

/**
 *
 * @param id
 * @returns ItemEditResponse | null
 */
export async function getItemEditRepo(
  id: string,
): Promise<ItemEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(getItemDetailBaseQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbItemDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapItemEditResponse(data);
}

export async function getItemDetailRepo(
  id: string,
): Promise<ItemDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(getItemDetailBaseQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbItemDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapItemDetailResponse(data);
}

/**
 *
 * @param slug
 * @returns ItemLookupResponse | null
 */
export async function getItemLookupRepo(
  slug: string,
): Promise<ItemLookupResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(`id, slug`)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return data;
}

export async function ensureItemUniqueRepo({
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
        message: "Item name already exists",
      },
    ],
    ignoreId,
  });

  return slug;
}

export async function createItemRepo(
  item: ItemCreateInput,
): Promise<ItemDetailResponse> {
  const supabase = await getSupabase();

  const slug = await ensureItemUniqueRepo({
    name: item.name,
  });

  // create
  const { data: insertedItem, error } = await supabase
    .from(getTable())
    .insert({ ...item, slug })
    .select("*")
    .single();

  if (error) throw error;

  const result = await getItemDetailRepo(insertedItem.id);

  if (!result) {
    throw new Error("Failed to retrieve created item");
  }

  return result;
}

export async function updateItemRepo(
  id: string,
  item: ItemUpdateInput,
): Promise<ItemDetailResponse> {
  const supabase = await getSupabase();

  await requireEntity(getItemDetailRepo, id, getLabel());

  const slug = await ensureItemUniqueRepo({
    name: item.name,
    ignoreId: id,
  });

  // update
  const { error } = await supabase
    .from(getTable())
    .update({
      ...item,
      slug,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  const result = await getItemDetailRepo(id);

  if (!result) {
    throw new Error("Failed to retrieve updated item");
  }

  return result;
}

export async function deleteItemRepo(id: string) {
  const supabase = await getSupabase();

  await requireEntity(getItemDetailRepo, id, getLabel());

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;
}
