import { ConflictError } from "@/lib/errors/http-error";
import { createClient } from "@/utils/supabase/server";

type UniqueField = {
  field: string;
  value: string;
  message: string;
};

type EnsureUniqueFieldsParams = {
  table: string;
  fields: UniqueField[];
  ignoreId?: string;
};

async function getSupabase() {
  return createClient();
}

export async function ensureUniqueFieldsRepo({
  table,
  fields,
  ignoreId,
}: EnsureUniqueFieldsParams): Promise<void> {
  const supabase = await getSupabase();

  const queries = fields.map(({ field, value }) => {
    let query = supabase.from(table).select("id").eq(field, value).limit(1);

    if (ignoreId) {
      query = query.neq("id", ignoreId);
    }

    return query.maybeSingle();
  });

  const results = await Promise.all(queries);

  for (const [index, result] of results.entries()) {
    if (result.error) {
      throw result.error;
    }

    if (result.data) {
      throw new ConflictError(fields[index].message);
    }
  }
}
