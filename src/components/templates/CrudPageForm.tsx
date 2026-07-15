import { Button } from "@/components/ui/button";
import InputText from "@/components/ui/InputText";
import InputSelect from "../ui/InputSelect";
import { CrudForm, CrudPageProps, CrudRow } from "@/types/crud";
import { Edit2, Plus, Save, X } from "lucide-react";
import { useTranslations } from "next-intl";

export const CrudPageForm = ({
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
            // Text Field
            if (field.type === "text") {
              return (
                <InputText
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  placeholder={field.placeholder || ""}
                  value={(form[field.name] as string) ?? ""}
                  onChange={(value) =>
                    setForm({ ...form, [field.name]: value })
                  }
                />
              );
            }

            // Select Field
            if (field.type === "select") {
              return (
                <InputSelect
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  placeholder={field.placeholder || ""}
                  value={(form[field.name] as string) || ""}
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
              disabled={isSubmitting || !canSubmit}
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
