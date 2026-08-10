import React, { useMemo } from "react";
import { Trophy, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import TopPerformersSkeleton from "./TopPerformersSkeleton";
import { TimeFrame } from "@/enums/TimeFrame";
import { getTopPerformers } from "@/lib/mutual-fund/performance/selector";
import { formatPerformancePeriod } from "@/lib/mutual-fund/performance/period";
import { PerformanceData } from "@/types/mutual-fund/performance";

interface TopPerformersProps {
  data: PerformanceData;
  timePeriods: string[];
  loading: boolean;
  fetching: boolean;
  viewMode: TimeFrame;
}

const TopPerformers: React.FC<TopPerformersProps> = ({
  data,
  timePeriods,
  loading,
  fetching,
  viewMode,
}) => {
  const tTopPerformers = useTranslations(
    "public.mutualFund.performance.topPerformers",
  );
  const tRecapPerformanceTfWeekly = useTranslations(
    "public.mutualFund.performance.timeframe.weekly",
  );

  // Compute winners
  const winners = useMemo(
    () => getTopPerformers(data, timePeriods),
    [data, timePeriods],
  );

  // 1. First load → full skeleton
  if (loading) {
    return <TopPerformersSkeleton />;
  }

  // 2. While refetching → tetap tampil skeleton (lebih clean)
  if (fetching) {
    return <TopPerformersSkeleton />;
  }

  // 3. No data beneran
  if (!winners || !winners.overallBest) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        {tTopPerformers("noData")}
      </div>
    );
  }

  const { overallBest, categoryBests, latestPeriod } = winners;

  const periodDisplay = formatPerformancePeriod({
    period: latestPeriod,
    timeFrame: viewMode,
    weekLabel: tRecapPerformanceTfWeekly("week"),
  });

  const getLabel = () => {
    if (viewMode === TimeFrame.DAILY) return tTopPerformers("labels.daily");
    if (viewMode === TimeFrame.WEEKLY) return tTopPerformers("labels.weekly");
    if (viewMode === TimeFrame.MONTHLY) return tTopPerformers("labels.monthly");
    if (viewMode === TimeFrame.YTD) return tTopPerformers("labels.ytd");
    return tTopPerformers("labels.yearly");
  };

  const getBestYieldClassName = (num: number | string): string => {
    const modifiedNumber = Number(num);
    return modifiedNumber >= 0
      ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
      : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20";
  };

  const getModifiedBestYield = (num: number | string): string => {
    const modifiedNumber = Number(num);
    return modifiedNumber >= 0
      ? `+${modifiedNumber.toFixed(2)}`
      : `${modifiedNumber.toFixed(2)}`;
  };

  return (
    <div className="mb-8">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-blue-500" size={24} />
        <h3 className="text-xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {tTopPerformers("title")}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Winner Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="md:col-span-1 bg-linear-to-br from-amber-100 to-amber-50 dark:from-yellow-900/30 dark:to-yellow-800/10 rounded-2xl p-6 shadow-sm border border-amber-200 dark:border-yellow-700/50 relative overflow-hidden"
        >
          {/* Decorative element */}
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Trophy size={100} className="text-amber-500" />
          </div>

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold mb-1">
                <Trophy size={18} />
                <span className="text-sm uppercase tracking-wider">
                  {getLabel()}
                </span>
              </div>
              <p className="text-xs text-amber-600/80 dark:text-amber-500/80 mb-4">
                {periodDisplay}
              </p>

              <h4 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-1 leading-tight">
                {overallBest.name}
              </h4>
              <p className="text-sm font-medium text-amber-700 dark:text-amber-400 bg-amber-200/50 dark:bg-amber-900/40 inline-block px-2 py-0.5 rounded-md">
                {overallBest.category}
              </p>
            </div>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-green-600 dark:text-green-400">
                {getModifiedBestYield(overallBest.yieldValue.toFixed(2))}
              </span>
              <span className="text-green-600 dark:text-green-500 font-semibold">
                %
              </span>
            </div>
          </div>
        </motion.div>

        {/* Category Winners */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categoryBests.map((catBest, idx) => (
            <motion.div
              key={catBest.category}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium mb-3">
                  <Award size={16} />
                  <span className="text-xs uppercase tracking-wider">
                    {tTopPerformers("labels.topIn")} {catBest.category}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 line-clamp-2">
                  {catBest.name}
                </h4>
              </div>

              <div className="mt-3 flex justify-end">
                <span
                  className={`font-bold ${getBestYieldClassName(catBest.yieldValue.toFixed(2))} px-2 py-1 rounded-md text-sm`}
                >
                  {getModifiedBestYield(catBest.yieldValue.toFixed(2))}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPerformers;
