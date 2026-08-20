"use client";

import { ReactNode } from "react";
import { ArrowDown, ArrowUp, Database } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import TableSkeleton from "./skeletons/TableSkeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataRow, DataTableProps } from "@/types/table";
import { ActionRow } from "./ActionRow";

export const DataTable = <T extends DataRow>({
  loading = false,
  data,
  columns,
  showActions,
  onView,
  onEdit,
  onDelete,
  emptyMessage,
  sortBy,
  sortOrder,
  onSort,
}: DataTableProps<T>) => {
  const tTable = useTranslations("common.table");

  const shouldShowActions = showActions && (onView || onEdit || onDelete);

  const getValue = (obj: T, path: string): ReactNode | null => {
    const value = path.split(".").reduce<unknown>((acc, key) => {
      if (!acc || typeof acc !== "object") {
        return undefined;
      }

      return (acc as Record<string, unknown>)[key];
    }, obj);

    if (value === null || value === undefined || value === "") {
      return null;
    }

    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return String(value);
    }

    return null;
  };

  if (loading) {
    return (
      <TableSkeleton
        columnCount={columns.length + (shouldShowActions ? 1 : 0)}
        rowCount={5}
      />
    );
  }

  return (
    <div className="lg:col-span-8">
      <div className="bg-card border border-border/50 shadow-sm rounded-sm overflow-hidden">
        <div className="max-h-[50vh] lg:max-h-[60vh] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => {
                  const active =
                    (column.sortKey ?? String(column.key)) === sortBy;

                  return (
                    <TableHead
                      key={String(column.key)}
                      className={cn(
                        "sticky top-0 z-20 bg-muted px-6 py-4  tracking-wider",
                        column.headerClassName,
                      )}
                    >
                      <button
                        className="flex items-center font-semibold uppercase gap-1"
                        onClick={() =>
                          onSort?.(column.sortKey ?? String(column.key))
                        }
                      >
                        <span>{column.label}</span>
                        {active &&
                          (sortOrder === "asc" ? (
                            <ArrowDown size={16} />
                          ) : (
                            <ArrowUp size={16} />
                          ))}
                      </button>
                    </TableHead>
                  );
                })}

                {shouldShowActions && (
                  <TableHead className="sticky top-0 z-20 bg-muted w-24 px-6 py-4 font-semibold uppercase tracking-wider">
                    {tTable("actions")}
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-border/50">
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (shouldShowActions ? 1 : 0)}
                    className="h-40 px-6 py-12 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Database className="mb-3 h-10 w-10 opacity-30" />

                      <p>{emptyMessage ?? tTable("noData")}</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    {columns.map((column, index) => {
                      const value = column.render?.(item) ??
                        getValue(item, String(column.key)) ?? (
                          <span className="italic text-muted-foreground">
                            -
                          </span>
                        );

                      return (
                        <TableCell
                          key={String(column.key)}
                          className={cn(
                            `px-6 py-4 ${column.className}`,
                            index === 0 && "font-medium text-foreground",
                          )}
                        >
                          {value}
                        </TableCell>
                      );
                    })}

                    {shouldShowActions && (
                      <TableCell className="px-6 py-4 text-right">
                        <div className="hidden items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100 md:flex">
                          <ActionRow
                            item={item}
                            onView={onView}
                            onEdit={onEdit}
                            onDelete={onDelete}
                          />
                        </div>

                        <div className="flex items-center justify-end gap-2 md:hidden">
                          <ActionRow
                            item={item}
                            onView={onView}
                            onEdit={onEdit}
                            onDelete={onDelete}
                          />
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
