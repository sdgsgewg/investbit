import { useTranslations } from "next-intl";
import React from "react";
import Dropdown from "@/components/ui/Dropdown";
import { useCategories } from "@/hooks/dashboard/mutual-fund/categories";
import { TimeFrameType } from "@/enums/TimeFrameType";
import { PerformanceFilter } from "@/types/mutual-fund/performance";

interface FilterPerformanceSectionProps {
  viewMode: TimeFrameType;
  form: PerformanceFilter;
  onChangeViewMode: (viewMode: TimeFrameType) => void;
  setForm: React.Dispatch<React.SetStateAction<PerformanceFilter>>;
}

const FilterPerformanceSection = ({
  viewMode,
  form,
  onChangeViewMode,
  setForm,
}: FilterPerformanceSectionProps) => {
  const tCommonFilter = useTranslations("common.filter");
  const tTimeframe = useTranslations("public.mutualFund.performance.timeframe");

  const { categories } = useCategories();

  const timeFrameOptions: {
    label: string;
    value: TimeFrameType;
  }[] = [
    {
      value: TimeFrameType.DAILY,
      label: tTimeframe("daily.label"),
    },
    {
      value: TimeFrameType.WEEKLY,
      label: tTimeframe("weekly.label"),
    },
    {
      value: TimeFrameType.MONTHLY,
      label: tTimeframe("monthly.label"),
    },
    {
      value: TimeFrameType.YTD,
      label: tTimeframe("ytd.label"),
    },
    {
      value: TimeFrameType.YEARLY,
      label: tTimeframe("yearly.label"),
    },
  ];

  const categoryOptions = [
    {
      label: tCommonFilter("allCategory"),
      value: "",
    },
    ...categories.map((category) => ({
      label: category.name,
      value: category.id,
    })),
  ];

  const title = tTimeframe(`${viewMode}.title`);

  const handleTimeFrameChange = (value: TimeFrameType) => {
    setForm((currentForm) => ({
      ...currentForm,
      timeframe: value,
    }));

    onChangeViewMode(value);
  };

  const handleCategoryChange = (categoryId: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      category_id: categoryId,
    }));
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800/50">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-4">
          <h2 className="text-xl font-semibold">{title}</h2>

          <Dropdown
            value={form.timeFrame || TimeFrameType.WEEKLY}
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
