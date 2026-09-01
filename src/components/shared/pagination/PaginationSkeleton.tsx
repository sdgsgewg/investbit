import { Skeleton } from "@/components/ui/skeleton";

export default function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-center gap-1">
      <Skeleton className="h-7 w-7 rounded-md" />

      <Skeleton className="h-7 w-7 rounded-md" />
      <Skeleton className="h-7 w-7 rounded-md" />
      <Skeleton className="h-7 w-7 rounded-md" />

      <Skeleton className="h-7 w-7 rounded-md" />
    </div>
  );
}
