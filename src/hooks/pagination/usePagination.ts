interface PaginationFilter {
  page: number;
  limit: number;
}

export function usePagination<TFilter extends PaginationFilter>(
  filters: TFilter,
  updateFiltersPartial: (values: Partial<TFilter>) => void,
) {
  function goToPage(page: number) {
    updateFiltersPartial({ page } as Partial<TFilter>);
  }

  function nextPage() {
    updateFiltersPartial({
      page: filters.page + 1,
    } as Partial<TFilter>);
  }

  function previousPage() {
    updateFiltersPartial({
      page: filters.page - 1,
    } as Partial<TFilter>);
  }

  function changeLimit(limit: number) {
    updateFiltersPartial({
      limit,
      page: 1,
    } as Partial<TFilter>);
  }

  return {
    goToPage,
    nextPage,
    previousPage,
    changeLimit,
  };
}
