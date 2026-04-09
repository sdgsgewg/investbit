// app/hooks/usePerformanceData.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { format, startOfMonth, getWeekOfMonth } from "date-fns";
import { RecordData } from "@/app/types/reksadana/records/RecordData";
import { FilterPerformance } from "@/app/types/reksadana/recap/FilterPerformance";
import { CategoryStats } from "@/app/types/reksadana/recap/CategoryStats";
import { WeeklyPerformanceAggregatedData } from "@/app/types/reksadana/recap/WeeklyPerformanceAggregatedData";
import { MonthlyPerformanceAggregatedData } from "@/app/types/reksadana/recap/MonthlyPerformanceAggregatedData";
import { YearlyPerformanceAggregatedData } from "@/app/types/reksadana/recap/YearlyPerformanceAggregatedData";

type PerformanceType = "weekly" | "monthly" | "yearly";

interface UsePerformanceDataProps {
  type: PerformanceType;
  initialForm?: FilterPerformance;
}

interface UsePerformanceDataReturn {
  data: WeeklyPerformanceAggregatedData[] | MonthlyPerformanceAggregatedData[] | YearlyPerformanceAggregatedData[];
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
  const [data, setData] = useState<
    WeeklyPerformanceAggregatedData[] | MonthlyPerformanceAggregatedData[] | YearlyPerformanceAggregatedData[]
  >([]);
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

  // Main fetch function that calls the appropriate fetch based on type
  const fetchPerformanceData = async () => {
    setLoading(true);
    if (type === "weekly") {
      await fetchWeeklyData();
    } else if (type === "monthly") {
      await fetchMonthlyData();
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
  }, [type]);

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
