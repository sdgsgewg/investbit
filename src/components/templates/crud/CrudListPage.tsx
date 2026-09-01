import { CrudListPageProps } from "@/types/crud";
import { CrudPageHeader } from "./CrudPageHeader";
import { DataTable } from "@/components/shared/tables/DataTable";
import { DataRow } from "@/types/table";
import CrudToolbar from "./CrudToolbar";
import CrudFilterDialog from "./CrudFilterDialog";
import { CrudPaginationSection } from "./pagination";

export const CrudListPage = <TData extends DataRow>({
  title,
  loading,
  data,
  columns,
  headerContent,

  actions: { onCreate, onReorder, onView, onEdit, onDelete },

  toolbar: { searchValue, searchPlaceholder, onSearchChange, onFilter } = {},

  filter,

  sorting: { sortBy, sortOrder, onSort } = {},

  pagination: paginationProps,
}: CrudListPageProps<TData>) => {
  return (
    <div className="space-y-4">
      <CrudPageHeader title={title} />

      {headerContent}

      <CrudToolbar
        loading={loading}
        searchValue={searchValue}
        searchPlaceholder={searchPlaceholder}
        onSearchChange={onSearchChange}
        onFilter={onFilter}
        onCreate={onCreate}
        onReorder={onReorder}
      />

      {filter && (
        <CrudFilterDialog
          open={filter.open}
          onOpenChange={filter.onOpenChange}
          onApply={filter.onApply}
          onReset={filter.onReset}
        >
          {filter.content}
        </CrudFilterDialog>
      )}

      <DataTable
        data={data}
        loading={loading}
        columns={columns}
        showActions
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={onSort}
      />

      {paginationProps && (
        <CrudPaginationSection {...paginationProps} isLoading={loading} />
      )}
    </div>
  );
};
