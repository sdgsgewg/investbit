"use client";

const PerformanceTableSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Title */}
      <div className="h-5 w-56 bg-zinc-200 dark:bg-zinc-700 rounded mb-4" />

      {/* Table */}
      <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-lg">
        {/* Header */}
        <div className="grid grid-cols-6 gap-4 p-4 bg-zinc-100 dark:bg-zinc-800">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded" />
          ))}
        </div>

        {/* Rows */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="border-t border-zinc-200 dark:border-zinc-800"
          >
            {/* Category row */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-900">
              <div className="h-4 w-40 bg-zinc-300 dark:bg-zinc-700 rounded" />
            </div>

            {/* Items */}
            {[...Array(3)].map((_, j) => (
              <div key={j} className="grid grid-cols-6 gap-4 p-3 items-center">
                {/* Name */}
                <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded" />

                {/* Values */}
                {[...Array(5)].map((_, k) => (
                  <div
                    key={k}
                    className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded"
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceTableSkeleton;
