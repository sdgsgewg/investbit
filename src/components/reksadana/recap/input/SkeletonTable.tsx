import React from "react";

const SkeletonTable = () => {
  return (
    <div className="animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="mb-6">
          {/* category */}
          <div className="h-5 w-1/3 bg-zinc-200 dark:bg-zinc-700 rounded mb-3" />

          {/* rows */}
          {[...Array(3)].map((_, j) => (
            <div key={j} className="grid grid-cols-3 gap-4 mb-2">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded" />
              <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded" />
              <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SkeletonTable;
