"use client";

import { CrudPage } from "@/components/templates/CrudPage";
import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { useCategoryData } from "@/hooks/reksadana/useCategoryData";
import { useItemData } from "@/hooks/reksadana/useItemData";
import { isLikelyConnectionError } from "@/lib/utils/error";
import { useTranslations } from "next-intl";

export default function ItemsManagementPage() {
  const t = useTranslations("reksadana.items");

  const {
    items,
    loading,
    retrying,
    isEditing,
    buttonText,
    isSubmitting,
    canSubmit,
    form,
    setForm,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    loadError,
    retryLoad,
  } = useItemData();
  const {
    categories,
    retrying: retryingCategories,
    loadError: categoriesLoadError,
    retryLoad: retryCategoriesLoad,
  } = useCategoryData();

  const combinedLoadError = loadError ?? categoriesLoadError;
  const combinedRetrying = retrying || retryingCategories;

  return (
    <CrudPage
      title={t("title")}
      formFields={[
        {
          name: "name",
          label: t("form.labels.name"),
          placeholder: t("form.placeholder.name"),
          type: "text",
        },
        {
          name: "category_id",
          label: t("form.labels.category"),
          placeholder: t("form.placeholder.category"),
          type: "select",
          options: categories,
        },
      ]}
      columns={[
        { key: "name", label: t("columns.name") },
        { key: "category.name", label: t("columns.category") },
      ]}
      data={items}
      form={form}
      setForm={setForm}
      canSubmit={canSubmit}
      onSubmit={handleSubmit}
      onEdit={handleEdit}
      onDelete={handleDelete}
      isEditing={isEditing}
      isSubmitting={isSubmitting}
      buttonText={buttonText}
      resetForm={resetForm}
      loading={loading}
      headerContent={
        isLikelyConnectionError(combinedLoadError) ? (
          <ConnectionErrorAlert
            onRetry={() => {
              retryLoad();
              retryCategoriesLoad();
            }}
            retrying={combinedRetrying}
          />
        ) : undefined
      }
    />
  );
}
