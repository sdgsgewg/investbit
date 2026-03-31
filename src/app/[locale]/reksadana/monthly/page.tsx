"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, startOfMonth } from "date-fns";

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
    monthlyYields: { [monthStart: string]: number };
  }[];
};

export default function MonthlyPage() {
  const [data, setData] = useState<AggregatedData[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [categoryStats, setCategoryStats] = useState<Record<string, Record<string, { min: number, max: number }>>>({});

  useEffect(() => {
    fetchMonthlyData();
  }, []);

  const fetchMonthlyData = async () => {
    try {
      const response = await axios.get<RecordData[]>("/api/reksadana/records");
      const records = response.data;
      
      const monthsSet = new Set<string>();
      const groupedData: Record<string, {
        categoryName: string;
        items: Record<string, {
          itemId: string;
          itemName: string;
          monthlyYields: Record<string, number>;
        }>
      }> = {};

      records.forEach(req => {
        const item = req.rd_items;
        if (!item || !item.rd_categories) return;

        const catName = item.rd_categories.name;
        // Group by month
        const rootMonth = startOfMonth(new Date(req.date));
        const monthStr = format(rootMonth, 'yyyy-MM-dd');
        monthsSet.add(monthStr);

        if (!groupedData[catName]) {
          groupedData[catName] = { categoryName: catName, items: {} };
        }
        
        if (!groupedData[catName].items[item.id]) {
          groupedData[catName].items[item.id] = {
            itemId: item.id,
            itemName: item.name,
            monthlyYields: {}
          };
        }

        const currentYield = req.yield_1d || 0;
        const existingYield = groupedData[catName].items[item.id].monthlyYields[monthStr] || 0;
        groupedData[catName].items[item.id].monthlyYields[monthStr] = existingYield + currentYield;
      });

      const sortedMonths = Array.from(monthsSet).sort();
      setMonths(sortedMonths);

      const stats: Record<string, Record<string, { min: number, max: number }>> = {};

      const aggregatedArr = Object.values(groupedData).map(cat => {
        const catItems = Object.values(cat.items).sort((a, b) => a.itemName.localeCompare(b.itemName));
        
        stats[cat.categoryName] = {};
        sortedMonths.forEach(m => {
          const yields = catItems.map(item => item.monthlyYields[m]).filter(v => v !== undefined);
          if (yields.length > 0) {
            stats[cat.categoryName][m] = { min: Math.min(...yields), max: Math.max(...yields) };
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
    if (!stat || stat.min === stat.max) return ""; // No comparison possible

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
    return <div className="p-4">Loading monthly performance data...</div>;
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Monthly Performance</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-left bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <thead className="bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
            <tr>
              <th className="py-3 px-4 font-semibold w-64">Reksa Dana</th>
              {months.map(m => (
                <th key={m} className="py-3 px-4 font-semibold text-center whitespace-nowrap">
                  {format(new Date(m), 'MMMM yyyy')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((category) => (
              <React.Fragment key={category.categoryName}>
                {/* Category Header */}
                <tr className="bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800">
                  <td colSpan={months.length + 1} className="py-2 px-4 font-bold">
                    {category.categoryName}
                  </td>
                </tr>
                
                {/* Items */}
                {category.items.map((item) => (
                  <tr key={item.itemId} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="py-3 px-4 font-medium">{item.itemName}</td>
                    {months.map(m => {
                      const yieldVal = item.monthlyYields[m];
                      const bgColor = getCellColor(yieldVal, category.categoryName, m);
                      
                      return (
                        <td 
                          key={m} 
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
                 <td colSpan={months.length + 1} className="p-4 text-center text-zinc-500">No data available. Use the daily input tab to add records.</td>
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
