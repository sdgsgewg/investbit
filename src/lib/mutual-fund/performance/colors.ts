import { CategoryStats } from "@/types/mutual-fund/performance";

/**
 * Calculates a dynamic RGBA heatmap background color for a performance table cell
 * based on the min and max yields of that category during the specific period.
 */
export const getPerformanceCellColor = (
  val: number | undefined,
  catName: string,
  timeKey: string,
  categoryStats?: CategoryStats,
): string => {
  if (val === undefined || isNaN(val)) return "";

  const stat = categoryStats?.[catName]?.[timeKey];
  if (!stat || stat.min === stat.max) return "";

  const normalized = (val - stat.min) / (stat.max - stat.min);

  if (normalized < 0.5) {
    const intensity = 1 - normalized / 0.5;
    return `rgba(239, 68, 68, ${Math.max(intensity * 0.8, 0.05)})`;
  } else {
    const intensity = (normalized - 0.5) / 0.5;
    return `rgba(34, 197, 94, ${Math.max(intensity * 0.8, 0.05)})`;
  }
};

/**
 * Returns badge styling for top performer card yields
 */
export const getTopPerformerYieldClassName = (
  num: number | string,
): string => {
  const modifiedNumber = Number(num);
  return modifiedNumber >= 0
    ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
    : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20";
};

/**
 * Formats yield number with explicit + sign if positive
 */
export const formatSignedYield = (num: number | string): string => {
  const modifiedNumber = Number(num);
  return modifiedNumber >= 0
    ? `+${modifiedNumber.toFixed(2)}`
    : `${modifiedNumber.toFixed(2)}`;
};

/**
 * Returns badge background & border styling based on rank for leaderboards
 */
export const getRankBadgeClassName = (rank: number): string => {
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

/**
 * Returns leaderboard row container styling
 */
export const getRankRowClassName = (rank: number): string => {
  if (rank <= 3) {
    return "border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950";
  }

  return "border-zinc-100 bg-white/80 dark:border-zinc-800 dark:bg-zinc-950/70";
};

/**
 * Returns leaderboard yield pill styling with rank highlight rings
 */
export const getLeaderboardYieldClassName = (
  yieldVal: number,
  rank: number,
): string => {
  const tone =
    yieldVal >= 0
      ? "text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-900/20"
      : "text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-900/20";

  if (rank === 1) return `${tone} ring-1 ring-amber-300 dark:ring-amber-700`;
  if (rank === 2) return `${tone} ring-1 ring-slate-300 dark:ring-slate-600`;
  if (rank === 3) return `${tone} ring-1 ring-orange-300 dark:ring-orange-700`;
  return tone;
};
