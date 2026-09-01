import CrudPaginationWrapper from "./CrudPaginationWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginationSkeleton } from "@/components/shared/pagination";

const CrudPaginationSkeleton = () => {
  return (
    <CrudPaginationWrapper>
      {/* Left */}
      <div className="flex items-center justify-between gap-4 md:justify-start">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-25" />
      </div>

      {/* Right */}
      <PaginationSkeleton />
    </CrudPaginationWrapper>
  );
};

export default CrudPaginationSkeleton;
