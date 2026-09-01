"use client";

import { SelectField } from "@/components/forms/fields";
import { useCategoryOptions } from "@/hooks/dashboard/mutual-fund/categories";
import { ItemFilter } from "@/types/mutual-fund/items";
import { useTranslations } from "next-intl";

interface ItemFilterContentProps {
  filters: ItemFilter;
  updateFilter: <K extends keyof ItemFilter>(
    key: K,
    value: ItemFilter[K],
  ) => void;
}

export default function ItemFilterContent({
  filters,
  updateFilter,
}: ItemFilterContentProps) {
  const tLabels = useTranslations("dashboard.mutualFund.items.form.labels");
  const tPlaceholders = useTranslations(
    "dashboard.mutualFund.items.form.placeholders",
  );

  const { categoryOptions } = useCategoryOptions();

  return (
    <>
      {/* Category */}
      <SelectField
        label={tLabels("category")}
        name="category_id"
        placeholder={tPlaceholders("category")}
        options={categoryOptions}
        value={filters.categoryId || ""}
        onChange={(value) => updateFilter("categoryId", value)}
      />
    </>
  );
}
