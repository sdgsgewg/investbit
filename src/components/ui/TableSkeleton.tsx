"use client";

import React from "react";

interface TableSkeletonProps {
  columnCount?: number;
  rowCount?: number;
  showActions?: boolean;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  columnCount = 3,
  rowCount = 5,
  showActions = true,
}) => {
  return (
    <div className="animate-pulse">
      <div className="bg-card border border-border/50 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            {/* Header */}
            <thead className="bg-muted/30 border-b border-border/50">
              <tr>
                {[...Array(columnCount)].map((_, i) => (
                  <th key={i} className="px-6 py-4">
                    <div className="h-3 w-24 bg-muted rounded" />
                  </th>
                ))}

                {showActions && (
                  <th className="px-6 py-4">
                    <div className="h-3 w-12 bg-muted rounded ml-auto" />
                  </th>
                )}
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-border/50">
              {[...Array(rowCount)].map((_, rowIdx) => (
                <tr key={rowIdx}>
                  {[...Array(columnCount)].map((_, colIdx) => (
                    <td key={colIdx} className="px-6 py-4">
                      <div className="h-4 w-full bg-muted rounded" />
                    </td>
                  ))}

                  {showActions && (
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <div className="h-8 w-8 bg-muted rounded-lg" />
                        <div className="h-8 w-8 bg-muted rounded-lg" />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
