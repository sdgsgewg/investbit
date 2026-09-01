"use client";

import { useCategoryOptions } from "@/hooks/dashboard/mutual-fund/categories";
import { useItemForm } from "@/hooks/dashboard/mutual-fund/items";
import { ItemEditResponse, UpsertItemInput } from "@/types/mutual-fund/items";
import { useTranslations } from "next-intl";
import { FormContentWrapper, FormHeader, FormWrapper } from "../../base";
import { NumberField, SelectField, TextField } from "../../fields";

interface Props {
  mode: "create" | "edit";
  item?: ItemEditResponse;

  loading?: boolean;

  onSubmit: (payload: UpsertItemInput) => void;
}

const ItemForm = ({ mode, item, loading = false, onSubmit }: Props) => {
  const tLabels = useTranslations("dashboard.mutualFund.items.form.labels");
  const tPlaceholders = useTranslations(
    "dashboard.mutualFund.items.form.placeholders",
  );

  const {
    form,
    isDirty,
    errors,
    updateField,
    validate,
    canSubmit,
    buildPayload,
  } = useItemForm(item);

  const isCreate = mode === "create";

  const { categoryOptions } = useCategoryOptions();

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    onSubmit(buildPayload());
  };

  return (
    <FormWrapper isDirty={isDirty}>
      <FormHeader
        loading={loading}
        isCreate={isCreate}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <FormContentWrapper className="space-y-5">
        {/* Name */}
        <TextField
          label={tLabels("name")}
          name="name"
          placeholder={tPlaceholders("name") || ""}
          value={(form.name as string) ?? ""}
          onChange={(value) => updateField("name", value)}
          error={errors.name}
          required
        />

        {/* Category */}
        <SelectField
          label={tLabels("category")}
          name={`category_id`}
          placeholder={tPlaceholders("category") || ""}
          options={categoryOptions}
          value={form.category_id || ""}
          onChange={(value) => updateField("category_id", value)}
          error={errors.category_id}
          required
        />

        {/* Total AUM */}
        <NumberField
          label={tLabels("totalAum")}
          name="total_aum"
          placeholder={tPlaceholders("totalAum")}
          value={form.total_aum}
          onChange={(value) => updateField("total_aum", value)}
          error={errors.total_aum}
          required
        />
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default ItemForm;
