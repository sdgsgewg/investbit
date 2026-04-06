import { useTranslations } from "next-intl";

type FieldType = "text" | "select";

type FormField = {
  name: string;
  label: string;
  type: FieldType;
  options?: { id: string; name: string }[];
};

type Column = {
  key: string; // support nested: "category.name"
  label: string;
};

type CrudPageProps = {
  title: string;
  formFields: FormField[];
  columns: Column[];
  data: any[];
  form: any;
  setForm: (val: any) => void;
  onSubmit: () => void;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  isEditing: boolean;
  isSubmitting: boolean;
  isFormEmpty: boolean;
  buttonText: string;
  resetForm: () => void;
};

export function CrudPage(props: CrudPageProps) {
  const tCommon = useTranslations("Common");

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
    isFormEmpty,
    buttonText,
    resetForm,
  } = props;

  const getValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{title}</h1>

      {/* FORM */}
      <div className="border p-4 rounded space-y-4">
        <h2 className="font-semibold">{isEditing ? tCommon("edit") : tCommon("add")}</h2>

        {formFields.map((field) => {
          if (field.type === "text") {
            return (
              <input
                key={field.name}
                placeholder={field.label}
                value={form[field.name] || ""}
                onChange={(e) =>
                  setForm({ ...form, [field.name]: e.target.value })
                }
                className="border p-2 w-full"
              />
            );
          }

          if (field.type === "select") {
            return (
              <select
                key={field.name}
                value={form[field.name] || ""}
                onChange={(e) =>
                  setForm({ ...form, [field.name]: e.target.value })
                }
                className="border p-2 w-full"
              >
                <option value="" className="bg-zinc-100 dark:bg-zinc-800">
                  {field.label}
                </option>
                {field.options?.map((opt) => (
                  <option
                    key={opt.id}
                    value={opt.id}
                    className="bg-zinc-100 dark:bg-zinc-800"
                  >
                    {opt.name}
                  </option>
                ))}
              </select>
            );
          }

          return null;
        })}

        <div className="flex gap-2">
          <button
            onClick={onSubmit}
            disabled={isSubmitting || isFormEmpty}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition disabled:opacity-50"
          >
            {buttonText}
          </button>

          {isEditing && (
            <button
              onClick={resetForm}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded transition"
            >
              {tCommon("cancel")}
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <table className="w-full border">
        <thead className="bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="p-2 text-left">
                {col.label}
              </th>
            ))}
            <th className="p-2">{tCommon("actions")}</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              {columns.map((col) => (
                <td key={col.key} className="p-2">
                  {getValue(item, col.key)}
                </td>
              ))}

              <td className="p-2 text-center space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  {tCommon("edit")}
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  {tCommon("delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
