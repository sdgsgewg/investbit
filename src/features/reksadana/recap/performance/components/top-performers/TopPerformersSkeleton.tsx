"use client";

const TopPerformersSkeleton = () => {
  return (
    <div className="mb-8 animate-pulse">
      {/* Title */}
      <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-700 rounded mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Winner Card */}
        <div className="md:col-span-1 rounded-2xl p-6 border bg-zinc-100 dark:bg-zinc-800">
          <div className="flex flex-col gap-4">
            <div className="h-4 w-24 bg-zinc-300 dark:bg-zinc-700 rounded" />
            <div className="h-3 w-32 bg-zinc-300 dark:bg-zinc-700 rounded" />

            <div className="h-6 w-40 bg-zinc-300 dark:bg-zinc-700 rounded mt-2" />
            <div className="h-4 w-24 bg-zinc-300 dark:bg-zinc-700 rounded" />

            <div className="h-8 w-20 bg-zinc-300 dark:bg-zinc-700 rounded mt-6" />
          </div>
        </div>

        {/* Category Cards */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl p-5 border bg-zinc-100 dark:bg-zinc-800 flex flex-col gap-4"
            >
              <div className="h-3 w-32 bg-zinc-300 dark:bg-zinc-700 rounded" />
              <div className="h-5 w-40 bg-zinc-300 dark:bg-zinc-700 rounded" />

              <div className="flex justify-end">
                <div className="h-6 w-16 bg-zinc-300 dark:bg-zinc-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPerformersSkeleton;
