import { useTranslations } from "next-intl";
import { useCategoryOptions } from "@/hooks/dashboard/mutual-fund/categories";
import { TimeFrame } from "@/enums/TimeFrame";
import { PerformanceFilter } from "@/types/mutual-fund/performance";
import { getTimeFrameOptions } from "@/lib/mutual-fund/performance/options";
import { SelectField } from "@/components/shared/fields";

interface PerformanceFilterSectionProps {
  filters: PerformanceFilter;
  updateFilter: <K extends keyof PerformanceFilter>(
    key: K,
    value: PerformanceFilter[K],
  ) => void;
}

const PerformanceFilterSection = ({
  filters,
  updateFilter,
}: PerformanceFilterSectionProps) => {
  const tCommonFilter = useTranslations("common.filter");
  const tTimeFrame = useTranslations("public.mutualFund.performance.timeframe");

  const timeFrameOptions = getTimeFrameOptions(tTimeFrame);

  const { categoryOptions, loading: isCategoryLoading } = useCategoryOptions();

  const timeFrame = filters.timeFrame ?? TimeFrame.WEEKLY;

  const title = tTimeFrame(`${timeFrame}.title`);

  const handleTimeFrameChange = (value: string) => {
    updateFilter("timeFrame", value as TimeFrame);
  };

  const handleCategoryChange = (categoryId: string) => {
    updateFilter("categoryId", categoryId || undefined);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800/50">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-4">
          <h2 className="text-xl font-semibold">{title}</h2>

          <SelectField
            name="timeframe"
            value={timeFrame}
            onValueChange={handleTimeFrameChange}
            options={timeFrameOptions}
            loading={isCategoryLoading}
            className="w-full sm:w-48"
          />
        </div>

        <SelectField
          name="category_id"
          value={filters.categoryId || ""}
          onValueChange={handleCategoryChange}
          options={categoryOptions}
          placeholder={tCommonFilter("allCategory")}
          allLabel={tCommonFilter("allCategory")}
          loading={isCategoryLoading}
          className="w-full sm:w-48"
        />
      </div>
    </div>
  );
};

export default PerformanceFilterSection;
