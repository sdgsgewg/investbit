"use client";

import React, { useState } from "react";
import PerformanceFilterSection from "@/components/mutual-fund/performance/filter/PerformanceFilterSection";
import PerformanceSectionWrapper from "@/components/mutual-fund/performance/PerformanceSectionWrapper";
import TopPerformers from "@/components/mutual-fund/performance/top-performers/TopPerformers";
import CategoryLeaderboard from "@/components/mutual-fund/performance/leaderboard/CategoryLeaderboard";
import PerformanceAnalyticsSection from "@/components/mutual-fund/performance/analytics/PerformanceAnalyticsSection";
import PageHeader from "@/components/shared/PageHeader";
import { useTranslations } from "next-intl";
import { TimeFrame } from "@/enums/TimeFrame";
import { PerformanceFilter } from "@/types/mutual-fund/performance";

export default function PerformancePage() {
  const t = useTranslations("public.mutualFund.performance");

  const [viewMode, setViewMode] = useState<TimeFrame>(TimeFrame.WEEKLY);
  const [form, setForm] = useState<PerformanceFilter>({ categoryId: "" });

  const handleChangeViewMode = (newViewMode: TimeFrame) => {
    setViewMode(newViewMode);
  };

  return (
    <>
      <PageHeader title={t("title")} />

      {/* GLOBAL CONTROLS SECTION */}
      <PerformanceFilterSection
        viewMode={viewMode}
        form={form}
        onChangeViewMode={handleChangeViewMode}
        setForm={setForm}
      />

      {/* TOP PERFORMERS SECTION */}
      <PerformanceSectionWrapper>
        <TopPerformers viewMode={viewMode} categoryId={form.categoryId} />
      </PerformanceSectionWrapper>

      {/* CATEGORY LEADERBOARD SECTION */}
      <PerformanceSectionWrapper>
        <CategoryLeaderboard
          viewMode={viewMode}
          categoryId={form.categoryId}
        />
      </PerformanceSectionWrapper>

      {/* DETAILED ANALYTICS SECTION */}
      <PerformanceSectionWrapper>
        <PerformanceAnalyticsSection
          key={`${viewMode}-${form.categoryId}`}
          viewMode={viewMode}
          categoryId={form.categoryId}
        />
      </PerformanceSectionWrapper>
    </>
  );
}
