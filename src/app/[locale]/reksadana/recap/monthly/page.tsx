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

export default function MonthlyPage() {
  const tCommon = useTranslations("Common");
  const tRecapMonthly = useTranslations("RdnRecap.monthly");

  const {
    data,
    timePeriods: months,
    loading,
    form,
    setForm,
    getCellColor,
    handleApplyFilter,
  } = usePerformanceData({ type: "monthly" });
  const { categories } = useCategoryData();

  // Prepare columns for the PerformanceTable
  const monthColumns = months.map((m) => ({
    key: m,
    label: format(new Date(m), "MMMM yyyy"),
  }));

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">{tRecapMonthly("title")}</h2>

      <FilterPerformanceSection
        categories={categories}
        form={form}
        setForm={setForm}
        handleApplyFilter={handleApplyFilter}
      />

      {loading ? (
        <Loading message={tRecapMonthly("loading")} />
      ) : (
        <PerformanceTable
          data={data}
          columns={monthColumns}
          columnKey="monthlyYields"
          getCellColor={getCellColor}
          noDataMessage={tCommon("noPerformanceData")}
        />
      )}

      <PerformanceInformationSection />
    </div>
  );
}
