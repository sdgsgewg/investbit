"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

type RecordData = {
  id: string;
  item_id: string;
  date: string;
  yield_1d: number;
  yield_ytd: number;
  rd_items: {
    id: string;
    name: string;
    category_id: string;
    rd_categories: {
      id: string;
      name: string;
    };
  };
};

type AggregatedData = {
  categoryName: string;
  items: {
    itemId: string;
    itemName: string;
    weeklyYields: { [weekStart: string]: number };
  }[];
};

export default function WeeklyPage() {
  const [data, setData] = useState<AggregatedData[]>([]);
  const [weeks, setWeeks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [categoryStats, setCategoryStats] = useState<
    Record<string, Record<string, { min: number; max: number }>>
  >({});

  useEffect(() => {
    fetchWeeklyData();
  }, []);

  const getCustomWeekOfMonth = (date: Date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    const diffDays = Math.floor(
      (date.getTime() - startOfMonth.getTime()) / (1000 * 60 * 60 * 24),
    );

    return Math.floor(diffDays / 7) + 1;
  };

  const fetchWeeklyData = async () => {
    try {
      const response = await axios.get<RecordData[]>("/api/reksadana/records");
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
        // const weekNumber = getWeekOfMonth(dateObj, { weekStartsOn: 1 });
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

      // const sortedWeeks = Array.from(weeksSet).sort();
      const sortedWeeks = Array.from(weeksSet).sort((a, b) => {
        const [aYM, aW] = a.split("-W");
        const [bYM, bW] = b.split("-W");

        if (aYM !== bYM) return aYM.localeCompare(bYM);
        return Number(aW) - Number(bW);
      });
      setWeeks(sortedWeeks);

      const stats: Record<
        string,
        Record<string, { min: number; max: number }>
      > = {};

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

          // 📊 stats per category per week
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
      console.error("Failed to load records", error);
    } finally {
      setLoading(false);
    }
  };

  const getCellColor = (
    val: number | undefined,
    catName: string,
    timeKey: string,
  ) => {
    if (val === undefined || isNaN(val)) return "";

    const stat = categoryStats[catName]?.[timeKey];
    if (!stat || stat.min === stat.max) return ""; // No comparison possible, transparent

    // Normalize value between 0 and 1
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

  if (loading) {
    return <div className="p-4">Loading weekly performance data...</div>;
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Weekly Performance</h2>

      <div className="overflow-auto max-h-[65vh] border border-zinc-200 dark:border-zinc-800 rounded-md">
        <table className="min-w-full text-left bg-white dark:bg-zinc-900 border-collapse">
          <thead className="sticky top-0 z-20 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 shadow-sm">
            <tr>
              <th className="py-3 px-4 font-semibold w-64 sticky left-0 z-30 bg-zinc-100 dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700">
                Reksa Dana
              </th>
              {weeks.map((w) => {
                const [yearMonth, weekStr] = w.split("-W");
                const [year, month] = yearMonth.split("-");

                const dateObj = new Date(Number(year), Number(month) - 1);

                return (
                  <th
                    key={w}
                    className="py-3 px-4 font-semibold text-center whitespace-nowrap min-w-32"
                  >
                    Week {weekStr}
                    <br />
                    <span className="text-sm font-normal text-zinc-600 dark:text-zinc-400">
                      {format(dateObj, "MMM ''yy")}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((category) => (
              <React.Fragment key={category.categoryName}>
                {/* Category Header */}
                <tr className="bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800">
                  {/* Sticky left cell */}
                  <td className="py-2 px-4 font-bold sticky left-0 z-10 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-700">
                    {category.categoryName}
                  </td>

                  {/* Empty cells untuk sisa kolom */}
                  {weeks.map((w) => (
                    <td key={w} className="bg-zinc-50 dark:bg-zinc-950"></td>
                  ))}
                </tr>

                {/* Items */}
                {category.items.map((item) => (
                  <tr
                    key={item.itemId}
                    className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 group"
                  >
                    <td className="py-3 px-4 font-medium sticky left-0 z-10 bg-white dark:bg-zinc-900 group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700">
                      {item.itemName}
                    </td>
                    {weeks.map((w) => {
                      const yieldVal = item.weeklyYields[w];
                      const bgColor = getCellColor(
                        yieldVal,
                        category.categoryName,
                        w,
                      );

                      return (
                        <td
                          key={w}
                          className="py-2 px-4 text-center font-medium border-x border-zinc-100 dark:border-zinc-800/50"
                          style={{ backgroundColor: bgColor }}
                        >
                          {yieldVal !== undefined ? yieldVal.toFixed(2) : "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </React.Fragment>
            ))}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={weeks.length + 1}
                  className="p-4 text-center text-zinc-500"
                >
                  No data available. Use the daily input tab to add records.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h4 className="font-semibold mb-2">Keterangan:</h4>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-4 bg-green-500/30 rounded border border-green-500"></div>
            <span className="text-sm">Paling Cuan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-4 bg-red-500/30 rounded border border-red-500"></div>
            <span className="text-sm">Paling Tidak Cuan</span>
          </div>
        </div>
      </div>
    </div>
  );
}
