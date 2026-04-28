import { Award, Medal, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { safeFormatDate } from "@/lib/utils/date";
import { TimeFrameType } from "@/features/reksadana/recap/performance/types/TimeFrameType";
import CategoryLeaderboardSkeleton from "./CategoryLeaderboardSkeleton";

interface PerformanceItem {
  itemId: string;
  itemName: string;
  dailyYields?: Record<string, number>;
  weeklyYields?: Record<string, number>;
  monthlyYields?: Record<string, number>;
  ytdYields?: Record<string, number>;
  yearlyYields?: Record<string, number>;
  [key: string]: string | Record<string, number> | undefined;
}

interface PerformanceCategory {
  categoryName: string;
  items: PerformanceItem[];
}

interface RankedItem {
  itemId: string;
  itemName: string;
  yieldVal: number;
  rank: number;
}

interface RankedCategory {
  categoryName: string;
  rankedItems: RankedItem[];
}

interface CategoryLeaderboardProps {
  data: PerformanceCategory[];
  timePeriods: string[];
  loading: boolean;
  fetching: boolean;
  columnKey: string;
  viewMode: TimeFrameType;
}

const CategoryLeaderboard = ({
  data,
  timePeriods,
  loading,
  fetching,
  columnKey,
  viewMode,
}: CategoryLeaderboardProps) => {
  const tLeaderboard = useTranslations(
    "reksadana.recap.performance.leaderboard",
  );
  const tWeekly = useTranslations(
    "reksadana.recap.performance.timeframe.weekly",
  );

  const latestPeriod = timePeriods[timePeriods.length - 1];

  const getYieldForPeriod = (
    item: PerformanceItem,
    period: string,
  ): number | undefined => {
    const candidate = item[columnKey];
    if (!candidate || typeof candidate !== "object") return undefined;

    return (candidate as Record<string, number>)[period];
  };

  const rankedCategories: RankedCategory[] =
    latestPeriod && data.length > 0
      ? data
          .map((category) => {
            const rankedItems = category.items
              .map((item) => {
                const yieldVal = getYieldForPeriod(item, latestPeriod);
                return yieldVal !== undefined && !Number.isNaN(yieldVal)
                  ? {
                      itemId: item.itemId,
                      itemName: item.itemName,
                      yieldVal,
                    }
                  : null;
              })
              .filter((item): item is Omit<RankedItem, "rank"> => item !== null)
              .sort((a, b) => b.yieldVal - a.yieldVal)
              .map((item, index) => ({
                ...item,
                rank: index + 1,
              }));

            return {
              categoryName: category.categoryName,
              rankedItems,
            };
          })
          .filter((category) => category.rankedItems.length > 0)
      : [];

  const getPeriodDisplay = () => {
    if (!latestPeriod) return "";

    if (viewMode === "daily") {
      return safeFormatDate(latestPeriod, "dd MMMM yyyy");
    }

    if (viewMode === "weekly" && latestPeriod.includes("-W")) {
      const [yearMonth, weekPart] = latestPeriod.split("-W");
      const [weekStr, rangeStr] = weekPart.split("|");
      const [year, month] = yearMonth.split("-");
      const dateObj = new Date(Number(year), Number(month) - 1);
      const monthName = safeFormatDate(dateObj, "MMM");

      return `${tWeekly("week")} ${weekStr} ${monthName} (${rangeStr}), ${year}`;
    }

    if (viewMode === "monthly") {
      return safeFormatDate(latestPeriod, "MMMM yyyy");
    }

    if (viewMode === "ytd") {
      return `YTD ${latestPeriod}`;
    }

    return latestPeriod;
  };

  const getYieldClassName = (yieldVal: number, rank: number) => {
    const tone =
      yieldVal >= 0
        ? "text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-900/20"
        : "text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-900/20";

    if (rank === 1) return `${tone} ring-1 ring-amber-300 dark:ring-amber-700`;
    if (rank === 2) return `${tone} ring-1 ring-slate-300 dark:ring-slate-600`;
    if (rank === 3) return `${tone} ring-1 ring-orange-300 dark:ring-orange-700`;
    return tone;
  };

  const getRankBadgeClassName = (rank: number) => {
    if (rank === 1) {
      return "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700";
    }

    if (rank === 2) {
      return "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600";
    }

    if (rank === 3) {
      return "bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700";
    }

    return "bg-zinc-100 text-zinc-700 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700";
  };

  const getRowClassName = (rank: number) => {
    if (rank <= 3) {
      return "border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950";
    }

    return "border-zinc-100 bg-white/80 dark:border-zinc-800 dark:bg-zinc-950/70";
  };

  const renderRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-4 w-4" />;
    if (rank === 2) return <Medal className="h-4 w-4" />;
    if (rank === 3) return <Award className="h-4 w-4" />;
    return null;
  };

  const formatYield = (yieldVal: number) => {
    return yieldVal >= 0 ? `+${yieldVal.toFixed(2)}%` : `${yieldVal.toFixed(2)}%`;
  };

  if (loading || fetching) {
    return <CategoryLeaderboardSkeleton />;
  }

  if (!latestPeriod || rankedCategories.length === 0) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        {tLeaderboard("noData")}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Medal className="h-5 w-5 text-emerald-500" />
            <h3 className="text-xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {tLeaderboard("title")}
            </h3>
          </div>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {tLeaderboard("subtitle", { period: getPeriodDisplay() })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {rankedCategories.map((category) => (
          <div
            key={category.categoryName}
            className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/60"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {category.categoryName}
                </h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {tLeaderboard("labels.funds", {
                    count: category.rankedItems.length,
                  })}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {category.rankedItems.map((item) => (
                <div
                  key={item.itemId}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors ${getRowClassName(item.rank)}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${getRankBadgeClassName(item.rank)}`}
                    >
                      {renderRankIcon(item.rank) ?? item.rank}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-zinc-900 dark:text-zinc-100">
                        {item.itemName}
                      </p>
                      <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        #{item.rank}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-sm font-bold ${getYieldClassName(item.yieldVal, item.rank)}`}
                  >
                    {formatYield(item.yieldVal)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryLeaderboard;
