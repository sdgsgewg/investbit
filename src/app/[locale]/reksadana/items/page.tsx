"use client";

import { CrudPage } from "@/components/templates/CrudPage";
import { useCategoryData } from "@/features/reksadana/categories/hooks/useCategoryData";
import { useItemData } from "@/features/reksadana/items/hooks/useItemData";
import { useTranslations } from "next-intl";

export default function ItemsManagementPage() {
  const t = useTranslations("reksadana.items");

  const {
    items,
    loading,
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
  } = useItemData();
  const { categories } = useCategoryData();

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
    />
  );
}
