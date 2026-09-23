import { format, startOfMonth } from "date-fns";
import { safeFormatDate } from "@/lib/utils/date";
import { TimeFrame } from "@/enums/TimeFrame";
import { SortOrder } from "@/types/sort";

// --- Types ---

export interface PeriodTranslations {
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

export interface WeekInfo {
  week: number;
  start?: Date;
  end?: Date;
}

export interface PerformancePeriodRangeOptions {
  effectiveStartPeriod: string;
  effectiveEndPeriod: string;
  startOptions: PerformancePeriodOption[];
  endOptions: PerformancePeriodOption[];
}

interface FormatPerformancePeriodOptions {
  period: string;
  timeFrame: TimeFrame;
  weekLabel: string;
}

interface ParsedWeeklyPeriod {
  yearMonth: string;
  week: string;
  range: string;
  year: number;
  month: number;
}

// --- Date & Week Computation Helpers ---

export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const getFirstDayOfMonth = (year: number, month: number): Date =>
  new Date(year, month, 1);

const getLastDayOfMonth = (year: number, month: number): Date =>
  new Date(year, month + 1, 0);

const getMonthAndYear = (date: Date) => ({
  year: date.getFullYear(),
  month: date.getMonth(),
});

const parseDate = (dateStr: string): Date => new Date(dateStr);

const parseWeeklyPeriod = (period: string): ParsedWeeklyPeriod | null => {
  // Weekly memiliki format:
  // "yyyy-MM-Wweek|range"
  //
  // Contoh:
  // "2026-09-W4|21-25 Sep"
  //
  // Pisahkan bagian "yyyy-MM" dan "Wweek".
  const [yearMonth, weekPart] = period.split("-W");

  if (!yearMonth || !weekPart) {
    return null;
  }

  const [week, range] = weekPart.split("|");
  const [yearString, monthString] = yearMonth.split("-");

  const year = Number(yearString);
  const month = Number(monthString);

  if (
    !week ||
    !range ||
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    month < 1 ||
    month > 12
  ) {
    return null;
  }

  return {
    yearMonth,
    week,
    range,
    year,
    month,
  };
};

const getWeeklyPeriodDate = (parsedPeriod: ParsedWeeklyPeriod): Date =>
  new Date(parsedPeriod.year, parsedPeriod.month - 1);

/**
 * Formats a weekly period into a readable label.
 *
 * @param period - Weekly period key.
 * @param weekLabel - Translated label for "Week".
 * @param includeYear - Whether to include the year in the label.
 */
const getWeeklyPeriodLabel = (
  period: string,
  weekLabel: string,
  includeYear: boolean,
): string | null => {
  const parsed = parseWeeklyPeriod(period);

  if (!parsed) {
    return null;
  }

  const monthName = safeFormatDate(getWeeklyPeriodDate(parsed), "MMM");

  return includeYear
    ? `${weekLabel} ${parsed.week} ${monthName} (${parsed.range}), ${parsed.year}`
    : `${weekLabel} ${parsed.week} ${monthName} (${parsed.range})`;
};

/**
 * Finds the week range that contains or precedes the given date.
 *
 * Falls back to the first week when no matching week is found.
 */
const getWeekRangeForDate = (
  date: Date,
  weeks: Record<number, { start: Date; end: Date }>,
): { week: number; start?: Date; end?: Date } => {
  const matchingWeeks = Object.entries(weeks)
    .map(([week, range]) => ({
      week: Number(week),
      ...range,
    }))
    .filter(({ start }) => start <= date)
    .sort((a, b) => a.week - b.week);

  const match = matchingWeeks.at(-1);

  if (!match) {
    return {
      week: 1,
      start: weeks[1]?.start,
      end: weeks[1]?.end,
    };
  }

  return match;
};

/**
 *
 * membentuk mapping semua minggu dalam suatu bulan beserta
 * start dan end-nya.
 *
 * @param year
 * @param month
 * @returns Record<number, { start: Date; end: Date }>
 */
export const getMonthWeeks = (
  year: number,
  month: number,
): Record<number, { start: Date; end: Date }> => {
  const current = getFirstDayOfMonth(year, month);
  const lastDay = getLastDayOfMonth(year, month);

  // Contoh hasil:
  // {
  //   1: { start: ..., end: ... },
  //   2: { start: ..., end: ... },
  // }
  const weeks: Record<number, { start: Date; end: Date }> = {};

  // Penomoran minggu dimulai dari minggu ke-1.
  let week = 1;

  // Menyimpan tanggal awal dan akhir dari minggu yang sedang diproses.
  let currentWeekStart: Date | null = null;
  let currentWeekEnd: Date | null = null;

  // Iterasi setiap hari dari awal sampai akhir bulan.
  while (current <= lastDay) {
    if (!isWeekend(current)) {
      const day = current.getDay();

      // Jika menemukan hari Senin baru dan bukan tanggal 1,
      // berarti sudah memasuki minggu kerja berikutnya.
      if (day === 1 && current.getDate() !== 1) {
        if (!currentWeekStart) {
          // Jika belum ada minggu yang dimulai sebelumnya,
          // Senin ini menjadi awal minggu pertama.
          currentWeekStart = new Date(current);
        } else {
          // Jika sudah ada minggu sebelumnya,
          // Senin ini menandakan dimulainya minggu berikutnya.
          week++;
          currentWeekStart = new Date(current);
        }
      } else if (!currentWeekStart) {
        // Jika belum memiliki awal minggu,
        // gunakan hari kerja pertama yang ditemukan sebagai start.
        currentWeekStart = new Date(current);
      }

      // Setiap hari kerja yang ditemukan menjadi end sementara
      // dari minggu yang sedang diproses.
      currentWeekEnd = new Date(current);

      // Simpan/update range minggu tersebut.
      // Karena assignment dilakukan setiap hari,
      // end akan terus diperbarui sampai hari kerja terakhir.
      weeks[week] = {
        start: currentWeekStart,
        end: currentWeekEnd,
      };
    }

    current.setDate(current.getDate() + 1);
  }

  return weeks;
};

/**
 *
 * mencari tanggal tertentu masuk ke minggu ke berapa, lalu
 * mengambil start dan end dari minggu tersebut.
 *
 * @param dateStr
 * @returns {
 *  week: number;
 *  start: Date;
 *  end: Date;
 * }
 */
export const getWeekInfo = (dateStr: string) => {
  const date = parseDate(dateStr);
  const { year, month } = getMonthAndYear(date);

  // Generate seluruh range minggu pada bulan tersebut.
  const weeks = getMonthWeeks(year, month);

  return getWeekRangeForDate(date, weeks);
};

/**
 *
 * @param dateStr
 * @returns string
 */
export const getWeekKey = (dateStr: string): string => {
  const date = parseDate(dateStr);
  const month = format(date, "yyyy-MM");
  const { week, start, end } = getWeekInfo(dateStr);

  if (!start || !end) return "";

  // Membentuk label range minggu.
  // Contoh: "21-25 Sep"
  const range = `${format(start, "d")}-${format(end, "d MMM")}`;

  // Membentuk unique key untuk minggu tersebut.
  // Contoh: "2026-09-W4|21-25 Sep"
  return `${month}-W${week}|${range}`;
};

// --- Performance Period Helpers ---

/**
 *
 * @param dateStr
 * @param timeFrame
 * @returns string
 */
export const getPerformancePeriodKey = (
  dateStr: string,
  timeFrame: TimeFrame,
): string => {
  switch (timeFrame) {
    case TimeFrame.DAILY:
      // Daily menggunakan tanggal secara langsung.
      // Contoh: "2026-09-24"
      return dateStr;

    case TimeFrame.WEEKLY:
      // Weekly menggunakan key yang dibuat oleh getWeekKey().
      // Contoh: "2026-09-W4|21-25 Sep"
      return getWeekKey(dateStr);

    case TimeFrame.MONTHLY:
      // Monthly menggunakan tanggal pertama dari bulan tersebut.
      // Contoh: "2026-09-01" untuk tanggal berapa pun di September 2026.
      return format(startOfMonth(new Date(dateStr)), "yyyy-MM-dd");

    case TimeFrame.YTD:
    case TimeFrame.YEARLY:
      // YTD dan Yearly menggunakan tahun saja.
      // Contoh: "2026"
      return dateStr.substring(0, 4);

    default:
      return dateStr;
  }
};

/**
 *
 * @param period
 * @param timeFrame
 * @returns number
 */
export function getPeriodTimestamp(
  period: string,
  timeFrame: TimeFrame,
): number {
  if (timeFrame === TimeFrame.WEEKLY) {
    const parsed = parseWeeklyPeriod(period);

    if (!parsed) {
      return parseDate(period).getTime();
    }

    // This is intentionally a sortable value, not the actual week timestamp.
    return (
      new Date(`${parsed.yearMonth}-01`).getTime() + Number(parsed.week) * 1000
    );
  }

  if (timeFrame === TimeFrame.YTD || timeFrame === TimeFrame.YEARLY) {
    return new Date(Number(period), 0, 1).getTime();
  }

  return parseDate(period).getTime();
}

// --- Usage: Top Performers & Category Leaderboard ---

export function formatPerformancePeriod({
  period,
  timeFrame,
  weekLabel,
}: FormatPerformancePeriodOptions): string {
  if (!period) {
    return "";
  }

  switch (timeFrame) {
    case TimeFrame.DAILY:
      return safeFormatDate(period, "dd MMMM yyyy");

    case TimeFrame.WEEKLY:
      return getWeeklyPeriodLabel(period, weekLabel, true) ?? period;

    case TimeFrame.MONTHLY:
      return safeFormatDate(period, "MMMM yyyy");

    case TimeFrame.YTD:
      return `YTD ${period}`;

    case TimeFrame.YEARLY:
    default:
      return period;
  }
}

// --- Usage: Performance Analytics Table & Filter Options ---

export function getPeriodOptionLabel(
  period: string,
  timeFrame: TimeFrame,
  translations: PeriodTranslations,
): string {
  switch (timeFrame) {
    case TimeFrame.WEEKLY:
      return getWeeklyPeriodLabel(period, translations.week, false) ?? period;

    case TimeFrame.DAILY:
      return safeFormatDate(period, "dd MMM yyyy");

    case TimeFrame.MONTHLY:
      return safeFormatDate(period, "MMMM yyyy");

    case TimeFrame.YTD:
      return `YTD ${period}`;

    case TimeFrame.YEARLY:
    default:
      return period;
  }
}

const getWeeklyPeriodColumn = (
  period: string,
  translations: PeriodTranslations,
): PerformancePeriodColumn => {
  const parsed = parseWeeklyPeriod(period);

  if (!parsed) {
    return {
      key: period,
      label: period,
    };
  }

  const monthName = safeFormatDate(getWeeklyPeriodDate(parsed), "MMM");

  return {
    key: period,
    label: `${translations.week} ${parsed.week} ${monthName}`,
    subLabel: parsed.range,
  };
};

const getPerformancePeriodColumn = (
  period: string,
  timeFrame: TimeFrame,
  translations: PeriodTranslations,
): PerformancePeriodColumn => {
  switch (timeFrame) {
    // WEEKLY:
    // Period memiliki format:
    // "yyyy-MM-Wweek|range"
    case TimeFrame.WEEKLY:
      return getWeeklyPeriodColumn(period, translations);

    // DAILY:
    // Label utama berisi hari dan bulan,
    // sedangkan tahun dipisahkan menjadi sub-label.
    //
    // Contoh:
    // label: "24 Sep"
    // subLabel: "2026"
    case TimeFrame.DAILY:
      return {
        key: period,
        label: safeFormatDate(period, "dd MMM"),
        subLabel: safeFormatDate(period, "yyyy"),
      };

    // MONTHLY:
    // Contoh: "2026-09-01" -> "September 2026"
    case TimeFrame.MONTHLY:
      return {
        key: period,
        label: safeFormatDate(period, "MMMM yyyy"),
      };

    // YTD:
    // Contoh: "2026" -> "YTD 2026"
    case TimeFrame.YTD:
      return {
        key: period,
        label: `YTD ${period}`,
      };

    // YEARLY atau fallback:
    // Gunakan period sebagai label.
    case TimeFrame.YEARLY:
    default:
      return {
        key: period,
        label: period,
      };
  }
};

export function getPerformancePeriodColumns(
  periods: string[],
  timeFrame: TimeFrame,
  sortOrder: SortOrder,
  translations: PeriodTranslations,
): PerformancePeriodColumn[] {
  const sortedPeriods = sortOrder === "desc" ? [...periods].reverse() : periods;

  return sortedPeriods
    .filter(Boolean)
    .map((period) =>
      getPerformancePeriodColumn(period, timeFrame, translations),
    );
}

export function getPeriodRangeOptions(
  availablePeriods: string[],
  timeFrame: TimeFrame,
  startPeriod: string,
  endPeriod: string,
  translations: PeriodTranslations,
) {
  // Jika startPeriod belum dipilih, gunakan period pertama
  // yang tersedia sebagai default start.
  const effectiveStartPeriod = startPeriod || availablePeriods[0] || "";

  // Jika endPeriod belum dipilih, gunakan period terakhir
  // yang tersedia sebagai default end.
  const effectiveEndPeriod =
    endPeriod || availablePeriods[availablePeriods.length - 1] || "";

  const startTimestamp = effectiveEndPeriod
    ? getPeriodTimestamp(effectiveEndPeriod, timeFrame)
    : undefined;

  const endTimestamp = effectiveStartPeriod
    ? getPeriodTimestamp(effectiveStartPeriod, timeFrame)
    : undefined;

  // Membentuk daftar pilihan untuk START period.
  //
  // Sebuah period hanya boleh dipilih sebagai start jika
  // timestamp-nya <= end period.
  //
  // Contoh:
  // End = September 2026
  // Start tidak boleh memilih Oktober 2026.

  const startOptions: PerformancePeriodOption[] = availablePeriods
    .filter(
      (period) =>
        startTimestamp === undefined ||
        getPeriodTimestamp(period, timeFrame) <= startTimestamp,
    )
    .map((period) => ({
      value: period,
      label: getPeriodOptionLabel(period, timeFrame, translations),
    }));

  // Membentuk daftar pilihan untuk END period.
  //
  // Sebuah period hanya boleh dipilih sebagai end jika
  // timestamp-nya >= start period.
  //
  // Contoh:
  // Start = September 2026
  // End tidak boleh memilih Agustus 2026.

  const endOptions: PerformancePeriodOption[] = availablePeriods
    .filter(
      (period) =>
        endTimestamp === undefined ||
        getPeriodTimestamp(period, timeFrame) >= endTimestamp,
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
