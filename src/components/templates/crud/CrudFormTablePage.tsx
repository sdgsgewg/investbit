import { CrudFormTablePageProps } from "@/types/crud";
import { CrudPageHeader } from "./CrudPageHeader";
import { DataRow } from "@/types/table";
import { DataTable } from "@/components/shared/tables/DataTable";
import CrudToolbar from "./CrudToolbar";

export function CrudFormTablePage<TData extends DataRow>(
  props: CrudFormTablePageProps<TData>,
) {
  const {
    title,
    loading,
    data,
    columns,
    headerContent,

    form,

    actions: { onView, onEdit, onDelete },

    toolbar: { searchValue, searchPlaceholder, onSearchChange, onFilter } = {},

    sorting: { sortBy, sortOrder, onSort } = {},
  } = props;

  return (
    <div className="space-y-8">
      <CrudPageHeader title={title} />
      {headerContent}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* FORM SECTION */}
        <div className="lg:col-span-4">{form}</div>

        {/* TABLE SECTION */}
        <div className="lg:col-span-8 space-y-4">
          <CrudToolbar
            loading={loading}
            searchValue={searchValue}
            searchPlaceholder={searchPlaceholder}
            onSearchChange={onSearchChange}
            onFilter={onFilter}
          />

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
        </div>
      </div>
    </div>
  );
}
