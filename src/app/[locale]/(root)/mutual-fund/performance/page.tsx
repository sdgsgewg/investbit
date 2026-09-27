"use client";

import PageHeader from "@/components/shared/PageHeader";
import { useTranslations } from "next-intl";
import {
  CategoryLeaderboard,
  PerformanceAnalyticsSection,
  PerformanceFilterSection,
  PerformanceSectionWrapper,
  TopPerformers,
} from "@/components/mutual-fund/performance";
import { usePerformanceFilter } from "@/hooks/mutual-fund/performance";
import { useFilterSync } from "@/hooks/filter";

export default function PerformancePage() {
  const t = useTranslations("public.mutualFund.performance");

  const { filters, updateFilter, syncUrl } = usePerformanceFilter();

  useFilterSync(filters, syncUrl);

  return (
    <>
      <PageHeader title={t("title")} />

      {/* GLOBAL CONTROLS SECTION */}
      <PerformanceFilterSection filters={filters} updateFilter={updateFilter} />

      {/* TOP PERFORMERS SECTION */}
      <PerformanceSectionWrapper>
        <TopPerformers filters={filters} />
      </PerformanceSectionWrapper>

      {/* CATEGORY LEADERBOARD SECTION */}
      <PerformanceSectionWrapper>
        <CategoryLeaderboard filters={filters} />
      </PerformanceSectionWrapper>

      {/* DETAILED ANALYTICS SECTION */}
      <PerformanceSectionWrapper>
        <PerformanceAnalyticsSection
          key={`${filters.timeFrame}-${filters.categoryId}`}
          filters={filters}
        />
      </PerformanceSectionWrapper>
    </>
  );
}
