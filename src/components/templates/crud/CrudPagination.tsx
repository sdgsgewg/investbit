import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { CrudPaginationProps } from "@/types/crud";

import { getPaginationItems } from "@/lib/utils/pagination";
import { useTranslations } from "next-intl";

export default function CrudPagination({
  page,
  limit,
  totalPages,
  totalItems,
  loading,
  onPageChange,
}: CrudPaginationProps) {
  const tPagination = useTranslations("common.pagination");

  const items = getPaginationItems(page, totalPages);

  const startItem = totalItems === 0 ? 0 : (page - 1) * limit + 1;

  const endItem = Math.min(page * limit, totalItems);

  return (
    <div className="mt-6 flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        {tPagination("showing", {
          from: startItem,
          to: endItem,
          total: totalItems,
        })}
      </p>

      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              aria-label={tPagination("previous")}
              onClick={(e) => {
                e.preventDefault();

                if (page > 1) {
                  onPageChange(page - 1);
                }
              }}
            />
          </PaginationItem>

          {items.map((item, index) => (
            <PaginationItem key={`${item}-${index}`}>
              {item === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={item === page}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(item);
                  }}
                >
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              aria-label={tPagination("next")}
              onClick={(e) => {
                e.preventDefault();

                if (page < totalPages) {
                  onPageChange(page + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
