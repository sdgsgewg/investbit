import { FilterPerformance } from "@/types/reksadana/recap/performance/FilterPerformance";
import { useTranslations } from "next-intl";
import React from "react";
import { useCategoryData } from "@/hooks/useCategoryData";
import { TimeFrameType } from "@/types/reksadana/recap/performance/TimeFrameType";
import Dropdown from "@/components/shared/Dropdown";

interface FilterPerformanceSectionProps {
  viewMode: TimeFrameType;
  form: FilterPerformance;
  onChangeViewMode: (viewMode: TimeFrameType) => void;
  setForm: React.Dispatch<React.SetStateAction<FilterPerformance>>;
}

const FilterPerformanceSection = ({
  viewMode,
  form,
  onChangeViewMode,
  setForm,
}: FilterPerformanceSectionProps) => {
  const tCommonFilter = useTranslations("common.filter");
  const tTf = useTranslations("reksadana.recap.performance.filter.timeframe");
  const tPerformanceTfDaily = useTranslations(
    "reksadana.recap.performance.timeframe.daily",
  );
  const tPerformanceTfWeekly = useTranslations(
    "reksadana.recap.performance.timeframe.weekly",
  );
  const tPerformanceTfMonthly = useTranslations(
    "reksadana.recap.performance.timeframe.monthly",
  );
  const tPerformanceTfYtd = useTranslations(
    "reksadana.recap.performance.timeframe.ytd",
  );
  const tPerformanceTfYearly = useTranslations(
    "reksadana.recap.performance.timeframe.yearly",
  );

  const { categories } = useCategoryData();

  const title =
    viewMode === "daily"
      ? tPerformanceTfDaily("title")
      : viewMode === "weekly"
        ? tPerformanceTfWeekly("title")
        : viewMode === "monthly"
          ? tPerformanceTfMonthly("title")
          : viewMode === "ytd"
            ? tPerformanceTfYtd("title")
            : tPerformanceTfYearly("title");

  const timeFrameOptions: { label: string; value: TimeFrameType }[] = [
    { value: "daily", label: tTf("options.daily") },
    { value: "weekly", label: tTf("options.weekly") },
    { value: "monthly", label: tTf("options.monthly") },
    { value: "ytd", label: tTf("options.ytd") },
    { value: "yearly", label: tTf("options.yearly") },
  ];

  const categoryOptions = [
    { label: tCommonFilter("allCategory"), value: "" },
    ...categories.map((c) => ({
      label: c.name,
      value: c.id,
    })),
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800/50">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-4">
          <h2 className="text-xl font-semibold">{title}</h2>

          <Dropdown
            value={form.timeframe || "weekly"}
            onChange={(val: TimeFrameType) => {
              setForm({ ...form, timeframe: val });
              onChangeViewMode(val);
            }}
            options={timeFrameOptions}
            className="sm:w-48"
          />
        </div>

        <Dropdown
          value={form.category_id}
          onChange={(val) =>
            setForm({
              ...form,
              category_id: val,
            })
          }
          options={categoryOptions}
          placeholder={tCommonFilter("allCategory")}
          className="sm:w-48"
        />
      </div>
    </div>
  );
};

export default FilterPerformanceSection;
