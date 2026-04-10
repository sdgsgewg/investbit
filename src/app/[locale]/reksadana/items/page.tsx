"use client";

import { useItemData } from "@/app/hooks/useItemData";
import { useCategoryData } from "@/app/hooks/useCategoryData";
import Loading from "@/components/shared/Loading";
import { CrudPage } from "@/components/shared/CrudPage";
import { useTranslations } from "next-intl";

export default function ItemsManagementPage() {
  const t = useTranslations("reksadana.items");

  const {
    items,
    loading,
    isEditing,
    buttonText,
    isSubmitting,
    isFormEmpty,
    form,
    setForm,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = useItemData();
  const { categories } = useCategoryData();

  if (loading) return <Loading />;

  return (
    <CrudPage
      title={t("title")}
      formFields={[
        { name: "name", label: t("form.namePlaceholder"), type: "text" },
        {
          name: "category_id",
          label: t("form.categoryPlaceholder"),
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
      onSubmit={handleSubmit}
      onEdit={handleEdit}
      onDelete={handleDelete}
      isEditing={isEditing}
      isSubmitting={isSubmitting}
      isFormEmpty={isFormEmpty}
      buttonText={buttonText}
      resetForm={resetForm}
    />
  );
}
