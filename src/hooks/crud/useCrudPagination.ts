interface PaginationFilter {
  page: number;
}

interface PaginationOptions<TFilter extends PaginationFilter> {
  shouldResetPage?: (previous: TFilter, next: TFilter) => boolean;
}

export function useCrudPagination<TFilter extends PaginationFilter>(
  filters: TFilter,
  setFilters: (values: Partial<TFilter>) => void,
  options?: PaginationOptions<TFilter>,
) {
  function update(values: Partial<TFilter>) {
    const next = {
      ...filters,
      ...values,
    };

    if (options?.shouldResetPage?.(filters, next)) {
      values.page = 1;
    }

    setFilters(values);
  }

  return {
    goToPage(page: number) {
      setFilters({ page } as Partial<TFilter>);
    },

    nextPage() {
      setFilters({
        page: filters.page + 1,
      } as Partial<TFilter>);
    },

    previousPage() {
      setFilters({
        page: filters.page - 1,
      } as Partial<TFilter>);
    },

    update,
  };
}
