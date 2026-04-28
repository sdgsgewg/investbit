import React from "react";
import { useTranslations } from "next-intl";
import { PerformanceKey } from "@/features/reksadana/recap/performance/types/PerformanceKey";
import TableWrapper from "@/components/ui/TableWrapper";

interface ColumnHeader {
  key: string;
  label: string;
  subLabel?: string;
}

type YieldMap = Record<string, number>;

interface PerformanceItem {
  itemId: string;
  itemName: string;
  dailyYields?: YieldMap;
  weeklyYields?: YieldMap;
  monthlyYields?: YieldMap;
  yearlyYields?: YieldMap;
  ytdYields?: YieldMap;
}

interface PerformanceCategory {
  categoryName: string;
  items: PerformanceItem[];
}

interface PerformanceTableProps {
  data: PerformanceCategory[];
  columns: ColumnHeader[];
  columnKey: PerformanceKey;
  getCellColor: (
    val: number | undefined,
    catName: string,
    timeKey: string,
  ) => string;
  noDataMessage?: string;
}

const PerformanceTable: React.FC<PerformanceTableProps> = ({
  data,
  columns,
  columnKey,
  getCellColor,
  noDataMessage,
}) => {
  const tPerformance = useTranslations("reksadana.recap.performance");
  const tPerformanceAnalytics = useTranslations(
    "reksadana.recap.performance.analytics",
  );

  return (
    <TableWrapper
      headerChildren={
        <>
          <th className="py-3 px-4 font-semibold min-w-40 lg:min-w-72 sticky left-0 z-30 bg-zinc-100 dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700">
            {tPerformanceAnalytics("table.mutualFund")}
          </th>
          {columns.map((col) => (
            <th
              key={col.key}
              className="py-3 px-4 font-semibold text-center whitespace-nowrap min-w-32"
            >
              {col.label}
              {col.subLabel && (
                <>
                  <br />
                  <span className="text-sm font-normal text-zinc-600 dark:text-zinc-400">
                    {col.subLabel}
                  </span>
                </>
              )}
            </th>
          ))}
        </>
      }
      bodyChildren={
        <>
          {data.map((category) => (
            <React.Fragment key={category.categoryName}>
              {/* Category Header */}
              <tr className="bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800">
                {/* Sticky left cell */}
                <td className="py-2 px-4 font-bold sticky left-0 z-10 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-700">
                  {category.categoryName}
                </td>

                {/* Empty cells for the rest of the columns */}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="bg-zinc-50 dark:bg-zinc-950"
                  ></td>
                ))}
              </tr>

              {/* Items */}
              {category.items.map((item) => (
                <tr
                  key={item.itemId}
                  className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 group h-16"
                >
                  <td className="py-3 px-4 font-medium sticky left-0 z-10 bg-white dark:bg-zinc-900 group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700">
                    {item.itemName}
                  </td>
                  {columns.map((col) => {
                    const yieldVal = item[columnKey]?.[col.key];
                    const bgColor = getCellColor(
                      yieldVal,
                      category.categoryName,
                      col.key,
                    );

                    return (
                      <td
                        key={col.key}
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
                colSpan={columns.length + 1}
                className="p-4 text-center text-zinc-500"
              >
                {noDataMessage || tPerformance("noData")}
              </td>
            </tr>
          )}
        </>
      }
    />
  );
};

export default PerformanceTable;
