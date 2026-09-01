import CrudPagination from "./CrudPagination";
import { CrudPaginationProps } from "@/types/crud";
import CrudPaginationSkeleton from "./CrudPaginationSkeleton";

interface Props extends CrudPaginationProps {
  isLoading?: boolean;
}

export default function CrudPaginationSection({
  isLoading,
  ...pagination
}: Props) {
  if (isLoading) {
    return <CrudPaginationSkeleton />;
  }

  if (pagination.totalItems === 0) {
    return <></>;
  }

  return <CrudPagination {...pagination} />;
}
