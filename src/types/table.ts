import { ReactNode } from "react";
import { SortOrder } from "./sort";

export type DataRow = {
  id: string;
};

export interface DataColumn<T> {
  key: keyof T | `${string}.${string}`;
  label: string;

  sortable?: boolean;

  sortKey?: string;

  render?: (item: T) => ReactNode;

  className?: string;
  headerClassName?: string;
}

export interface DataTableProps<T extends DataRow> {
  loading?: boolean;

  data: T[];

  columns: DataColumn<T>[];

  showActions?: boolean;

  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;

  emptyMessage?: string;

  sortBy?: string;
  sortOrder?: SortOrder;

  onSort?: (column: string) => void;
}

export type ActionRowProps<T extends DataRow> = {
  item: T;

  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
};
