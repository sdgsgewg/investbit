import { useTranslations } from "next-intl";
import PerformanceTable from "./PerformanceTable";
import PerformanceInformationSection from "../PerformanceInformationSection";
import PerformanceTableSkeleton from "./PerformanceTableSkeleton";
import TableOverlay from "@/components/feedback/TableOverlay";
import Dropdown from "@/components/ui/Dropdown";
import { SortOrder } from "@/types/sort";
import { TimeFrame } from "@/enums/TimeFrame";
import {
  getPerformancePeriodColumns,
  getPeriodRangeOptions,
} from "@/lib/mutual-fund/performance/period";
import { PerformanceData } from "@/types/mutual-fund/performance";
import { Button } from "@/components/ui/button";
import { LoaderCircle, SortAsc, SortDesc } from "lucide-react";

interface PerformanceAnalyticsSectionProps {
  data: PerformanceData;
  timePeriods: string[];
  availablePeriods: string[];
  loading: boolean;
  fetching: boolean;
  viewMode: TimeFrame;
  sortOrder: SortOrder;
  onChangeSortOrder: (sortOrder: SortOrder) => void;
  getCellColor: (
    val: number | undefined,
    catName: string,
    timeKey: string,
  ) => string;
  hasMoreOlder: boolean;
  hasLoadedOlder: boolean;
  isRangeMode: boolean;
  selectedStartPeriod: string;
  selectedEndPeriod: string;
  loadMorePeriods: () => void;
  resetToLatestPeriods: () => void;
  setStartPeriod: (period: string) => void;
  setEndPeriod: (period: string) => void;
}

const PerformanceAnalyticsSection = ({
  data,
  timePeriods,
  availablePeriods,
  loading,
  fetching,
  viewMode,
  sortOrder,
  onChangeSortOrder,
  getCellColor,
  hasMoreOlder,
  hasLoadedOlder,
  isRangeMode,
  selectedStartPeriod,
  selectedEndPeriod,
  loadMorePeriods,
  resetToLatestPeriods,
  setStartPeriod,
  setEndPeriod,
}: PerformanceAnalyticsSectionProps) => {
  const tPerformance = useTranslations("public.mutualFund.performance");
  const tPerformanceAnalytics = useTranslations(
    "public.mutualFund.performance.analytics",
  );
  const tPerformanceTfWeekly = useTranslations(
    "public.mutualFund.performance.timeframe.weekly",
  );
  const tCommon = useTranslations("common");

  const periodTranslations = {
    week: tPerformanceTfWeekly("week"),
  };

  const { startOptions, endOptions } = getPeriodRangeOptions(
    availablePeriods,
    viewMode,
    selectedStartPeriod,
    selectedEndPeriod,
    periodTranslations,
  );

  const columns = getPerformancePeriodColumns(
    timePeriods,
    viewMode,
    sortOrder,
    periodTranslations,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 mb-2">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {tPerformanceAnalytics("title")}
          </h3>

          <Button
            variant="outline"
            onClick={() =>
              onChangeSortOrder(sortOrder === "asc" ? "desc" : "asc")
            }
            className="inline-flex items-center justify-start gap-2 px-4 py-2 text-sm font-medium"
            title="Toggle Sort Order"
          >
            {sortOrder === "asc" ? (
              <>
                <span className="hidden sm:inline">
                  {tPerformanceAnalytics("sort.oldestToLatest")}
                </span>
                <span className="sm:hidden">Sort: Asc</span>
                <SortAsc />
              </>
            ) : (
              <>
                <span className="hidden sm:inline">
                  {tPerformanceAnalytics("sort.latestToOldest")}
                </span>
                <span className="sm:hidden">Sort: Desc</span>
                <SortDesc />
              </>
            )}
          </Button>
        </div>

        {availablePeriods.length > 0 && (
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/70">
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="flex-1">
                <Dropdown
                  label={tPerformanceAnalytics("filters.startPeriod")}
                  value={selectedStartPeriod}
                  onChange={setStartPeriod}
                  options={startOptions}
                  placeholder={tPerformanceAnalytics(
                    "filters.startPlaceholder",
                  )}
                  className="w-full"
                />
              </div>

              <div className="flex-1">
                <Dropdown
                  label={tPerformanceAnalytics("filters.endPeriod")}
                  value={selectedEndPeriod}
                  onChange={setEndPeriod}
                  options={endOptions}
                  placeholder={tPerformanceAnalytics("filters.endPlaceholder")}
                  className="w-full"
                />
              </div>

              {(isRangeMode || hasLoadedOlder) && (
                <Button
                  variant="outline"
                  onClick={resetToLatestPeriods}
                  className="rounded-full text-sm font-medium"
                >
                  {tPerformanceAnalytics("actions.showLatestTen")}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <PerformanceTableSkeleton />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="relative">
            {fetching && <TableOverlay />}

            <PerformanceTable
              data={data}
              columns={columns}
              getCellColor={getCellColor}
              noDataMessage={tPerformance("noData")}
            />
          </div>

          {data.length > 0 && timePeriods.length > 0 && !isRangeMode && (
            <div className="flex flex-col items-center gap-3 mt-2">
              {!hasMoreOlder && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
                  {tPerformanceAnalytics("states.allAvailableDataShown")}
                </p>
              )}

              <div className="flex flex-wrap justify-center gap-2">
                {hasLoadedOlder && (
                  <Button
                    variant="secondary"
                    onClick={resetToLatestPeriods}
                    disabled={fetching}
                    className="px-6 py-2 text-sm font-medium rounded-full active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {tPerformanceAnalytics("actions.showLatestTen")}
                  </Button>
                )}

                {hasMoreOlder && (
                  <Button
                    variant="default"
                    onClick={loadMorePeriods}
                    disabled={fetching}
                    className="px-6 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 rounded-full transition-colors active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {fetching ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin text-primary" />
                        {tCommon("states.loading")}
                      </>
                    ) : (
                      <>{tCommon("states.loadOlderData")}</>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <PerformanceInformationSection />
    </div>
  );
};

export default PerformanceAnalyticsSection;
