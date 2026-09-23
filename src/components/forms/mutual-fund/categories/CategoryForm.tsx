"use client";

import { CrudListPageForm } from "@/components/templates/crud";
import { useCrudFormState, useCrudFormTranslations } from "@/hooks/crud";
import { useCategoryForm } from "@/hooks/dashboard/mutual-fund/categories";
import { TextField } from "../../fields";

interface Props {
  form: ReturnType<typeof useCategoryForm>["form"];

  loading?: boolean;

  isEditing: boolean;

  buttonText: string;

  resetForm: () => void;
}

const CategoryForm = ({
  form,
  loading = false,
  isEditing,
  buttonText,
  resetForm,
}: Props) => {
  const { tCommonLabels, tCommonPlaceholders } = useCrudFormTranslations(
    "mutualFund.category",
  );

  const { isDirty, canSubmit } = useCrudFormState({
    form,
  });

  return (
    <CrudListPageForm
      isDirty={isDirty}
      isEditing={isEditing}
      isSubmitting={loading}
      buttonText={buttonText}
      resetForm={resetForm}
      canSubmit={canSubmit}
      onSubmit={() => form.handleSubmit()}
    >
      <form.Field name="name">
        {(field) => (
          <TextField
            field={field}
            label={tCommonLabels("name")}
            placeholder={tCommonPlaceholders("name")}
            required
          />
        )}
      </form.Field>
    </CrudListPageForm>
  );
};

export default CategoryForm;
