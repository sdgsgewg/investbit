"use client";

import { useCategoryOptions } from "@/hooks/dashboard/mutual-fund/categories";
import { useItemForm } from "@/hooks/dashboard/mutual-fund/items";
import { ItemEditResponse, UpsertItemInput } from "@/types/mutual-fund/items";
import { FormContentWrapper, FormHeader, FormWrapper } from "../../base";
import { NumberField, SelectField, TextField } from "../../fields";
import { useCrudFormState, useCrudFormTranslations } from "@/hooks/crud";

interface Props {
  mode: "create" | "edit";
  item?: ItemEditResponse;

  loading?: boolean;

  onSubmit: (payload: UpsertItemInput) => void;
}

const ItemForm = ({ mode, item, loading = false, onSubmit }: Props) => {
  const { tLabels, tPlaceholders, tCommonLabels, tCommonPlaceholders } =
    useCrudFormTranslations("mutualFund.item");

  const form = useItemForm({ item, onSubmit });

  const { isDirty, canSubmit } = useCrudFormState({ form });

  const { categoryOptions, loading: isCategoryLoading } = useCategoryOptions();

  return (
    <FormWrapper isDirty={isDirty}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FormHeader loading={loading} mode={mode} canSubmit={canSubmit} />

        <FormContentWrapper className="space-y-5">
          {/* Name */}
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

          {/* Category */}
          <form.Field name="category_id">
            {(field) => (
              <SelectField
                field={field}
                label={tLabels("category")}
                placeholder={tPlaceholders("category")}
                options={categoryOptions}
                loading={isCategoryLoading}
                required
              />
            )}
          </form.Field>

          {/* Total AUM */}
          <form.Field name="total_aum">
            {(field) => (
              <NumberField
                field={field}
                label={tLabels("totalAum")}
                placeholder={tPlaceholders("totalAum")}
                required
              />
            )}
          </form.Field>
        </FormContentWrapper>
      </form>
    </FormWrapper>
  );
};

export default ItemForm;
