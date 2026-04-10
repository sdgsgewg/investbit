import { useState, useEffect } from "react";
import axios from "axios";
import { format, startOfMonth, getWeekOfMonth } from "date-fns";
import { RecordData } from "@/app/types/reksadana/records/RecordData";
import { FilterPerformance } from "@/app/types/reksadana/recap/performance/FilterPerformance";
import { CategoryStats } from "@/app/types/reksadana/recap/CategoryStats";
import { DataType } from "../types/reksadana/recap/performance/DataType";
import { PerformanceType } from "../types/reksadana/recap/performance/PerformanceType";

interface UsePerformanceDataProps {
  type: PerformanceType;
  initialForm?: FilterPerformance;
}

interface UsePerformanceDataReturn {
  data: DataType;
  timePeriods: string[];
  loading: boolean;
  form: FilterPerformance;
  setForm: React.Dispatch<React.SetStateAction<FilterPerformance>>;
  categoryStats: CategoryStats;
  getCellColor: (
    val: number | undefined,
    catName: string,
    timeKey: string,
  ) => string;
  handleApplyFilter: () => void;
  fetchPerformanceData: () => Promise<void>;
}

export const usePerformanceData = ({
  type,
  initialForm = { category_id: "" },
}: UsePerformanceDataProps): UsePerformanceDataReturn => {
  const [data, setData] = useState<DataType>([]);
  const [timePeriods, setTimePeriods] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FilterPerformance>(initialForm);
  const [categoryStats, setCategoryStats] = useState<CategoryStats>({});

  // Helper function to get week of month based on calendar (Monday start)
  const getCustomWeekOfMonth = (date: Date) => {
    // using date-fns getWeekOfMonth to get calendar week
    // we must import it at the top, since date-fns format and startOfMonth are already imported
    // wait, I can just use getWeekOfMonth directly instead of writing logic if I import it
    return getWeekOfMonth(date, { weekStartsOn: 1 });
  };

  // Fetch daily performance data
  const fetchDailyData = async () => {
    try {
      const response = await axios.get<RecordData[]>("/api/reksadana/records", {
        params: {
          categoryId: form.category_id || undefined,
        },
      });

      const records = response.data;

      const datesSet = new Set<string>();

      const groupedData: Record<
        string,
        {
          categoryName: string;
          items: Record<
            string,
            {
              itemId: string;
              itemName: string;
              dailyYields: Record<string, number>;
            }
          >;
        }
      > = {};

      records.forEach((req) => {
        const item = req.rd_items;
        if (!item || !item.rd_categories) return;

        const catName = item.rd_categories.name;

        const dateKey = req.date;

        if (!dateKey) return;

        datesSet.add(dateKey);

        if (!groupedData[catName]) {
          groupedData[catName] = { categoryName: catName, items: {} };
        }

        if (!groupedData[catName].items[item.id]) {
          groupedData[catName].items[item.id] = {
            itemId: item.id,
            itemName: item.name,
            dailyYields: {},
          };
        }

        // optional: kalau ada duplicate tanggal -> tetap aman (overwrite)
        groupedData[catName].items[item.id].dailyYields[dateKey] =
          req.yield_1d || 0;
      });

      // sort by date (safe karena format yyyy-MM-dd)
      const sortedDates = Array.from(datesSet).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime(),
      );

      setTimePeriods(sortedDates);

      const aggregatedArr = Object.values(groupedData)
        .map((cat) => ({
          categoryName: cat.categoryName,
          items: Object.values(cat.items).sort((a, b) =>
            a.itemName.localeCompare(b.itemName),
          ),
        }))
        .sort((a, b) => a.categoryName.localeCompare(b.categoryName));

      const stats: CategoryStats = {};

      Object.values(groupedData).forEach((cat) => {
        stats[cat.categoryName] = {};

        sortedDates.forEach((date) => {
          const yields = Object.values(cat.items)
            .map((item) => item.dailyYields[date])
            .filter((v) => v !== undefined);

          if (yields.length > 0) {
            stats[cat.categoryName][date] = {
              min: Math.min(...yields),
              max: Math.max(...yields),
            };
          }
        });
      });

      setCategoryStats(stats);
      setData(aggregatedArr);
    } catch (err) {
      console.error("Failed to load daily records", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch weekly performance data
  const fetchWeeklyData = async () => {
    try {
      const response = await axios.get<RecordData[]>("/api/reksadana/records", {
        params: {
          categoryId: form.category_id || undefined,
        },
      });
      const records = response.data;

      const weeksSet = new Set<string>();

      const groupedData: Record<
        string,
        {
          categoryName: string;
          items: Record<
            string,
            {
              itemId: string;
              itemName: string;
              weeklyYields: Record<string, number>;
              weeklyDays: Record<string, Set<string>>; // track unique days
            }
          >;
        }
      > = {};

      records.forEach((req) => {
        const item = req.rd_items;
        if (!item || !item.rd_categories) return;

        const catName = item.rd_categories.name;

        const dateObj = new Date(req.date);
        const weekNumber = getCustomWeekOfMonth(dateObj);
        const monthKey = format(dateObj, "yyyy-MM");

        // week key berbasis bulan
        const weekKey = `${monthKey}-W${weekNumber}`;
        weeksSet.add(weekKey);

        if (!groupedData[catName]) {
          groupedData[catName] = { categoryName: catName, items: {} };
        }

        if (!groupedData[catName].items[item.id]) {
          groupedData[catName].items[item.id] = {
            itemId: item.id,
            itemName: item.name,
            weeklyYields: {},
            weeklyDays: {},
          };
        }

        const currentYield = req.yield_1d || 0;

        // accumulate yield
        const existingYield =
          groupedData[catName].items[item.id].weeklyYields[weekKey] || 0;

        groupedData[catName].items[item.id].weeklyYields[weekKey] =
          existingYield + currentYield;

        // track unique days
        if (!groupedData[catName].items[item.id].weeklyDays[weekKey]) {
          groupedData[catName].items[item.id].weeklyDays[weekKey] = new Set();
        }

        groupedData[catName].items[item.id].weeklyDays[weekKey].add(req.date);
      });

      const sortedWeeks = Array.from(weeksSet).sort((a, b) => {
        const [aYM, aW] = a.split("-W");
        const [bYM, bW] = b.split("-W");

        if (aYM !== bYM) return aYM.localeCompare(bYM);
        return Number(aW) - Number(bW);
      });
      setTimePeriods(sortedWeeks);

      const stats: CategoryStats = {};

      const aggregatedArr = Object.values(groupedData)
        .map((cat) => {
          const catItems = Object.values(cat.items)
            .map((item) => {
              // convert Set size → jumlah hari
              const weeklyDaysCount: Record<string, number> = {};

              Object.keys(item.weeklyDays).forEach((w) => {
                weeklyDaysCount[w] = item.weeklyDays[w].size;
              });

              return {
                ...item,
                weeklyDaysCount,
              };
            })
            .sort((a, b) => a.itemName.localeCompare(b.itemName));

          // stats per category per week
          stats[cat.categoryName] = {};
          sortedWeeks.forEach((w) => {
            const yields = catItems
              .map((item) => item.weeklyYields[w])
              .filter((v) => v !== undefined);

            if (yields.length > 0) {
              stats[cat.categoryName][w] = {
                min: Math.min(...yields),
                max: Math.max(...yields),
              };
            }
          });

          return {
            categoryName: cat.categoryName,
            items: catItems,
          };
        })
        .sort((a, b) => a.categoryName.localeCompare(b.categoryName));

      setCategoryStats(stats);
      setData(aggregatedArr);
    } catch (error) {
      console.error("Failed to load weekly records", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch monthly performance data
  const fetchMonthlyData = async () => {
    try {
      const response = await axios.get<RecordData[]>("/api/reksadana/records", {
        params: {
          categoryId: form.category_id || undefined,
        },
      });
      const records = response.data;

      const monthsSet = new Set<string>();
      const groupedData: Record<
        string,
        {
          categoryName: string;
          items: Record<
            string,
            {
              itemId: string;
              itemName: string;
              monthlyYields: Record<string, number>;
            }
          >;
        }
      > = {};

      records.forEach((req) => {
        const item = req.rd_items;
        if (!item || !item.rd_categories) return;

        const catName = item.rd_categories.name;
        // Group by month
        const rootMonth = startOfMonth(new Date(req.date));
        const monthStr = format(rootMonth, "yyyy-MM-dd");
        monthsSet.add(monthStr);

        if (!groupedData[catName]) {
          groupedData[catName] = { categoryName: catName, items: {} };
        }

        if (!groupedData[catName].items[item.id]) {
          groupedData[catName].items[item.id] = {
            itemId: item.id,
            itemName: item.name,
            monthlyYields: {},
          };
        }

        const currentYield = req.yield_1d || 0;
        const existingYield =
          groupedData[catName].items[item.id].monthlyYields[monthStr] || 0;
        groupedData[catName].items[item.id].monthlyYields[monthStr] =
          existingYield + currentYield;
      });

      const sortedMonths = Array.from(monthsSet).sort();
      setTimePeriods(sortedMonths);

      const stats: CategoryStats = {};

      const aggregatedArr = Object.values(groupedData)
        .map((cat) => {
          const catItems = Object.values(cat.items).sort((a, b) =>
            a.itemName.localeCompare(b.itemName),
          );

          stats[cat.categoryName] = {};
          sortedMonths.forEach((m) => {
            const yields = catItems
              .map((item) => item.monthlyYields[m])
              .filter((v) => v !== undefined);
            if (yields.length > 0) {
              stats[cat.categoryName][m] = {
                min: Math.min(...yields),
                max: Math.max(...yields),
              };
            }
          });

          return {
            categoryName: cat.categoryName,
            items: catItems,
          };
        })
        .sort((a, b) => a.categoryName.localeCompare(b.categoryName));

      setCategoryStats(stats);
      setData(aggregatedArr);
    } catch (error) {
      console.error("Failed to load monthly records", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch ytd performance data
  const fetchYtdData = async () => {
    try {
      const response = await axios.get<RecordData[]>("/api/reksadana/records", {
        params: {
          categoryId: form.category_id || undefined,
        },
      });

      const records = response.data;

      const groupedData: Record<
        string,
        {
          categoryName: string;
          items: Record<
            string,
            {
              itemId: string;
              itemName: string;
              ytdYields: Record<string, number>;
            }
          >;
        }
      > = {};

      records.forEach((req) => {
        const item = req.rd_items;
        if (!item || !item.rd_categories) return;

        const catName = item.rd_categories.name;
        const year = req.date.substring(0, 4); // YYYY

        if (!groupedData[catName]) {
          groupedData[catName] = { categoryName: catName, items: {} };
        }

        if (!groupedData[catName].items[item.id]) {
          groupedData[catName].items[item.id] = {
            itemId: item.id,
            itemName: item.name,
            ytdYields: {},
          };
        }

        const currentYield = req.yield_1d || 0;
        const existing =
          groupedData[catName].items[item.id].ytdYields[year] || 0;

        groupedData[catName].items[item.id].ytdYields[year] =
          existing + currentYield;
      });

      const years = Object.keys(
        records.reduce(
          (acc, r) => {
            acc[r.date.substring(0, 4)] = true;
            return acc;
          },
          {} as Record<string, boolean>,
        ),
      ).sort();

      setTimePeriods(years);

      const aggregatedArr = Object.values(groupedData).map((cat) => ({
        categoryName: cat.categoryName,
        items: Object.values(cat.items),
      }));

      const stats: CategoryStats = {};

      years.forEach((year) => {
        Object.values(groupedData).forEach((cat) => {
          if (!stats[cat.categoryName]) {
            stats[cat.categoryName] = {};
          }

          const yields = Object.values(cat.items)
            .map((item) => item.ytdYields[year])
            .filter((v) => v !== undefined);

          if (yields.length > 0) {
            stats[cat.categoryName][year] = {
              min: Math.min(...yields),
              max: Math.max(...yields),
            };
          }
        });
      });

      setCategoryStats(stats);
      setData(aggregatedArr);
    } catch (err) {
      console.error("Failed to load YTD records", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch yearly performance data
  const fetchYearlyData = async () => {
    try {
      const response = await axios.get<RecordData[]>("/api/reksadana/records", {
        params: {
          categoryId: form.category_id || undefined,
        },
      });
      const records = response.data;

      const yearsSet = new Set<string>();
      const groupedData: Record<
        string,
        {
          categoryName: string;
          items: Record<
            string,
            {
              itemId: string;
              itemName: string;
              yearlyYields: Record<string, number>;
            }
          >;
        }
      > = {};

      records.forEach((req) => {
        const item = req.rd_items;
        if (!item || !item.rd_categories) return;

        const catName = item.rd_categories.name;
        // Group by year
        const yearStr = req.date.substring(0, 4); // YYYY
        yearsSet.add(yearStr);

        if (!groupedData[catName]) {
          groupedData[catName] = { categoryName: catName, items: {} };
        }

        if (!groupedData[catName].items[item.id]) {
          groupedData[catName].items[item.id] = {
            itemId: item.id,
            itemName: item.name,
            yearlyYields: {},
          };
        }

        const currentYield = req.yield_1d || 0;
        const existingYield =
          groupedData[catName].items[item.id].yearlyYields[yearStr] || 0;
        groupedData[catName].items[item.id].yearlyYields[yearStr] =
          existingYield + currentYield;
      });

      const sortedYears = Array.from(yearsSet).sort();
      setTimePeriods(sortedYears);

      const stats: CategoryStats = {};

      const aggregatedArr = Object.values(groupedData)
        .map((cat) => {
          const catItems = Object.values(cat.items).sort((a, b) =>
            a.itemName.localeCompare(b.itemName),
          );

          stats[cat.categoryName] = {};
          sortedYears.forEach((y) => {
            const yields = catItems
              .map((item) => item.yearlyYields[y])
              .filter((v) => v !== undefined);
            if (yields.length > 0) {
              stats[cat.categoryName][y] = {
                min: Math.min(...yields),
                max: Math.max(...yields),
              };
            }
          });

          return {
            categoryName: cat.categoryName,
            items: catItems,
          };
        })
        .sort((a, b) => a.categoryName.localeCompare(b.categoryName));

      setCategoryStats(stats);
      setData(aggregatedArr);
    } catch (error) {
      console.error("Failed to load yearly records", error);
    } finally {
      setLoading(false);
    }
  };

  // Main fetch function that calls the appropriate fetch based on type
  const fetchPerformanceData = async () => {
    setLoading(true);

    if (type === "daily") {
      await fetchDailyData();
    } else if (type === "weekly") {
      await fetchWeeklyData();
    } else if (type === "monthly") {
      await fetchMonthlyData();
    } else if (type === "ytd") {
      await fetchYtdData();
    } else {
      await fetchYearlyData();
    }
  };

  // Function to get cell color based on performance value
  const getCellColor = (
    val: number | undefined,
    catName: string,
    timeKey: string,
  ) => {
    if (val === undefined || isNaN(val)) return "";

    const stat = categoryStats[catName]?.[timeKey];
    if (!stat || stat.min === stat.max) return ""; // No comparison possible

    const normalized = (val - stat.min) / (stat.max - stat.min);

    // 3-color divergent scale: Red -> Transparent -> Green
    if (normalized < 0.5) {
      // 0 to 0.5 maps to Red dissipating into Transparent
      const intensity = 1 - normalized / 0.5; // 1 to 0
      return `rgba(239, 68, 68, ${Math.max(intensity * 0.8, 0.05)})`;
    } else {
      // 0.5 to 1 maps to Transparent building into Green
      const intensity = (normalized - 0.5) / 0.5; // 0 to 1
      return `rgba(34, 197, 94, ${Math.max(intensity * 0.8, 0.05)})`;
    }
  };

  // Handle apply filter
  const handleApplyFilter = () => {
    fetchPerformanceData();
  };

  // Initial data fetch
  useEffect(() => {
    fetchPerformanceData();
  }, [type, form.category_id]);

  return {
    data,
    timePeriods,
    loading,
    form,
    setForm,
    categoryStats,
    getCellColor,
    handleApplyFilter,
    fetchPerformanceData,
  };
};
