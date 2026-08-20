"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { useTranslations } from "next-intl";
import { useCategories } from "@/hooks/dashboard/mutual-fund/categories";
import {
  useItemActions,
  useItemForm,
  useItems,
  useItemSubmit,
} from "@/hooks/dashboard/mutual-fund/items";
import { getCategoryOptions } from "@/lib/mutual-fund/categories/options";
import { CrudFormTablePage } from "@/components/templates/crud/CrudFormTablePage";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import useItemFilter from "@/hooks/dashboard/mutual-fund/items/useItemFilter";
import { DataColumn } from "@/types/table";
import { ItemListItem } from "@/types/mutual-fund/items";
import { createSortHandler } from "@/lib/utils/crud";
import { useCrudFilterSync } from "@/hooks/crud";

export default function ItemsManagementPage() {
  const t = useTranslations("dashboard.mutualFund.items");
  const tColumn = useTranslations("dashboard.mutualFund.items.columns");
  const tCommon = useTranslations("common");

  const { getTitle } = useCrudPageTitle();

  const { filters, debouncedFilters, setFilter, setFilters, syncUrl } =
    useItemFilter();

  const { items, loading, retrying, loadError, retryLoad } = useItems({
    ...debouncedFilters,
    search: debouncedFilters.search || undefined,
  });

  const {
    form,
    setForm,
    isEditing,
    canSubmit,
    handleEdit,
    buildPayload,
    resetForm,
  } = useItemForm();

  const { handleDelete } = useItemActions();

  const { isSubmitting, getButtonText, submit } = useItemSubmit();

  const { categories } = useCategories();

  const categoryOptions = getCategoryOptions({ categories });

  const columns: DataColumn<ItemListItem>[] = [
    {
      key: "name",
      label: tColumn("name"),
      className: "min-w-[300px]",
      sortable: true,
    },
    {
      key: "category",
      label: tColumn("category"),
      className: "min-w-[300px]",
      sortable: true,
    },
  ];

  const handleSort = createSortHandler({
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
    setFilters,
  });

  // Sync URL on filter
  useCrudFilterSync(debouncedFilters, syncUrl);

  return (
    <CrudFormTablePage
      title={getTitle("list", "rdItem")}
      loading={loading}
      data={items}
      columns={columns}
      headerContent={
        isLikelyConnectionError(loadError) ? (
          <ConnectionErrorAlert retrying={retrying} onRetry={retryLoad} />
        ) : undefined
      }
      form={{
        formFields: [
          {
            name: "name",
            label: t("form.labels.name"),
            placeholder: t("form.placeholders.name"),
            type: "text",
            required: true,
          },
          {
            name: "category",
            label: t("form.labels.category"),
            placeholder: t("form.placeholders.category"),
            type: "select",
            options: categoryOptions,
            required: true,
          },
        ],
        form,
        setForm,
        canSubmit,
        onSubmit: () => {
          submit({
            id: isEditing ? form.id : undefined,
            payload: buildPayload(),
            onSuccess: resetForm,
          });
        },
        isEditing,
        isSubmitting,
        buttonText: getButtonText(isEditing),
        resetForm,
      }}
      actions={{
        onEdit: handleEdit,
        onDelete: handleDelete,
      }}
      toolbar={{
        searchValue: filters.search,
        searchPlaceholder: tCommon("search.placeholder"),
        onSearchChange: (value) => setFilter("search", value),
      }}
      sorting={{
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSort: handleSort,
      }}
    />
  );
}
