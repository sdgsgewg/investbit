"use client";

import React, { useState } from "react";
import { usePerformanceData } from "@/app/hooks/usePerformanceData";
import FilterPerformanceSection from "@/components/reksadana/recap/performance/FilterPerformanceSection";
import TopPerformers from "@/components/reksadana/recap/TopPerformers";
import PerformanceSectionWrapper from "@/components/reksadana/recap/performance/PerformanceSectionWrapper";
import PerformanceAnalyticsSection from "@/components/reksadana/recap/performance/PerformanceAnalyticsSection";
import { SortOrderType } from "@/app/types/reksadana/recap/performance/SortOrderType";
import { TimeFrameType } from "@/app/types/reksadana/recap/performance/TimeFrameType";
import { useTranslations } from "next-intl";

export default function PerformancePage() {
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

  const [viewMode, setViewMode] = useState<TimeFrameType>("weekly");
  const [sortOrder, setSortOrder] = useState<SortOrderType>("desc");

  const { data, timePeriods, loading, form, setForm, getCellColor } =
    usePerformanceData({ type: viewMode });

  const handleChangeViewMode = (viewMode: TimeFrameType) => {
    setViewMode(viewMode);
  };

  const handleChangeSortOrder = (sortOrder: SortOrderType) => {
    setSortOrder(sortOrder);
  };

  const loadingText =
    viewMode === "daily"
      ? tPerformanceTfDaily("loading")
      : viewMode === "weekly"
        ? tPerformanceTfWeekly("loading")
        : viewMode === "monthly"
          ? tPerformanceTfMonthly("loading")
          : viewMode === "ytd"
            ? tPerformanceTfYtd("loading")
            : tPerformanceTfYearly("loading");

  const columnKey =
    viewMode === "daily"
      ? "dailyYields"
      : viewMode === "weekly"
        ? "weeklyYields"
        : viewMode === "monthly"
          ? "monthlyYields"
          : viewMode === "ytd"
            ? "ytdYields"
            : "yearlyYields";

  return (
    <div className="flex flex-col gap-6">
      {/* GLOBAL CONTROLS SECTION */}
      <FilterPerformanceSection
        viewMode={viewMode}
        form={form}
        onChangeViewMode={handleChangeViewMode}
        setForm={setForm}
      />

      {/* TOP PERFORMERS SECTION */}
      <PerformanceSectionWrapper>
        <TopPerformers
          data={data}
          timePeriods={timePeriods}
          loading={loading}
          loadingText={loadingText}
          columnKey={columnKey}
          viewMode={viewMode}
        />
      </PerformanceSectionWrapper>

      {/* DETAILED DATA SECTION */}
      <PerformanceSectionWrapper>
        <PerformanceAnalyticsSection
          data={data}
          timePeriods={timePeriods}
          loading={loading}
          loadingText={loadingText}
          viewMode={viewMode}
          sortOrder={sortOrder}
          columnKey={columnKey}
          onChangeSortOrder={handleChangeSortOrder}
          getCellColor={getCellColor}
        />
      </PerformanceSectionWrapper>
    </div>
  );
}
