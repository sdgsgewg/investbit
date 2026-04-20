import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import { Edit2, Trash2, Plus, Save, X, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import InputDropdown from "../ui/InputDropdown";
import InputText from "../ui/InputText";
import TableSkeleton from "../ui/TableSkeleton";
import { Button } from "../ui/button";

type FieldType = "text" | "select";

type FormField = {
  name: string;
  label: string;
  placeholder?: string;
  type: FieldType;
  options?: { id: string; name: string }[];
};

type Column = {
  key: string; // support nested: "category.name"
  label: string;
};

type CrudRow = {
  id: string;
  name?: string;
  [key: string]: unknown;
};

type CrudForm = Record<string, string>;

type CrudPageProps<TData extends CrudRow, TForm extends CrudForm> = {
  title: string;
  formFields: FormField[];
  columns: Column[];
  data: TData[];
  form: TForm;
  setForm: Dispatch<SetStateAction<TForm>>;
  canSubmit: () => boolean;
  onSubmit: () => void;
  onEdit: (item: TData) => void;
  onDelete: (item: TData) => void;
  isEditing: boolean;
  isSubmitting: boolean;
  buttonText: string;
  resetForm: () => void;
  loading?: boolean;
  headerContent?: ReactNode;
};

const CrudPageHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-3 pb-6 border-b border-border/40">
      <div className="p-2.5 bg-primary/10 rounded-xl">
        <Database className="w-6 h-6 text-primary" />
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/80">
        {title}
      </h1>
    </div>
  );
};

const CrudPageForm = ({
  formFields,
  form,
  setForm,
  isEditing,
  isSubmitting,
  buttonText,
  resetForm,
  canSubmit,
  onSubmit,
}: Pick<
  CrudPageProps<CrudRow, CrudForm>,
  | "formFields"
  | "form"
  | "setForm"
  | "isEditing"
  | "isSubmitting"
  | "buttonText"
  | "resetForm"
  | "canSubmit"
  | "onSubmit"
>) => {
  const tCommonActions = useTranslations("common.actions");
  const tCommonUi = useTranslations("common.ui");

  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="bg-card border border-border/50 shadow-sm rounded-2xl overflow-hidden sticky top-24">
        <div className="p-6 bg-muted/20 border-b border-border/50">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            {isEditing ? (
              <>
                <Edit2 className="w-4 h-4 text-primary" />
                {tCommonActions("edit")} {tCommonUi("entry")}
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-primary" />
                {tCommonActions("add")} {tCommonUi("entry")}
              </>
            )}
          </h2>
        </div>

        <div className="p-6 space-y-5">
          {formFields.map((field) => {
            if (field.type === "text") {
              return (
                <InputText
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  placeholder={field.placeholder || ""}
                  value={form[field.name] || ""}
                  onChange={(value) =>
                    setForm({ ...form, [field.name]: value })
                  }
                />
              );
            }

            if (field.type === "select") {
              return (
                <InputDropdown
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  placeholder={field.placeholder || ""}
                  value={form[field.name] || ""}
                  options={field.options || []}
                  onChange={(value) =>
                    setForm({ ...form, [field.name]: value })
                  }
                />
              );
            }

            return null;
          })}

          <div className="flex gap-3 pt-4 border-t border-border/50">
            <Button
              variant="default"
              size="lg"
              onClick={onSubmit}
              disabled={isSubmitting || !canSubmit()}
              className="flex-1"
            >
              <Save className="w-4 h-4" />
              {buttonText}
            </Button>

            {isEditing && (
              <Button
                variant="muted"
                size="lg"
                onClick={resetForm}
                title={tCommonActions("cancel")}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CrudPageTable = ({
  columns,
  data,
  onEdit,
  onDelete,
}: Pick<
  CrudPageProps<CrudRow, CrudForm>,
  "columns" | "data" | "onEdit" | "onDelete"
>) => {
  const tCommonTable = useTranslations("common.table");
  const tCommonActions = useTranslations("common.actions");

  const getValue = (obj: CrudRow, path: string): ReactNode | null => {
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

  const unableDeleteCategories = [
    "campuran",
    "obligasi",
    "pasar uang",
    "saham",
  ];

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
                        <button
                          onClick={() => onEdit(item)}
                          className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title={tCommonActions("edit")}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {!(
                          typeof item.name === "string" &&
                          unableDeleteCategories.includes(item.name.toLowerCase())
                        ) && (
                          <button
                            onClick={() => onDelete(item)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            title={tCommonActions("delete")}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="flex md:hidden items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit(item)}
                          className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(item)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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

export function CrudPage<TData extends CrudRow, TForm extends CrudForm>(
  props: CrudPageProps<TData, TForm>,
) {
  const {
    title,
    formFields,
    columns,
    data,
    form,
    setForm,
    onSubmit,
    onEdit,
    onDelete,
    isEditing,
    isSubmitting,
    canSubmit,
    buttonText,
    resetForm,
    loading,
    headerContent,
  } = props;

  return (
    <div className="space-y-8">
      <CrudPageHeader title={title} />
      {headerContent}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* FORM SECTION */}
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

        {/* TABLE SECTION */}
        {loading ? (
          <div className="lg:col-span-8">
            <TableSkeleton columnCount={columns.length} rowCount={5} />
          </div>
        ) : (
          <CrudPageTable
            data={data as CrudRow[]}
            columns={columns}
            onEdit={onEdit as (item: CrudRow) => void}
            onDelete={onDelete as (item: CrudRow) => void}
          />
        )}
      </div>
    </div>
  );
}
