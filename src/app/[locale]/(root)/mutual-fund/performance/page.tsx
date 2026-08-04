"use client";

import React, { useState } from "react";
import TopProgressBar from "@/components/feedback/TopProgressBar";
import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import FilterPerformanceSection from "@/components/reksadana/performance/filter/FilterPerformanceSection";
import PerformanceSectionWrapper from "@/components/reksadana/performance/PerformanceSectionWrapper";
import TopPerformers from "@/components/reksadana/performance/top-performers/TopPerformers";
import CategoryLeaderboard from "@/components/reksadana/performance/leaderboard/CategoryLeaderboard";
import PerformanceAnalyticsSection from "@/components/reksadana/performance/analytics/PerformanceAnalyticsSection";
import PageHeader from "@/components/templates/PageHeader";
import { useTranslations } from "next-intl";
import { usePerformanceData } from "@/hooks/mutual-fund/performance";
import { SortOrder } from "@/types/sort";
import { TimeFrameType } from "@/enums/TimeFrameType";

export default function PerformancePage() {
  const t = useTranslations("public.mutualFund.performance");

  const [viewMode, setViewMode] = useState<TimeFrameType>(TimeFrameType.WEEKLY);
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
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

  const handleChangeSortOrder = (sortOrder: SortOrder) => {
    setSortOrder(sortOrder);
  };

  return (
    <>
      <PageHeader title={t("title")} />

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
    </>
  );
}
