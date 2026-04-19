import { SortOrderType } from "@/features/reksadana/recap/performance/types/SortOrderType";
import { useTranslations } from "next-intl";
import PerformanceTable from "./PerformanceTable";
import PerformanceInformationSection from "../PerformanceInformationSection";
import { TimeFrameType } from "@/features/reksadana/recap/performance/types/TimeFrameType";
import { PerformanceKey } from "@/features/reksadana/recap/performance/types/PerformanceKey";
import PerformanceTableSkeleton from "./PerformanceTableSkeleton";
import TableOverlay from "@/components/feedback/TableOverlay";
import { safeFormatDate } from "@/lib/utils/date";
import { PerformanceData } from "../../types/DataType";

interface PerformanceAnalyticsSectionProps {
  data: PerformanceData;
  timePeriods: string[];
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
  loadMorePeriods: () => void;
}

const PerformanceAnalyticsSection = ({
  data,
  timePeriods,
  loading,
  fetching,
  viewMode,
  sortOrder,
  columnKey,
  onChangeSortOrder,
  getCellColor,
  loadMorePeriods,
}: PerformanceAnalyticsSectionProps) => {
  const tRecapPerformance = useTranslations("reksadana.recap.performance");
  const tPerformanceAnalytics = useTranslations(
    "reksadana.recap.performance.analytics",
  );
  const tPerformanceTfWeekly = useTranslations(
    "reksadana.recap.performance.timeframe.weekly",
  );
  const tCommon = useTranslations("common");

  const sortedTimePeriods =
    sortOrder === "desc" ? [...timePeriods].reverse() : timePeriods;

  // Prepare columns for the PerformanceTable based on viewMode
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

      // yearly
      return {
        key: period,
        label: period,
      };
    });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          {tPerformanceAnalytics("title")}
        </h3>

        {/* Table-Specific Sort Toggle */}
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
              noDataMessage={tRecapPerformance("noData")}
            />
          </div>
          
          {data.length > 0 && timePeriods.length > 0 && (
            <div className="flex justify-center mt-2">
              <button
                onClick={loadMorePeriods}
                disabled={fetching}
                className="px-6 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 rounded-full transition-colors active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
              >
                {fetching ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {tCommon("states.loading")}
                  </>
                ) : (
                  <>{tCommon("states.loadOlderData")}</>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      <PerformanceInformationSection />
    </div>
  );
};

export default PerformanceAnalyticsSection;
