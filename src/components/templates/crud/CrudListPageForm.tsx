import { FormWrapper } from "@/components/forms/base";
import { Button } from "@/components/ui/button";
import { CrudListPageFormProps } from "@/types/crud";
import { Edit2, Plus, Save, X } from "lucide-react";
import { useTranslations } from "next-intl";

export const CrudListPageForm = ({
  children,
  isDirty,
  isEditing,
  isSubmitting,
  buttonText,
  resetForm,
  canSubmit,
  onSubmit,
}: CrudListPageFormProps) => {
  const tCommonActions = useTranslations("common.actions");
  const tCommonUi = useTranslations("common.ui");

  return (
    <div className="lg:col-span-4 space-y-6">
      <FormWrapper isDirty={isDirty}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
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
            {children}

            <div className="flex gap-3 pt-4 border-t border-border/50">
              <Button
                type="submit"
                variant="default"
                size="lg"
                disabled={isSubmitting || !canSubmit}
                className="flex-1"
              >
                <Save className="w-4 h-4" />
                {buttonText}
              </Button>

              {isEditing && (
                <Button
                  type="button"
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
        </form>
      </FormWrapper>
    </div>
  );
};
