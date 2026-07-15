import { cn } from "@/lib/utils";
import { CrudForm, CrudPageProps, CrudRow } from "@/types/crud";
import { Database } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

import TableSkeleton from "@/components/ui/TableSkeleton";
import { CrudActionRow } from "./CrudActionRow";

export const CrudPageTable = <TData extends CrudRow>({
  loading,
  data,
  columns,
  onView,
  onEdit,
  onDelete,
}: Pick<
  CrudPageProps<TData, CrudForm>,
  "loading" | "data" | "columns" | "onView" | "onEdit" | "onDelete"
>) => {
  const tCommonTable = useTranslations("common.table");

  const getValue = (obj: TData, path: string): ReactNode | null => {
    const value = path.split(".").reduce<unknown>((acc, key) => {
      if (!acc || typeof acc !== "object") return undefined;

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
      <div className="lg:col-span-8">
        <TableSkeleton columnCount={columns.length} rowCount={5} />
      </div>
    );
  }

  return (
    <div className="lg:col-span-8">
      <div className="bg-card border border-border/50 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-auto max-h-[65vh]">
          <table className="w-full text-sm text-left">
            <thead className="sticky top-0 z-20 text-xs text-muted-foreground uppercase bg-muted border-b border-border/50">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-4 font-semibold tracking-wider"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="w-20 px-6 py-4 font-semibold tracking-wider">
                  {tCommonTable("actions")}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/50">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Database className="w-10 h-10 text-muted-foreground/30 mb-3" />
                      <p>{tCommonTable("noData")}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    {columns.map((col, index) => (
                      <td
                        key={col.key}
                        className={cn(
                          "px-6 py-4",
                          index === 0 && "font-medium text-foreground",
                        )}
                      >
                        {getValue(item, col.key) ?? (
                          <span className="text-muted-foreground italic">
                            -
                          </span>
                        )}
                      </td>
                    ))}

                    <td className="px-6 py-4 text-right">
                      <div className="hidden md:flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <CrudActionRow
                          item={item}
                          onView={onView}
                          onEdit={onEdit}
                          onDelete={onDelete}
                        />
                      </div>
                      <div className="flex md:hidden items-center justify-end gap-2">
                        <CrudActionRow
                          item={item}
                          onView={onView}
                          onEdit={onEdit}
                          onDelete={onDelete}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
