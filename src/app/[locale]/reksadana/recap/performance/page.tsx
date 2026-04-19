"use client";

import React, { useState } from "react";
import { SortOrderType } from "@/features/reksadana/recap/performance/types/SortOrderType";
import { TimeFrameType } from "@/features/reksadana/recap/performance/types/TimeFrameType";
import { getPerformanceKey } from "@/lib/utils/reksadana/recap/performance";
import TopProgressBar from "@/components/feedback/TopProgressBar";
import { usePerformanceData } from "@/features/reksadana/recap/performance/hooks/usePerformanceData";
import FilterPerformanceSection from "@/features/reksadana/recap/performance/components/filter/FilterPerformanceSection";
import PerformanceSectionWrapper from "@/features/reksadana/recap/performance/components/PerformanceSectionWrapper";
import TopPerformers from "@/features/reksadana/recap/performance/components/top-performers/TopPerformers";
import PerformanceAnalyticsSection from "@/features/reksadana/recap/performance/components/analytics/PerformanceAnalyticsSection";

export default function PerformancePage() {
  const [viewMode, setViewMode] = useState<TimeFrameType>("weekly");
  const [sortOrder, setSortOrder] = useState<SortOrderType>("desc");
  const performanceData = usePerformanceData({ timeFrame: viewMode });
  const {
    data,
    timePeriods,
    loading,
    fetching,
    form,
    setForm,
    getCellColor,
    loadMorePeriods,
  } = performanceData;

  const handleChangeViewMode = (viewMode: TimeFrameType) => {
    setViewMode(viewMode);
  };

  const handleChangeSortOrder = (sortOrder: SortOrderType) => {
    setSortOrder(sortOrder);
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

      {fetching && <TopProgressBar />}

      {/* TOP PERFORMERS SECTION */}
      <PerformanceSectionWrapper>
        <TopPerformers
          data={data}
          timePeriods={timePeriods}
          loading={loading}
          fetching={fetching}
          columnKey={columnKey}
          viewMode={viewMode}
        />
      </PerformanceSectionWrapper>

      {/* DETAILED DATA SECTION */}
      <PerformanceSectionWrapper>
        <PerformanceAnalyticsSection
          key={viewMode}
          data={data}
          timePeriods={timePeriods}
          loading={loading}
          fetching={fetching}
          viewMode={viewMode}
          sortOrder={sortOrder}
          columnKey={columnKey}
          onChangeSortOrder={handleChangeSortOrder}
          getCellColor={getCellColor}
          loadMorePeriods={loadMorePeriods}
        />
      </PerformanceSectionWrapper>
    </div>
  );
}
