"use client";

import Loading from "@/components/feedback/Loading";
import { CrudPage } from "@/components/templates/CrudPage";
import { useCategoryData } from "@/features/reksadana/categories/hooks/useCategoryData";
import { useTranslations } from "next-intl";

export default function CategoriesManagementPage() {
  const t = useTranslations("reksadana.categories");

  const {
    categories,
    loading,
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

  if (loading) return <Loading />;

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
    />
  );
}
