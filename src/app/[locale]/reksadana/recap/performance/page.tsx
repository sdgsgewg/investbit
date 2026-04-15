"use client";

import React, { useState } from "react";
import { usePerformanceData } from "@/hooks/usePerformanceData";
import FilterPerformanceSection from "@/components/reksadana/recap/performance/FilterPerformanceSection";
import TopPerformers from "@/components/reksadana/recap/TopPerformers";
import PerformanceSectionWrapper from "@/components/reksadana/recap/performance/PerformanceSectionWrapper";
import PerformanceAnalyticsSection from "@/components/reksadana/recap/performance/PerformanceAnalyticsSection";
import { SortOrderType } from "@/types/reksadana/recap/performance/SortOrderType";
import { TimeFrameType } from "@/types/reksadana/recap/performance/TimeFrameType";
import { useTranslations } from "next-intl";
import { getPerformanceKey } from "@/lib/utils/reksadana/recap/performance";

export default function PerformancePage() {
  const tPerformance = useTranslations("reksadana.recap.performance");
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
    usePerformanceData({ timeFrame: viewMode });

  const handleChangeViewMode = (viewMode: TimeFrameType) => {
    setViewMode(viewMode);
  };

  const handleChangeSortOrder = (sortOrder: SortOrderType) => {
    setSortOrder(sortOrder);
  };

  const getLoadingText = () => {
    switch (viewMode) {
      case "daily":
        return tPerformanceTfDaily("loading");
        break;
      case "weekly":
        return tPerformanceTfWeekly("loading");
        break;
      case "monthly":
        return tPerformanceTfMonthly("loading");
        break;
      case "ytd":
        return tPerformanceTfYtd("loading");
        break;
      case "yearly":
        return tPerformanceTfYearly("loading");
        break;
      default:
        return tPerformance("loading");
        break;
    }
  };

  const columnKey = getPerformanceKey(viewMode);

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
          loadingText={getLoadingText()}
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
          loadingText={getLoadingText()}
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
