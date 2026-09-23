import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormMode } from "@/types/form";

interface Props {
  loading?: boolean;
  mode: FormMode;
  canSubmit: boolean;
  onSubmit?: () => void;
}

const FormHeader = ({ loading = false, mode, canSubmit, onSubmit }: Props) => {
  const tCommonStates = useTranslations("common.states");
  const tCommonActions = useTranslations("common.actions");
  const tCommonUi = useTranslations("common.ui");

  const isCreate = mode === "create";

  const buttonText = loading
    ? isCreate
      ? tCommonStates("creating")
      : tCommonStates("updating")
    : isCreate
      ? tCommonActions("create")
      : tCommonActions("update");

  const handleSubmit = () => {
    if (!onSubmit) return;
    onSubmit();
  };

  return (
    <div className="flex flex-row items-center justify-between px-6 py-4 bg-muted/20 border-b border-border/50">
      <div className="flex items-center gap-2">
        {isCreate ? (
          <>
            <Plus className="w-4 h-4" />
            {tCommonActions("add")} {tCommonUi("entry")}
          </>
        ) : (
          <>
            <Pencil className="w-4 h-4" />
            {tCommonActions("edit")} {tCommonUi("entry")}
          </>
        )}
      </div>

      <div className="">
        <Button
          variant="default"
          size="lg"
          disabled={loading || !canSubmit}
          className="flex-1"
          onClick={handleSubmit}
        >
          <Save className="w-4 h-4" />
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default FormHeader;
