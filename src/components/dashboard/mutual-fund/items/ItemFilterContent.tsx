"use client";

import { SelectField } from "@/components/shared/fields";
import { useCategoryOptions } from "@/hooks/dashboard/mutual-fund/categories";
import { ItemFilter } from "@/types/mutual-fund/items";
import { useTranslations } from "next-intl";

interface ItemFilterContentProps {
  filters: ItemFilter;
  updateFilter: <K extends keyof ItemFilter>(
    key: K,
    value: ItemFilter[K],
  ) => void;
  showLabel?: boolean;
}

export default function ItemFilterContent({
  filters,
  updateFilter,
  showLabel = false,
}: ItemFilterContentProps) {
  const tLabels = useTranslations("dashboard.mutualFund.items.form.labels");
  const tPlaceholders = useTranslations(
    "dashboard.mutualFund.items.form.placeholders",
  );

  const { categoryOptions, loading: isCategoryLoading } = useCategoryOptions();

  return (
    <>
      {/* Category */}
      <SelectField
        label={showLabel ? tLabels("category") : undefined}
        name="category_id"
        options={categoryOptions}
        loading={isCategoryLoading}
        placeholder={tPlaceholders("category")}
        value={filters.categoryId || ""}
        onValueChange={(value) => updateFilter("categoryId", value)}
      />
    </>
  );
}
