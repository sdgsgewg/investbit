import { useCallback, useState } from "react";

import { usePathname, useRouter } from "@/navigation";

interface UseGenericFiltersOptions<TFilter> {
  initialFilter?: TFilter;
  omitDefaultValuesFromUrl?: boolean;
}

export function useGenericFilters<TFilter>(
  defaultFilter: TFilter,
  {
    initialFilter = defaultFilter,
    omitDefaultValuesFromUrl = false,
  }: UseGenericFiltersOptions<TFilter> = {},
) {
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState(initialFilter);

  const createQuery = useCallback(
    (filter: TFilter) => {
      const params = new URLSearchParams();

      Object.entries(filter as object).forEach(([key, value]) => {
        const defaultValue = defaultFilter[key as keyof TFilter];

        const isDefaultValue = value === defaultValue;

        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          !(omitDefaultValuesFromUrl && isDefaultValue)
        ) {
          params.set(key, String(value));
        }
      });

      return params.toString();
    },
    [defaultFilter, omitDefaultValuesFromUrl],
  );

  const syncUrl = useCallback(
    (next: TFilter) => {
      const query = createQuery(next);

      const current = window.location.search.replace(/^\?/, "");

      if (current === query) return;

      router.replace(query ? `?${query}` : pathname);
    },
    [createQuery, pathname, router],
  );

  function updateFilters(updater: (previous: TFilter) => TFilter) {
    setFilters(updater);
  }

  function updateFilter<K extends keyof TFilter>(key: K, value: TFilter[K]) {
    updateFilters((previous) => {
      const next = {
        ...previous,
        [key]: value,
      };

      return next;
    });
  }

  function updateFiltersPartial(values: Partial<TFilter>) {
    updateFilters((previous) => {
      const next = {
        ...previous,
        ...values,
      };

      return next;
    });
  }

  function clearFilters() {
    updateFiltersPartial(defaultFilter);
    syncUrl(defaultFilter);
  }

  return {
    filters,

    updateFilter,
    updateFiltersPartial,

    syncUrl,
    clearFilters,
  };
}
