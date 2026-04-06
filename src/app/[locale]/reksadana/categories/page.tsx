"use client";

import { useCategoryData } from "@/app/hooks/useCategoryData";
import { CrudPage } from "@/components/shared/CrudPage";
import Loading from "@/components/shared/Loading";

export default function CategoriesManagementPage() {
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
      title="Manage Categories"
      formFields={[{ name: "name", label: "Category Name", type: "text" }]}
      columns={[{ key: "name", label: "Name" }]}
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
