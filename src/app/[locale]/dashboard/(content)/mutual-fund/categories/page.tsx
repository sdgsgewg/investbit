"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { useTranslations } from "next-intl";
import { CrudFormTablePage } from "@/components/templates/crud/CrudFormTablePage";
import { useCrudPageTitle } from "@/hooks/crud/useCrudPageTitle";
import { DataColumn } from "@/types/table";
import { createSortHandler } from "@/lib/utils/crud";
import { useCrudFilterSync } from "@/hooks/crud";
import {
  useCategories,
  useCategoryActions,
  useCategoryFilter,
  useCategoryForm,
  useCategorySubmit,
} from "@/hooks/dashboard/mutual-fund/categories";
import { CategoryListItem } from "@/types/mutual-fund/categories";

export default function Page() {
  const t = useTranslations("dashboard.mutualFund.categories");
  const tColumn = useTranslations("dashboard.mutualFund.categories.columns");
  const tCommon = useTranslations("common");

  const { getTitle } = useCrudPageTitle();

  const { filters, debouncedFilters, setFilter, setFilters, syncUrl } =
    useCategoryFilter();

  const { categories, loading, loadError, retrying, retryLoad } = useCategories(
    {
      ...debouncedFilters,
      search: debouncedFilters.search || undefined,
    },
  );

  const {
    form,
    setForm,
    isEditing,
    canSubmit,
    handleEdit,
    buildPayload,
    resetForm,
  } = useCategoryForm();

  const { handleDelete } = useCategoryActions();

  const { isSubmitting, getButtonText, submit } = useCategorySubmit();

  const columns: DataColumn<CategoryListItem>[] = [
    {
      key: "name",
      label: tColumn("name"),
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
      title={getTitle("list", "rdCategory")}
      loading={loading}
      data={categories}
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
