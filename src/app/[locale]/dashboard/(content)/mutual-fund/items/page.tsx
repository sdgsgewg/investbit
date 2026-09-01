"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { useTranslations } from "next-intl";
import {
  useItemActions,
  useItemFilter,
  useItems,
} from "@/hooks/dashboard/mutual-fund/items";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import { DataColumn } from "@/types/table";
import { ItemFilter, ItemListItem } from "@/types/mutual-fund/items";
import { createSortHandler } from "@/lib/utils/crud";
import { useCrudFilterDialog } from "@/hooks/crud";
import { useFilterSync } from "@/hooks/filter";
import { CrudListPage } from "@/components/templates/crud";
import ItemFilterContent from "@/components/dashboard/mutual-fund/items/ItemFilterContent";

export default function Page() {
  const tColumn = useTranslations("dashboard.mutualFund.items.columns");
  const tCommon = useTranslations("common");

  const { getTitle } = useCrudPageTitle();

  const {
    filters,
    defaultFilters,
    debouncedFilters,
    updateFilter,
    updateFiltersPartial,
    goToPage,
    changeLimit,
    syncUrl,
  } = useItemFilter();

  const {
    filterOpen,
    setFilterOpen,
    draftFilters,
    updateDraftFilter,
    openFilter,
    applyFilter,
    resetFilter,
  } = useCrudFilterDialog<ItemFilter>(
    filters,
    updateFiltersPartial,
    defaultFilters,
  );

  const {
    items,
    limit,
    totalPages,
    total,
    loading,
    loadError,
    retrying,
    retryLoad,
  } = useItems({
    ...debouncedFilters,
    search: debouncedFilters.search || undefined,
  });

  const { handleCreate, handleEdit, handleDelete } = useItemActions();

  const columns: DataColumn<ItemListItem>[] = [
    {
      key: "name",
      label: tColumn("name"),
      sortable: true,
    },

    {
      key: "category",
      label: tColumn("category"),

      render: (item) => item.category.name,
    },

    {
      key: "totalAum",
      label: tColumn("totalAum"),
      sortable: true,

      render: (item) => item.totalAum,
    },
  ];

  const handleSort = createSortHandler({
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
    updateFiltersPartial,
  });

  // Sync URL on filter
  useFilterSync(debouncedFilters, syncUrl);

  return (
    <CrudListPage
      title={getTitle("list", "rdItem")}
      loading={loading}
      data={items}
      columns={columns}
      headerContent={
        isLikelyConnectionError(loadError) ? (
          <ConnectionErrorAlert retrying={retrying} onRetry={retryLoad} />
        ) : undefined
      }
      actions={{
        onCreate: handleCreate,
        onEdit: handleEdit,
        onDelete: handleDelete,
      }}
      toolbar={{
        searchValue: filters.search,
        searchPlaceholder: tCommon("search.placeholder"),
        onSearchChange: (value) => updateFilter("search", value),
        onFilter: openFilter,
      }}
      filter={{
        content: (
          <ItemFilterContent
            filters={draftFilters}
            updateFilter={updateDraftFilter}
          />
        ),
        open: filterOpen,
        onOpenChange: setFilterOpen,
        onApply: applyFilter,
        onReset: resetFilter,
      }}
      sorting={{
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSort: handleSort,
      }}
      pagination={{
        page: filters.page,
        limit,
        totalPages,
        totalItems: total,
        loading,
        onPageChange: goToPage,
        onLimitChange: changeLimit,
      }}
    />
  );
}
