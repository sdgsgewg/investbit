import React, { useMemo } from "react";
import { Trophy, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TimeFrameType } from "@/features/reksadana/recap/performance/types/TimeFrameType";
import TopPerformersSkeleton from "./TopPerformersSkeleton";

interface PerformanceItem {
  itemId: string;
  itemName: string;
  dailyYields?: Record<string, number>;
  weeklyYields?: Record<string, number>;
  monthlyYields?: Record<string, number>;
  ytdYields?: Record<string, number>;
  yearlyYields?: Record<string, number>;
  [key: string]: any;
}

interface PerformanceCategory {
  categoryName: string;
  items: PerformanceItem[];
}

interface TopPerformersProps {
  data: PerformanceCategory[];
  timePeriods: string[];
  loading: boolean;
  fetching: boolean;
  columnKey: string;
  viewMode: TimeFrameType;
}

interface Winner {
  name: string;
  category: string;
  yieldVal: number;
}

const TopPerformers: React.FC<TopPerformersProps> = ({
  data,
  timePeriods,
  loading,
  fetching,
  columnKey,
  viewMode,
}) => {
  const tTopPerformers = useTranslations(
    "reksadana.recap.performance.topPerformers",
  );
  const tRecapPerformanceTfWeekly = useTranslations(
    "reksadana.recap.performance.timeframe.weekly",
  );

  // Compute winners
  const winners = useMemo(() => {
    if (!data || data.length === 0 || !timePeriods || timePeriods.length === 0)
      return null;

    // Get the latest period (the last one in the sorted array)
    const latestPeriod = timePeriods?.[timePeriods.length - 1];
    if (!latestPeriod) return null;

    let overallBest: Winner | null = null;
    const categoryBests: Winner[] = [];

    for (const category of data) {
      let bestInCategory: { name: string; yieldVal: number } | null = null;

      for (const item of category.items) {
        const yieldVal = item[columnKey]?.[latestPeriod];

        if (
          yieldVal !== undefined &&
          typeof yieldVal === "number" &&
          !isNaN(yieldVal)
        ) {
          if (!bestInCategory || yieldVal > bestInCategory.yieldVal) {
            bestInCategory = { name: item.itemName, yieldVal };
          }

          if (!overallBest || yieldVal > overallBest.yieldVal) {
            overallBest = {
              name: item.itemName,
              category: category.categoryName,
              yieldVal,
            };
          }
        }
      }

      if (bestInCategory) {
        categoryBests.push({
          category: category.categoryName,
          name: bestInCategory.name,
          yieldVal: bestInCategory.yieldVal,
        });
      }
    }

    return { latestPeriod, overallBest, categoryBests };
  }, [data, timePeriods, columnKey]);

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

    // return <TopPerformersSkeleton />;
  }

  const { overallBest, categoryBests, latestPeriod } = winners;

  const getLabel = () => {
    if (viewMode === "daily") return tTopPerformers("labels.daily");
    if (viewMode === "weekly") return tTopPerformers("labels.weekly");
    if (viewMode === "monthly") return tTopPerformers("labels.monthly");
    if (viewMode === "ytd") return tTopPerformers("labels.ytd");
    return tTopPerformers("labels.yearly");
  };

  const getPeriodDisplay = () => {
    try {
      if (viewMode === "daily") {
        try {
          const safeDateStr = latestPeriod.split("T")[0];
          const d = new Date(safeDateStr + "T00:00:00");

          if (!isNaN(d.getTime())) {
            return d.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
          }

          return safeDateStr;
        } catch {
          return latestPeriod;
        }
      }

      if (viewMode === "weekly") {
        if (latestPeriod.includes("-W")) {
          const [ym, w] = latestPeriod.split("-W");
          return `${tRecapPerformanceTfWeekly("week")} ${w}, ${ym}`;
        }
        return latestPeriod;
      }

      if (viewMode === "monthly") {
        const d = new Date(latestPeriod);
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          });
        }
        return latestPeriod;
      }

      if (viewMode === "ytd") {
        return `YTD ${latestPeriod}`;
      }

      if (viewMode === "yearly") {
        return latestPeriod;
      }

      return latestPeriod;
    } catch {
      return latestPeriod;
    }
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
                {getPeriodDisplay()}
              </p>

              <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-1 leading-tight">
                {overallBest.name}
              </h4>
              <p className="text-sm font-medium text-amber-700 dark:text-amber-400 bg-amber-200/50 dark:bg-amber-900/40 inline-block px-2 py-0.5 rounded-md">
                {overallBest.category}
              </p>
            </div>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-3xl font-black text-green-600 dark:text-green-400">
                {getModifiedBestYield(overallBest.yieldVal.toFixed(2))}
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
                  className={`font-bold ${getBestYieldClassName(catBest.yieldVal.toFixed(2))} px-2 py-1 rounded-md text-sm`}
                >
                  {getModifiedBestYield(catBest.yieldVal.toFixed(2))}%
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
