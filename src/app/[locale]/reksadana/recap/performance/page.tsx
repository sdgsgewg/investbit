"use client";

import React, { useState } from "react";
import { usePerformanceData } from "@/hooks/usePerformanceData";
import TopPerformers from "@/components/reksadana/recap/performance/top-performers/TopPerformers";
import PerformanceSectionWrapper from "@/components/reksadana/recap/performance/PerformanceSectionWrapper";
import PerformanceAnalyticsSection from "@/components/reksadana/recap/performance/analytics/PerformanceAnalyticsSection";
import { SortOrderType } from "@/types/reksadana/recap/performance/SortOrderType";
import { TimeFrameType } from "@/types/reksadana/recap/performance/TimeFrameType";
import { getPerformanceKey } from "@/lib/utils/reksadana/recap/performance";
import FilterPerformanceSection from "@/components/reksadana/recap/performance/filter/FilterPerformanceSection";
import TopProgressBar from "@/components/shared/TopProgressBar";

export default function PerformancePage() {
  const [viewMode, setViewMode] = useState<TimeFrameType>("weekly");
  const [sortOrder, setSortOrder] = useState<SortOrderType>("desc");

  const { data, timePeriods, loading, fetching, form, setForm, getCellColor } =
    usePerformanceData({ timeFrame: viewMode });

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
          data={data}
          timePeriods={timePeriods}
          loading={loading}
          fetching={fetching}
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
