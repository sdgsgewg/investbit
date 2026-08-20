import type { Dispatch, SetStateAction } from "react";
import { CrudForm, CrudFormTablePageProps } from "@/types/crud";
import { CrudPageHeader } from "./CrudPageHeader";
import { CrudPageForm } from "./CrudPageForm";
import { DataRow } from "@/types/table";
import { DataTable } from "@/components/shared/tables/DataTable";
import CrudToolbar from "./CrudToolbar";
import CrudPagination from "./CrudPagination";

export function CrudFormTablePage<
  TData extends DataRow,
  TForm extends CrudForm,
>(props: CrudFormTablePageProps<TData, TForm>) {
  const {
    title,
    loading,
    data,
    columns,
    headerContent,

    form: {
      formFields,

      form,
      setForm,

      canSubmit,
      onSubmit,

      isEditing,
      isSubmitting,
      buttonText,

      resetForm,
    },

    actions: { onView, onEdit, onDelete },

    toolbar: { searchValue, searchPlaceholder, onSearchChange, onFilter } = {},

    sorting: { sortBy, sortOrder, onSort } = {},

    pagination: paginationProps,
  } = props;

  return (
    <div className="space-y-8">
      <CrudPageHeader title={title} />
      {headerContent}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* FORM SECTION */}
        <div className="lg:col-span-4 space-y-6">
          <CrudPageForm
            formFields={formFields}
            form={form as CrudForm}
            setForm={setForm as Dispatch<SetStateAction<CrudForm>>}
            isEditing={isEditing}
            isSubmitting={isSubmitting}
            buttonText={buttonText}
            resetForm={resetForm}
            canSubmit={canSubmit}
            onSubmit={onSubmit}
          />
        </div>

        {/* TABLE SECTION */}
        <div className="lg:col-span-8">
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

          {paginationProps && (
            <CrudPagination {...paginationProps} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
}
