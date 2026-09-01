import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { itemKeys } from "@/lib/react-query/keys";
import { fetchItemEdit } from "@/lib/api/mutual-fund/items";

export function useItemEdit(id: string, enabled = true) {
  const query = useQuery({
    queryKey: itemKeys.edit(id),
    queryFn: () => fetchItemEdit(id!),
    enabled: enabled && !!id,
    ...queryConfig,
  });

  return {
    ...query,
    item: query.data ?? null,
  };
}
