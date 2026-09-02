import { useEffect } from "react";

export function useFilterSync<TFilter>(
  filters: TFilter,
  syncUrl: (filters: TFilter) => void,
) {
  useEffect(() => {
    syncUrl(filters);
  }, [filters, syncUrl]);
}
