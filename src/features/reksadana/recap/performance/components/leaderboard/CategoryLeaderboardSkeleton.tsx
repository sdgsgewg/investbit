"use client";

const CategoryLeaderboardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="mb-5">
        <div className="h-6 w-56 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mt-2 h-4 w-72 rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {[...Array(4)].map((_, cardIndex) => (
          <div
            key={cardIndex}
            className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="h-5 w-32 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-5 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            </div>

            <div className="space-y-3">
              {[...Array(5)].map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                    <div className="h-4 w-40 rounded bg-zinc-200 dark:bg-zinc-700" />
                  </div>
                  <div className="h-6 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryLeaderboardSkeleton;
