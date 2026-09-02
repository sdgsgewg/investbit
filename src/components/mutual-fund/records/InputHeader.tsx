"use client";

import { useTranslations } from "next-intl";
import { DatePicker } from "@/components/ui/DatePicker";
import { safeFormatDate } from "@/lib/utils/date";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/dashboard/mutual-fund/categories";
import { getCategoryOptions } from "@/lib/mutual-fund/categories/options";
import Dropdown from "@/components/ui/Dropdown";

interface InputHeaderProps {
  draftDate: string;
  selectedCategory: string;
  onDraftDateChange: (date: string) => void;
  onSelectedDateChange: (date: string) => void;
  onSelectedCategoryChange: (category: string) => void;
  onSave: () => void;
  saving: boolean;
  canSave: boolean;
}

const InputHeader = ({
  draftDate,
  selectedCategory,
  onDraftDateChange,
  onSelectedDateChange,
  onSelectedCategoryChange,
  onSave,
  saving,
  canSave,
}: InputHeaderProps) => {
  const tRecords = useTranslations("dashboard.mutualFund.records");
  const tLabels = useTranslations("dashboard.mutualFund.records.form.labels");
  const tCommonFilter = useTranslations("common.filter");

  const selectedDate = draftDate ? new Date(draftDate) : undefined;

  const { categories } = useCategories();

  const categoryOptions = getCategoryOptions({
    categories,
    showAllCategoryOption: true,
    tCommonFilter,
  });

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">{tRecords("form.title")}</h2>

        <div className="flex items-center gap-8">
          {/* Date Picker */}
          <DatePicker
            label={tLabels("date")}
            value={selectedDate}
            onChange={(date) => {
              if (!date) return;
              onDraftDateChange(safeFormatDate(date, "yyyy-MM-dd"));
            }}
            onSelectFinal={(date) => {
              const formatted = safeFormatDate(date, "yyyy-MM-dd");
              onSelectedDateChange(formatted); // trigger fetch di sini
            }}
            disabled={(date) => {
              const day = date.getDay();
              return day === 0 || day === 6 || date > new Date();
            }}
          />

          <div>
            <Dropdown
              label={tLabels("category")}
              value={selectedCategory || ""}
              onChange={(category) => {
                onSelectedCategoryChange(category);
              }}
              options={categoryOptions}
              placeholder={tCommonFilter("allCategory")}
              className="sm:w-48"
            />
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex items-start md:items-end">
        <Button
          variant="default"
          size="lg"
          onClick={onSave}
          disabled={saving || !canSave}
        >
          {saving ? tRecords("form.saving") : tRecords("form.save")}
        </Button>
      </div>
    </div>
  );
};

export default InputHeader;
