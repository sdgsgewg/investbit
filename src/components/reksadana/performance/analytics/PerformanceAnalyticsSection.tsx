import { useTranslations } from "next-intl";
import PerformanceTable from "./PerformanceTable";
import PerformanceInformationSection from "../PerformanceInformationSection";
import PerformanceTableSkeleton from "./PerformanceTableSkeleton";
import TableOverlay from "@/components/feedback/TableOverlay";
import { safeFormatDate } from "@/lib/utils/date";
import Dropdown from "@/components/ui/Dropdown";
import { PerformanceData } from "@/types/reksadana/performance/DataType";
import { TimeFrameType } from "@/types/reksadana/performance/TimeFrameType";
import { SortOrderType } from "@/types/reksadana/performance/SortOrderType";
import { PerformanceKey } from "@/types/reksadana/performance/PerformanceKey";

interface PerformanceAnalyticsSectionProps {
  data: PerformanceData;
  timePeriods: string[];
  availablePeriods: string[];
  loading: boolean;
  fetching: boolean;
  viewMode: TimeFrameType;
  sortOrder: SortOrderType;
  columnKey: PerformanceKey;
  onChangeSortOrder: (sortOrder: SortOrderType) => void;
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
  columnKey,
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

  const getPeriodTimestamp = (period: string) => {
    if (viewMode === "weekly") {
      const [yearMonth, weekPart] = period.split("-W");
      const [weekStr] = weekPart.split("|");
      return new Date(`${yearMonth}-01`).getTime() + Number(weekStr) * 1000;
    }

    if (viewMode === "ytd" || viewMode === "yearly") {
      return new Date(Number(period), 0, 1).getTime();
    }

    return new Date(period).getTime();
  };

  const getPeriodOptionLabel = (period: string) => {
    if (viewMode === "weekly") {
      const [yearMonth, weekPart] = period.split("-W");
      const [weekStr, rangeStr] = weekPart.split("|");
      const [year, month] = yearMonth.split("-");
      const dateObj = new Date(Number(year), Number(month) - 1);
      const monthName = safeFormatDate(dateObj, "MMM");

      return `${tPerformanceTfWeekly("week")} ${weekStr} ${monthName} (${rangeStr})`;
    }

    if (viewMode === "daily") {
      return safeFormatDate(period, "dd MMM yyyy");
    }

    if (viewMode === "monthly") {
      return safeFormatDate(period, "MMMM yyyy");
    }

    if (viewMode === "ytd") {
      return `YTD ${period}`;
    }

    return period;
  };

  const effectiveStartPeriod = selectedStartPeriod || availablePeriods[0] || "";
  const effectiveEndPeriod =
    selectedEndPeriod || availablePeriods[availablePeriods.length - 1] || "";

  const sortedTimePeriods =
    sortOrder === "desc" ? [...timePeriods].reverse() : timePeriods;

  const startOptions = availablePeriods
    .filter(
      (period) =>
        !effectiveEndPeriod ||
        getPeriodTimestamp(period) <= getPeriodTimestamp(effectiveEndPeriod),
    )
    .map((period) => ({
      value: period,
      label: getPeriodOptionLabel(period),
    }));

  const endOptions = availablePeriods
    .filter(
      (period) =>
        !effectiveStartPeriod ||
        getPeriodTimestamp(period) >= getPeriodTimestamp(effectiveStartPeriod),
    )
    .map((period) => ({
      value: period,
      label: getPeriodOptionLabel(period),
    }));

  const columns = sortedTimePeriods
    .filter((p): p is string => Boolean(p))
    .map((period) => {
      if (viewMode === "weekly") {
        const [yearMonth, weekPart] = period.split("-W");
        const [weekStr, rangeStr] = weekPart.split("|");
        const [year, month] = yearMonth.split("-");
        const dateObj = new Date(Number(year), Number(month) - 1);
        const monthName = safeFormatDate(dateObj, "MMM");

        return {
          key: period,
          label: `${tPerformanceTfWeekly("week")} ${weekStr} ${monthName}`,
          subLabel: rangeStr,
        };
      }

      if (viewMode === "daily") {
        return {
          key: period,
          label: safeFormatDate(period, "dd MMM"),
          subLabel: safeFormatDate(period, "yyyy"),
        };
      }

      if (viewMode === "monthly") {
        return {
          key: period,
          label: safeFormatDate(period, "MMMM yyyy"),
        };
      }

      if (viewMode === "ytd") {
        return {
          key: period,
          label: `YTD ${period}`,
        };
      }

      return {
        key: period,
        label: period,
      };
    });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 mb-2">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {tPerformanceAnalytics("title")}
          </h3>

          <button
            onClick={() =>
              onChangeSortOrder(sortOrder === "asc" ? "desc" : "asc")
            }
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-zinc-800 dark:text-gray-200 border border-gray-300 dark:border-zinc-700 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors shadow-sm"
            title="Toggle Sort Order"
          >
            {sortOrder === "asc" ? (
              <>
                <span className="hidden sm:inline">
                  {tPerformanceAnalytics("sort.oldestToLatest")}
                </span>
                <span className="sm:hidden">Sort: Asc</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 16 4 4 4-4" />
                  <path d="M7 20V4" />
                  <path d="M11 4h4" />
                  <path d="M11 8h7" />
                  <path d="M11 12h10" />
                </svg>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">
                  {tPerformanceAnalytics("sort.latestToOldest")}
                </span>
                <span className="sm:hidden">Sort: Desc</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 8 4-4 4 4" />
                  <path d="M7 4v16" />
                  <path d="M11 4h4" />
                  <path d="M11 8h7" />
                  <path d="M11 12h10" />
                </svg>
              </>
            )}
          </button>
        </div>

        {availablePeriods.length > 0 && (
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/70">
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="flex-1">
                <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {tPerformanceAnalytics("filters.startPeriod")}
                </p>
                <Dropdown
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
                <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {tPerformanceAnalytics("filters.endPeriod")}
                </p>
                <Dropdown
                  value={selectedEndPeriod}
                  onChange={setEndPeriod}
                  options={endOptions}
                  placeholder={tPerformanceAnalytics("filters.endPlaceholder")}
                  className="w-full"
                />
              </div>

              {(isRangeMode || hasLoadedOlder) && (
                <button
                  onClick={resetToLatestPeriods}
                  className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  {tPerformanceAnalytics("actions.showLatestTen")}
                </button>
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
              columnKey={columnKey}
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
                  <button
                    onClick={resetToLatestPeriods}
                    disabled={fetching}
                    className="px-6 py-2 text-sm font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 dark:text-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full transition-colors active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {tPerformanceAnalytics("actions.showLatestTen")}
                  </button>
                )}

                {hasMoreOlder && (
                  <button
                    onClick={loadMorePeriods}
                    disabled={fetching}
                    className="px-6 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 rounded-full transition-colors active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                  >
                    {fetching ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {tCommon("states.loading")}
                      </>
                    ) : (
                      <>{tCommon("states.loadOlderData")}</>
                    )}
                  </button>
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
