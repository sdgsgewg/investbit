"use client";

import React, { useState } from "react";
import { getPerformanceKey } from "@/lib/utils/reksadana/performance";
import TopProgressBar from "@/components/feedback/TopProgressBar";
import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { TimeFrameType } from "@/types/reksadana/performance/TimeFrameType";
import { SortOrderType } from "@/types/reksadana/performance/SortOrderType";
import { usePerformanceData } from "@/hooks/dashboard/reksadana/usePerformanceData";
import FilterPerformanceSection from "@/components/reksadana/performance/filter/FilterPerformanceSection";
import PerformanceSectionWrapper from "@/components/reksadana/performance/PerformanceSectionWrapper";
import TopPerformers from "@/components/reksadana/performance/top-performers/TopPerformers";
import CategoryLeaderboard from "@/components/reksadana/performance/leaderboard/CategoryLeaderboard";
import PerformanceAnalyticsSection from "@/components/reksadana/performance/analytics/PerformanceAnalyticsSection";

export default function PerformancePage() {
  const [viewMode, setViewMode] = useState<TimeFrameType>("weekly");
  const [sortOrder, setSortOrder] = useState<SortOrderType>("desc");
  const performanceData = usePerformanceData({ timeFrame: viewMode });
  const {
    data,
    timePeriods,
    availablePeriods,
    loading,
    fetching,
    retrying,
    form,
    setForm,
    getCellColor,
    loadMorePeriods,
    hasMoreOlder,
    hasLoadedOlder,
    isRangeMode,
    selectedStartPeriod,
    selectedEndPeriod,
    resetToLatestPeriods,
    setStartPeriod,
    setEndPeriod,
    loadError,
    retryLoad,
  } = performanceData;

  const handleChangeViewMode = (viewMode: TimeFrameType) => {
    resetToLatestPeriods();
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

      {isLikelyConnectionError(loadError) && (
        <ConnectionErrorAlert onRetry={retryLoad} retrying={retrying} />
      )}

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

      {/* CATEGORY LEADERBOARD SECTION */}
      <PerformanceSectionWrapper>
        <CategoryLeaderboard
          data={data}
          timePeriods={timePeriods}
          loading={loading}
          fetching={fetching}
          columnKey={columnKey}
          viewMode={viewMode}
        />
      </PerformanceSectionWrapper>

      {/* DETAILED ANALYTICS SECTION */}
      <PerformanceSectionWrapper>
        <PerformanceAnalyticsSection
          key={viewMode}
          data={data}
          timePeriods={timePeriods}
          availablePeriods={availablePeriods}
          loading={loading}
          fetching={fetching}
          viewMode={viewMode}
          sortOrder={sortOrder}
          columnKey={columnKey}
          onChangeSortOrder={handleChangeSortOrder}
          getCellColor={getCellColor}
          loadMorePeriods={loadMorePeriods}
          hasMoreOlder={hasMoreOlder}
          hasLoadedOlder={hasLoadedOlder}
          isRangeMode={isRangeMode}
          selectedStartPeriod={selectedStartPeriod}
          selectedEndPeriod={selectedEndPeriod}
          resetToLatestPeriods={resetToLatestPeriods}
          setStartPeriod={setStartPeriod}
          setEndPeriod={setEndPeriod}
        />
      </PerformanceSectionWrapper>
    </div>
  );
}
