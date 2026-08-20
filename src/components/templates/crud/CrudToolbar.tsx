"use client";

import { Search, Filter, PlusCircle, ListOrdered } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CrudToolbarProps {
  loading?: boolean;

  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;

  onFilter?: () => void;

  onCreate?: () => void;
  onReorder?: () => void;
}

export default function CrudToolbar({
  loading = false,

  searchValue = "",
  searchPlaceholder,

  onSearchChange,

  onFilter,

  onCreate,
  onReorder,
}: CrudToolbarProps) {
  const tCommon = useTranslations("common");
  const tActions = useTranslations("common.actions");

  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div className="flex flex-1 flex-col gap-3 sm:flex-row">
        {onSearchChange && (
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={searchValue}
              placeholder={searchPlaceholder ?? tCommon("searchPlaceholder")}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        )}

        {onFilter && (
          <Button variant="outline" onClick={onFilter} disabled={loading}>
            <Filter className="size-4" />

            {tActions("filter")}
          </Button>
        )}
      </div>

      {/* Right */}
      {onCreate && (
        <Button onClick={onCreate} disabled={loading}>
          <PlusCircle className="size-4" />

          {tActions("add")}
        </Button>
      )}

      {onReorder && (
        <Button onClick={onReorder} disabled={loading}>
          <ListOrdered className="size-4" />

          {tActions("reorder")}
        </Button>
      )}
    </div>
  );
}
