import { useEffect } from "react";

interface CrudFilter {
  search: string;
}

export function useCrudFilterSync<TFilter extends CrudFilter>(
  filters: TFilter,
  syncUrl: (filters: TFilter) => void,
) {
  useEffect(() => {
    syncUrl(filters);
  }, [filters, syncUrl]);
}
