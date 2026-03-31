"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, startOfWeek } from "date-fns";

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
    }
  }
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

  const [categoryStats, setCategoryStats] = useState<Record<string, Record<string, { min: number, max: number }>>>({});

  useEffect(() => {
    fetchWeeklyData();
  }, []);

  const fetchWeeklyData = async () => {
    try {
      // For this demo, we fetch all records. In production, we'd add date filters.
      const response = await axios.get<RecordData[]>("/api/reksadana/records");
      const records = response.data;
      
      const weeksSet = new Set<string>();
      const groupedData: Record<string, {
        categoryName: string;
        items: Record<string, {
          itemId: string;
          itemName: string;
          weeklyYields: Record<string, number>;
        }>
      }> = {};

      records.forEach(req => {
        const item = req.rd_items;
        if (!item || !item.rd_categories) return;

        const catName = item.rd_categories.name;
        const weekStart = format(startOfWeek(new Date(req.date), { weekStartsOn: 1 }), 'yyyy-MM-dd');
        weeksSet.add(weekStart);

        if (!groupedData[catName]) {
          groupedData[catName] = { categoryName: catName, items: {} };
        }
        
        if (!groupedData[catName].items[item.id]) {
          groupedData[catName].items[item.id] = {
            itemId: item.id,
            itemName: item.name,
            weeklyYields: {}
          };
        }

        const currentYield = req.yield_1d || 0;
        const existingYield = groupedData[catName].items[item.id].weeklyYields[weekStart] || 0;
        groupedData[catName].items[item.id].weeklyYields[weekStart] = existingYield + currentYield;
      });

      const sortedWeeks = Array.from(weeksSet).sort();
      setWeeks(sortedWeeks);

      const stats: Record<string, Record<string, { min: number, max: number }>> = {};

      const aggregatedArr = Object.values(groupedData).map(cat => {
        const catItems = Object.values(cat.items).sort((a, b) => a.itemName.localeCompare(b.itemName));
        
        stats[cat.categoryName] = {};
        sortedWeeks.forEach(w => {
          const yields = catItems.map(item => item.weeklyYields[w]).filter(v => v !== undefined);
          if (yields.length > 0) {
            stats[cat.categoryName][w] = { min: Math.min(...yields), max: Math.max(...yields) };
          }
        });

        return {
          categoryName: cat.categoryName,
          items: catItems
        };
      }).sort((a, b) => a.categoryName.localeCompare(b.categoryName));

      setCategoryStats(stats);
      setData(aggregatedArr);
    } catch (error) {
      console.error("Failed to load records", error);
    } finally {
      setLoading(false);
    }
  };

  const getCellColor = (val: number | undefined, catName: string, timeKey: string) => {
    if (val === undefined || isNaN(val)) return "";
    
    const stat = categoryStats[catName]?.[timeKey];
    if (!stat || stat.min === stat.max) return ""; // No comparison possible, transparent

    // Normalize value between 0 and 1
    const normalized = (val - stat.min) / (stat.max - stat.min);
    
    // 3-color divergent scale: Red -> Transparent -> Green
    if (normalized < 0.5) {
      // 0 to 0.5 maps to Red dissipating into Transparent
      const intensity = 1 - (normalized / 0.5); // 1 to 0
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
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-left bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <thead className="bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
            <tr>
              <th className="py-3 px-4 font-semibold w-64">Reksa Dana</th>
              {weeks.map(w => (
                <th key={w} className="py-3 px-4 font-semibold text-center whitespace-nowrap">
                  Week of<br/>
                  <span className="text-sm font-normal text-zinc-600 dark:text-zinc-400">
                    {format(new Date(w), 'MMM dd')}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((category) => (
              <React.Fragment key={category.categoryName}>
                {/* Category Header */}
                <tr className="bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800">
                  <td colSpan={weeks.length + 1} className="py-2 px-4 font-bold">
                    {category.categoryName}
                  </td>
                </tr>
                
                {/* Items */}
                {category.items.map((item) => (
                  <tr key={item.itemId} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="py-3 px-4 font-medium">{item.itemName}</td>
                    {weeks.map(w => {
                      const yieldVal = item.weeklyYields[w];
                      const bgColor = getCellColor(yieldVal, category.categoryName, w);
                      
                      return (
                        <td 
                          key={w} 
                          className="py-2 px-4 text-center font-medium border-x border-zinc-100 dark:border-zinc-800/50"
                          style={{ backgroundColor: bgColor }}
                        >
                          {yieldVal !== undefined ? yieldVal.toFixed(2) : '-'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </React.Fragment>
            ))}
            {data.length === 0 && (
              <tr>
                 <td colSpan={weeks.length + 1} className="p-4 text-center text-zinc-500">No data available. Use the daily input tab to add records.</td>
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
