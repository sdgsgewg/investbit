"use client";

import { useTranslations } from "next-intl";

import { SelectField } from "@/components/forms/fields";
import Pagination from "@/components/shared/pagination/Pagination";

import { CRUD_PAGE_LIMIT_OPTIONS } from "@/constants/crud";
import { CrudPaginationProps } from "@/types/crud";
import CrudPaginationWrapper from "./CrudPaginationWrapper";

export default function CrudPagination({
  page,
  limit,
  totalPages,
  totalItems,
  onPageChange,
  onLimitChange,
}: CrudPaginationProps) {
  const tPagination = useTranslations("common.pagination");

  const startItem = totalItems === 0 ? 0 : (page - 1) * limit + 1;

  const endItem = Math.min(page * limit, totalItems);

  return (
    <CrudPaginationWrapper>
      {/* Left */}
      <div className="flex items-center justify-between gap-4 md:justify-start">
        <p className="whitespace-nowrap text-sm text-muted-foreground">
          {tPagination("showing", {
            from: startItem,
            to: endItem,
            total: totalItems,
          })}
        </p>

        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap text-sm text-muted-foreground">
            {tPagination("rowsPerPage")}
          </span>

          <SelectField
            name="limit"
            value={String(limit)}
            options={CRUD_PAGE_LIMIT_OPTIONS}
            onChange={(value) => onLimitChange(Number(value))}
            className="w-fit"
          />
        </div>
      </div>

      {/* Right */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        className="mx-0 w-auto"
      />
    </CrudPaginationWrapper>
  );
}
