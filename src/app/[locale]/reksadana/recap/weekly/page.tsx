"use client";

import React from "react";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { usePerformanceData } from "@/app/hooks/usePerformanceData";
import Loading from "@/components/shared/Loading";
import FilterPerformanceSection from "@/components/reksadana/recap/FilterPerformanceSection";
import PerformanceTable from "@/components/reksadana/recap/PerformanceTable";
import PerformanceInformationSection from "@/components/reksadana/recap/PerformanceInformationSection";
import { useCategoryData } from "@/app/hooks/useCategoryData";

export default function WeeklyPage() {
  const tCommon = useTranslations("Common");
  const tRecapWeekly = useTranslations("Reksadana.recap.weekly");

  const {
    data,
    timePeriods: weeks,
    loading,
    form,
    setForm,
    getCellColor,
    handleApplyFilter,
  } = usePerformanceData({ type: "weekly" });
  const { categories } = useCategoryData();

  // Prepare columns for the PerformanceTable
  const weekColumns = weeks.map((w) => {
    const [yearMonth, weekStr] = w.split("-W");
    const [year, month] = yearMonth.split("-");

    const dateObj = new Date(Number(year), Number(month) - 1);

    return {
      key: w,
      label: `${tRecapWeekly("week")} ${weekStr}`,
      subLabel: format(dateObj, "MMM ''yy"),
    };
  });

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">{tRecapWeekly("title")}</h2>

      <FilterPerformanceSection
        categories={categories}
        form={form}
        setForm={setForm}
        handleApplyFilter={handleApplyFilter}
      />

      {loading ? (
        <Loading message={tRecapWeekly("loading")} />
      ) : (
        <PerformanceTable
          data={data}
          columns={weekColumns}
          columnKey="weeklyYields"
          getCellColor={getCellColor}
          noDataMessage={tCommon("noPerformanceData")}
        />
      )}

      <PerformanceInformationSection />
    </div>
  );
}
