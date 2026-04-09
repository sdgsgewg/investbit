"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { usePerformanceData } from "@/app/hooks/usePerformanceData";
import Loading from "@/components/shared/Loading";
import FilterPerformanceSection from "@/components/reksadana/recap/FilterPerformanceSection";
import PerformanceTable from "@/components/reksadana/recap/PerformanceTable";
import PerformanceInformationSection from "@/components/reksadana/recap/PerformanceInformationSection";
import TopPerformers from "@/components/reksadana/recap/TopPerformers";
import { useCategoryData } from "@/app/hooks/useCategoryData";
import { motion } from "framer-motion";

export default function PerformancePage() {
  const tCommon = useTranslations("Common");
  const tRecapWeekly = useTranslations("Reksadana.recap.weekly");
  const tRecapMonthly = useTranslations("Reksadana.recap.monthly");
  const tRecapYearly = useTranslations("Reksadana.recap.yearly");
  const tDetailedAnalytics = useTranslations(
    "Reksadana.recap.performance.detailedAnalytics",
  );

  const [viewMode, setViewMode] = useState<"weekly" | "monthly" | "yearly">(
    "weekly",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const {
    data,
    timePeriods,
    loading,
    form,
    setForm,
    getCellColor,
    handleApplyFilter,
  } = usePerformanceData({ type: viewMode });

  const { categories } = useCategoryData();

  const sortedTimePeriods =
    sortOrder === "desc" ? [...timePeriods].reverse() : timePeriods;

  // Prepare columns for the PerformanceTable based on viewMode
  const columns = sortedTimePeriods.map((period) => {
    // We check the period string itself because timePeriods might lag behind viewMode
    // while the new data is loading, preventing Invalid Date errors.
    if (period.includes("-W")) {
      const [yearMonth, weekStr] = period.split("-W");
      const [year, month] = yearMonth.split("-");
      const dateObj = new Date(Number(year), Number(month) - 1);

      return {
        key: period,
        label: `${tRecapWeekly("week")} ${weekStr}`,
        subLabel: format(dateObj, "MMM ''yy"),
      };
    } else if (period.match(/^\d{4}-\d{2}-\d{2}$/)) {
      // Monthly view: "YYYY-MM-DD" format
      // Wrap in try/catch to be absolutely safe against other invalid dates
      try {
        return {
          key: period,
          label: format(new Date(period), "MMMM yyyy"),
        };
      } catch {
        return {
          key: period,
          label: period,
        };
      }
    } else {
      // Yearly view: "YYYY" format
      return {
        key: period,
        label: period, // e.g. "2026"
      };
    }
  });

  return (
    <div className="flex flex-col gap-6">
      {/* GLOBAL CONTROLS SECTION */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold">
            {viewMode === "weekly"
              ? tRecapWeekly("title")
              : viewMode === "monthly"
                ? tRecapMonthly("title")
                : tRecapYearly("title")}
          </h2>

          {/* Premium Pill Toggle */}
          <div className="relative flex bg-gray-100 dark:bg-zinc-800 rounded-full p-1 shadow-inner w-full sm:w-[400px]">
            <button
              onClick={() => setViewMode("weekly")}
              className={`relative flex-1 z-10 py-2 text-sm font-medium rounded-full transition-colors ${
                viewMode === "weekly"
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              }`}
            >
              {tRecapWeekly("weekly")}
            </button>
            <button
              onClick={() => setViewMode("monthly")}
              className={`relative flex-1 z-10 py-2 text-sm font-medium rounded-full transition-colors ${
                viewMode === "monthly"
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              }`}
            >
              {tRecapMonthly("monthly")}
            </button>
            <button
              onClick={() => setViewMode("yearly")}
              className={`relative flex-1 z-10 py-2 text-sm font-medium rounded-full transition-colors ${
                viewMode === "yearly"
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              }`}
            >
              {tRecapYearly("yearly")}
            </button>

            {/* Animated Background Pill */}
            <motion.div
              className="absolute top-1 bottom-1 w-[calc(33.333%-2.66px)] bg-blue-600 dark:bg-blue-500 rounded-full shadow-md z-0"
              initial={false}
              animate={{
                left:
                  viewMode === "weekly"
                    ? "4px"
                    : viewMode === "monthly"
                      ? "calc(33.333% + 1.33px)"
                      : "calc(66.666% - 1.33px)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </div>
        </div>

        <FilterPerformanceSection
          categories={categories}
          form={form}
          setForm={setForm}
          handleApplyFilter={handleApplyFilter}
        />
      </div>

      {/* TOP PERFORMERS SECTION */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800/50">
        <TopPerformers
          data={data as any}
          timePeriods={timePeriods}
          columnKey={
            viewMode === "weekly"
              ? "weeklyYields"
              : viewMode === "monthly"
                ? "monthlyYields"
                : "yearlyYields"
          }
          viewMode={viewMode}
        />
      </div>

      {/* DETAILED DATA SECTION */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800/50 flex flex-col gap-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {tDetailedAnalytics("title")}
          </h3>

          {/* Table-Specific Sort Toggle */}
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-zinc-800 dark:text-gray-200 border border-gray-300 dark:border-zinc-700 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors shadow-sm"
            title="Toggle Sort Order"
          >
            {sortOrder === "asc" ? (
              <>
                <span className="hidden sm:inline">
                  {tDetailedAnalytics("oldestToLatest")}
                </span>
                <span className="sm:hidden">Sort: Asc</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 16 4 4 4-4" />
                  <path d="M7 20V4" />
                  <path d="M11 4h4" />
                  <path d="M11 8h7" />
                  <path d="M11 12h10" />
                </svg>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">
                  {tDetailedAnalytics("latestToOldest")}
                </span>
                <span className="sm:hidden">Sort: Desc</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 8 4-4 4 4" />
                  <path d="M7 4v16" />
                  <path d="M11 4h4" />
                  <path d="M11 8h7" />
                  <path d="M11 12h10" />
                </svg>
              </>
            )}
          </button>
        </div>

        {loading ? (
          <Loading
            message={
              viewMode === "weekly"
                ? tRecapWeekly("loading")
                : viewMode === "monthly"
                  ? tRecapMonthly("loading")
                  : tRecapYearly("loading")
            }
          />
        ) : (
          <PerformanceTable
            data={data}
            columns={columns}
            columnKey={
              viewMode === "weekly"
                ? "weeklyYields"
                : viewMode === "monthly"
                  ? "monthlyYields"
                  : "yearlyYields"
            }
            getCellColor={getCellColor}
            noDataMessage={tCommon("noPerformanceData")}
          />
        )}

        <PerformanceInformationSection />
      </div>
    </div>
  );
}
