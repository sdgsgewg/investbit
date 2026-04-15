import { FilterPerformance } from "@/types/reksadana/recap/performance/FilterPerformance";
import { useTranslations } from "next-intl";
import React from "react";
import { useCategoryData } from "@/hooks/useCategoryData";
import TimeframeDropdown from "./TimeFrameDropdown";
import { TimeFrameType } from "@/types/reksadana/recap/performance/TimeFrameType";

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

  const options: { label: string; value: TimeFrameType }[] = [
    { value: "daily", label: tTf("options.daily") },
    { value: "weekly", label: tTf("options.weekly") },
    { value: "monthly", label: tTf("options.monthly") },
    { value: "ytd", label: tTf("options.ytd") },
    { value: "yearly", label: tTf("options.yearly") },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800/50">
      <div className="flex flex-col sm:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold">{title}</h2>

        <TimeframeDropdown
          value={form.timeframe || "weekly"}
          onChange={(val: TimeFrameType) => {
            setForm({
              ...form,
              timeframe: val,
            });
            onChangeViewMode(val);
          }}
          options={options}
        />
      </div>

      {/* Select Category */}
      <div className="flex flex-col w-full sm:w-80 gap-2">
        <label htmlFor="category">{tCommonFilter("selectCategory")}</label>
        <select
          id="category"
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          onLoad={() => {
            setForm({ ...form, category_id: "" });
          }}
          className="border p-2 w-full"
        >
          <option value="" className="bg-zinc-100 dark:bg-zinc-800">
            {tCommonFilter("all")}
          </option>
          {categories.map((c) => (
            <option
              key={c.id}
              value={c.id}
              className="bg-zinc-100 dark:bg-zinc-800"
            >
              {c.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterPerformanceSection;
