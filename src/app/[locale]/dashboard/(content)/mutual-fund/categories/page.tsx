"use client";

import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { useTranslations } from "next-intl";

import { CrudFormTablePage } from "@/components/templates/crud";

import { DataColumn } from "@/types/table";
import { CategoryListItem } from "@/types/mutual-fund/categories";

import { createSortHandler } from "@/lib/utils/crud";
import { useFilterSync } from "@/hooks/filter";

import {
  useCategories,
  useCategoryActions,
  useCategoryFilter,
  useCategoryForm,
  useCategorySubmit,
} from "@/hooks/dashboard/mutual-fund/categories";

import { useCrudPageTitle } from "@/hooks/crud";

import CategoryForm from "@/components/forms/mutual-fund/categories/CategoryForm";

export default function Page() {
  const tColumn = useTranslations("dashboard.mutualFund.categories.columns");
  const tCommon = useTranslations("common");

  const { getTitle } = useCrudPageTitle();

  const {
    filters,
    debouncedFilters,
    updateFilter,
    updateFiltersPartial,
    syncUrl,
  } = useCategoryFilter();

  const { categories, loading, loadError, retrying, retryLoad } = useCategories(
    {
      ...debouncedFilters,
      search: debouncedFilters.search || undefined,
    },
  );

  const { handleDelete } = useCategoryActions();

  const { isSubmitting, getButtonText, submit } = useCategorySubmit();

  const { form, isEditing, handleEdit, resetForm } = useCategoryForm({
    onSubmit: (payload) => {
      submit({
        id: form.getFieldValue("id"),
        payload,
        onSuccess: resetForm,
      });
    },
  });

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
    updateFiltersPartial,
  });

  // Sync URL on filter
  useFilterSync(debouncedFilters, syncUrl);

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
      form={
        <CategoryForm
          form={form}
          loading={isSubmitting}
          isEditing={isEditing}
          buttonText={getButtonText(isEditing)}
          resetForm={resetForm}
        />
      }
      actions={{
        onEdit: handleEdit,
        onDelete: handleDelete,
      }}
      toolbar={{
        searchValue: filters.search,
        searchPlaceholder: tCommon("search.placeholder"),
        onSearchChange: (value) => updateFilter("search", value),
      }}
      sorting={{
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        onSort: handleSort,
      }}
    />
  );
}
