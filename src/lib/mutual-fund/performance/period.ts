import { safeFormatDate } from "@/lib/utils/date";
import { TimeFrame } from "@/enums/TimeFrame";
import { SortOrder } from "@/types/sort";

// Usage: Top Performers & Category Leaderboard

interface FormatPerformancePeriodOptions {
  period: string;
  timeFrame: TimeFrame;
  weekLabel: string;
}

export function formatPerformancePeriod({
  period,
  timeFrame,
  weekLabel,
}: FormatPerformancePeriodOptions): string {
  if (!period) {
    return "";
  }

  if (timeFrame === TimeFrame.DAILY) {
    return safeFormatDate(period, "dd MMMM yyyy");
  }

  if (timeFrame === TimeFrame.WEEKLY && period.includes("-W")) {
    const [yearMonth, weekPart] = period.split("-W");

    const [week, range] = weekPart.split("|");

    const [year, month] = yearMonth.split("-");

    const date = new Date(Number(year), Number(month) - 1);

    const monthName = safeFormatDate(date, "MMM");

    return `${weekLabel} ${week} ${monthName} (${range}), ${year}`;
  }

  if (timeFrame === TimeFrame.MONTHLY) {
    return safeFormatDate(period, "MMMM yyyy");
  }

  if (timeFrame === TimeFrame.YTD) {
    return `YTD ${period}`;
  }

  return period;
}

// Usage: Performance Analytics

interface PeriodTranslations {
  week: string;
}

export interface PerformancePeriodOption {
  value: string;
  label: string;
}

export interface PerformancePeriodColumn {
  key: string;
  label: string;
  subLabel?: string;
}

function getPeriodTimestamp(period: string, timeFrame: TimeFrame): number {
  if (timeFrame === TimeFrame.WEEKLY) {
    const [yearMonth, weekPart] = period.split("-W");
    const [weekString] = weekPart.split("|");

    return new Date(`${yearMonth}-01`).getTime() + Number(weekString) * 1000;
  }

  if (timeFrame === TimeFrame.YTD || timeFrame === TimeFrame.YEARLY) {
    return new Date(Number(period), 0, 1).getTime();
  }

  return new Date(period).getTime();
}

export function getPeriodOptionLabel(
  period: string,
  timeFrame: TimeFrame,
  translations: PeriodTranslations,
): string {
  if (timeFrame === TimeFrame.WEEKLY) {
    const [yearMonth, weekPart] = period.split("-W");
    const [weekString, range] = weekPart.split("|");
    const [year, month] = yearMonth.split("-");

    const date = new Date(Number(year), Number(month) - 1);

    const monthName = safeFormatDate(date, "MMM");

    return `${translations.week} ${weekString} ${monthName} (${range})`;
  }

  if (timeFrame === TimeFrame.DAILY) {
    return safeFormatDate(period, "dd MMM yyyy");
  }

  if (timeFrame === TimeFrame.MONTHLY) {
    return safeFormatDate(period, "MMMM yyyy");
  }

  if (timeFrame === TimeFrame.YTD) {
    return `YTD ${period}`;
  }

  return period;
}

export function getPerformancePeriodColumns(
  periods: string[],
  timeFrame: TimeFrame,
  sortOrder: SortOrder,
  translations: PeriodTranslations,
): PerformancePeriodColumn[] {
  const sortedPeriods = sortOrder === "desc" ? [...periods].reverse() : periods;

  return sortedPeriods.filter(Boolean).map((period) => {
    if (timeFrame === TimeFrame.WEEKLY) {
      const [yearMonth, weekPart] = period.split("-W");
      const [weekString, range] = weekPart.split("|");
      const [year, month] = yearMonth.split("-");

      const date = new Date(Number(year), Number(month) - 1);

      return {
        key: period,
        label: `${translations.week} ${weekString} ${safeFormatDate(
          date,
          "MMM",
        )}`,
        subLabel: range,
      };
    }

    if (timeFrame === TimeFrame.DAILY) {
      return {
        key: period,
        label: safeFormatDate(period, "dd MMM"),
        subLabel: safeFormatDate(period, "yyyy"),
      };
    }

    if (timeFrame === TimeFrame.MONTHLY) {
      return {
        key: period,
        label: safeFormatDate(period, "MMMM yyyy"),
      };
    }

    if (timeFrame === TimeFrame.YTD) {
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
}

export function getPeriodRangeOptions(
  availablePeriods: string[],
  timeFrame: TimeFrame,
  startPeriod: string,
  endPeriod: string,
  translations: PeriodTranslations,
) {
  const effectiveStartPeriod = startPeriod || availablePeriods[0] || "";

  const effectiveEndPeriod =
    endPeriod || availablePeriods[availablePeriods.length - 1] || "";

  const startOptions: PerformancePeriodOption[] = availablePeriods
    .filter(
      (period) =>
        !effectiveEndPeriod ||
        getPeriodTimestamp(period, timeFrame) <=
          getPeriodTimestamp(effectiveEndPeriod, timeFrame),
    )
    .map((period) => ({
      value: period,
      label: getPeriodOptionLabel(period, timeFrame, translations),
    }));

  const endOptions: PerformancePeriodOption[] = availablePeriods
    .filter(
      (period) =>
        !effectiveStartPeriod ||
        getPeriodTimestamp(period, timeFrame) >=
          getPeriodTimestamp(effectiveStartPeriod, timeFrame),
    )
    .map((period) => ({
      value: period,
      label: getPeriodOptionLabel(period, timeFrame, translations),
    }));

  return {
    effectiveStartPeriod,
    effectiveEndPeriod,
    startOptions,
    endOptions,
  };
}
