import { SortOrder } from "@/types/sort";

interface CreateSortHandlerOptions<TSortBy extends string> {
  sortBy: TSortBy;
  sortOrder: SortOrder;
  setFilters: (
    values: Partial<{
      sortBy: TSortBy;
      sortOrder: SortOrder;
    }>,
  ) => void;
}

export function createSortHandler<TSortBy extends string>({
  sortBy,
  sortOrder,
  setFilters,
}: CreateSortHandlerOptions<TSortBy>) {
  return (column: string) => {
    if (column === sortBy) {
      setFilters({
        sortOrder: sortOrder === "asc" ? "desc" : "asc",
      });
    } else {
      setFilters({
        sortBy: column as TSortBy,
        sortOrder: "asc",
      });
    }
  };
}
