import { useTranslations } from "next-intl";
import React from "react";
import Dropdown from "@/components/ui/Dropdown";
import { useCategories } from "@/hooks/dashboard/mutual-fund/categories";
import { TimeFrame } from "@/enums/TimeFrame";
import { PerformanceFilter } from "@/types/mutual-fund/performance";
import { getCategoryOptions } from "@/lib/mutual-fund/categories/options";
import { getTimeFrameOptions } from "@/lib/mutual-fund/performance/options";

interface FilterPerformanceSectionProps {
  viewMode: TimeFrame;
  form: PerformanceFilter;
  onChangeViewMode: (viewMode: TimeFrame) => void;
  setForm: React.Dispatch<React.SetStateAction<PerformanceFilter>>;
}

const FilterPerformanceSection = ({
  viewMode,
  form,
  onChangeViewMode,
  setForm,
}: FilterPerformanceSectionProps) => {
  const tCommonFilter = useTranslations("common.filter");
  const tTimeFrame = useTranslations("public.mutualFund.performance.timeframe");

  const { categories } = useCategories();

  const timeFrameOptions = getTimeFrameOptions(tTimeFrame);

  const categoryOptions = getCategoryOptions({
    categories,
    showAllCategoryOption: true,
    tCommonFilter,
  });

  const title = tTimeFrame(`${viewMode}.title`);

  const handleTimeFrameChange = (value: string) => {
    const timeFrame = value as TimeFrame;

    setForm((currentForm) => ({
      ...currentForm,
      timeFrame,
    }));

    onChangeViewMode(timeFrame);
  };

  const handleCategoryChange = (categoryId: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      categoryId: categoryId,
    }));
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800/50">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-4">
          <h2 className="text-xl font-semibold">{title}</h2>

          <Dropdown
            value={form.timeFrame || TimeFrame.WEEKLY}
            onChange={handleTimeFrameChange}
            options={timeFrameOptions}
            className="sm:w-48"
          />
        </div>

        <Dropdown
          value={form.categoryId || ""}
          onChange={handleCategoryChange}
          options={categoryOptions}
          placeholder={tCommonFilter("allCategory")}
          className="sm:w-48"
        />
      </div>
    </div>
  );
};

export default FilterPerformanceSection;
