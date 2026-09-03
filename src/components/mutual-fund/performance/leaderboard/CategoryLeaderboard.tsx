import { Award, Medal, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";

import { useNumberFormatter } from "@/hooks/useNumberFormatter";

import CategoryLeaderboardSkeleton from "./CategoryLeaderboardSkeleton";
import { TimeFrame } from "@/enums/TimeFrame";
import { formatPerformancePeriod } from "@/lib/mutual-fund/performance/period";
import {
  getLeaderboardYieldClassName,
  getRankBadgeClassName,
  getRankRowClassName,
} from "@/lib/mutual-fund/performance/colors";
import { useCategoryLeaderboard } from "@/hooks/mutual-fund/performance/useCategoryLeaderboard";

interface CategoryLeaderboardProps {
  viewMode: TimeFrame;
  categoryId?: string;
}

const CategoryLeaderboard = ({
  viewMode,
  categoryId,
}: CategoryLeaderboardProps) => {
  const tLeaderboard = useTranslations(
    "public.mutualFund.performance.leaderboard",
  );
  const tWeekly = useTranslations(
    "public.mutualFund.performance.timeframe.weekly",
  );

  const { formatPercent } = useNumberFormatter();

  const { rankedCategories, latestPeriod, loading, fetching } =
    useCategoryLeaderboard({
      timeFrame: viewMode,
      categoryId,
    });

  const periodDisplay = latestPeriod
    ? formatPerformancePeriod({
        period: latestPeriod,
        timeFrame: viewMode,
        weekLabel: tWeekly("week"),
      })
    : "";

  const renderRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-4 w-4" />;
    if (rank === 2) return <Medal className="h-4 w-4" />;
    if (rank === 3) return <Award className="h-4 w-4" />;
    return null;
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
            {tLeaderboard("subtitle", { period: periodDisplay })}
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

            <div className="max-h-60 overflow-y-auto space-y-2 sm:space-y-3">
              {category.rankedItems.map((item) => (
                <div
                  key={item.itemId}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors ${getRankRowClassName(item.rank)}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${getRankBadgeClassName(item.rank)}`}
                    >
                      {renderRankIcon(item.rank) ?? item.rank}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        {item.itemName}
                      </p>
                      <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        #{item.rank}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-sm font-bold ${getLeaderboardYieldClassName(item.yieldValue, item.rank)}`}
                  >
                    {formatPercent(item.yieldValue)}
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
