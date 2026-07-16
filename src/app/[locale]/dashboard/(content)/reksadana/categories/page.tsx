"use client";

import { CrudPage } from "@/components/templates/CrudPage";
import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { useCategoryData } from "@/hooks/dashboard/reksadana/useCategoryData";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { useTranslations } from "next-intl";
import { useCategories } from "@/hooks/dashboard/reksadana/categories/useCategories";

export default function CategoriesManagementPage() {
  const t = useTranslations("reksadana.categories");

  const { categories, loading, retrying, loadError, retryLoad } =
    useCategories();
  const {
    isEditing,
    buttonText,
    isSubmitting,
    form,
    setForm,
    canSubmit,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = useCategoryData();

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
      ]}
      columns={[{ key: "name", label: t("columns.name") }]}
      data={categories}
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
        isLikelyConnectionError(loadError) ? (
          <ConnectionErrorAlert onRetry={retryLoad} retrying={retrying} />
        ) : undefined
      }
    />
  );
}
