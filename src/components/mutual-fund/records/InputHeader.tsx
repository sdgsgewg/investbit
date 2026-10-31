"use client";

import { useTranslations } from "next-intl";
import { DatePicker } from "@/components/ui/DatePicker";
import { safeFormatDate } from "@/lib/utils/date";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/dashboard/mutual-fund/categories";
import { getCategoryOptions } from "@/lib/mutual-fund/categories/options";
import { RecordFilter } from "@/types/mutual-fund/records";
import { SelectField } from "@/components/shared/fields";

interface InputHeaderProps {
  filters: RecordFilter;
  updateFilter: <K extends keyof RecordFilter>(
    key: K,
    value: RecordFilter[K],
  ) => void;
  saving: boolean;
  canSave: boolean;
  onSave: () => void;
}

const InputHeader = ({
  filters,
  updateFilter,
  onSave,
  saving,
  canSave,
}: InputHeaderProps) => {
  const tRecords = useTranslations("dashboard.mutualFund.records");
  const tLabels = useTranslations("dashboard.mutualFund.records.form.labels");
  const tCommonFilter = useTranslations("common.filter");

  const selectedDate = filters.startDate
    ? new Date(filters.startDate)
    : undefined;

  const { categories } = useCategories();

  const categoryOptions = getCategoryOptions({
    categories,
    showAllCategoryOption: true,
    tCommonFilter,
  });

  const isDisabledDate = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6 || date > new Date();
  };

  const handleDateChange = (date: string) => {
    updateFilter("startDate", date);
    updateFilter("endDate", date);
  };

  const handleCategoryChange = (categoryId: string) => {
    updateFilter("categoryId", categoryId || undefined);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">{tRecords("form.title")}</h2>

        <div className="flex items-center gap-8">
          {/* Date Picker */}
          <DatePicker
            label={tLabels("date")}
            value={selectedDate}
            onSelectFinal={(date) => {
              const formatted = safeFormatDate(date, "yyyy-MM-dd");
              handleDateChange(formatted);
            }}
            maxDate={new Date()}
            endMonth={new Date()}
            disabled={(date) => isDisabledDate(date)}
          />

          {/* Category Dropdown */}
          <div>
            <SelectField
              label={tLabels("category")}
              name="category_id"
              value={filters.categoryId || ""}
              onValueChange={handleCategoryChange}
              options={categoryOptions}
              placeholder={tCommonFilter("allCategory")}
              className="sm:w-48"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-start md:items-end">
        <Button
          variant="default"
          size="default"
          onClick={onSave}
          className="text-sm md:text-base"
          disabled={saving || !canSave}
        >
          {saving ? tRecords("form.saving") : tRecords("form.save")}
        </Button>
      </div>
    </div>
  );
};

export default InputHeader;
