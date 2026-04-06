"use client";

import { useCategoryData } from "@/app/hooks/useCategoryData";
import { CrudPage } from "@/components/shared/CrudPage";
import Loading from "@/components/shared/Loading";
import { useTranslations } from "next-intl";

export default function CategoriesManagementPage() {
  const t = useTranslations("Reksadana.categories");

  const {
    categories,
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
  } = useCategoryData();

  if (loading) return <Loading />;

  return (
    <CrudPage
      title={t("title")}
      formFields={[{ name: "name", label: t("namePlaceholder"), type: "text" }]}
      columns={[{ key: "name", label: t("name") }]}
      data={categories}
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
