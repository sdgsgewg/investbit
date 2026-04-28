"use client";

import React, { useState } from "react";
import { SortOrderType } from "@/features/reksadana/recap/performance/types/SortOrderType";
import { TimeFrameType } from "@/features/reksadana/recap/performance/types/TimeFrameType";
import { getPerformanceKey } from "@/lib/utils/reksadana/recap/performance";
import TopProgressBar from "@/components/feedback/TopProgressBar";
import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { usePerformanceData } from "@/features/reksadana/recap/performance/hooks/usePerformanceData";
import FilterPerformanceSection from "@/features/reksadana/recap/performance/components/filter/FilterPerformanceSection";
import PerformanceSectionWrapper from "@/features/reksadana/recap/performance/components/PerformanceSectionWrapper";
import TopPerformers from "@/features/reksadana/recap/performance/components/top-performers/TopPerformers";
import CategoryLeaderboard from "@/features/reksadana/recap/performance/components/leaderboard/CategoryLeaderboard";
import PerformanceAnalyticsSection from "@/features/reksadana/recap/performance/components/analytics/PerformanceAnalyticsSection";
import { isLikelyConnectionError } from "@/lib/utils/error";

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
