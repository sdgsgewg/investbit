import { useTranslations } from "next-intl";
import React from "react";

interface InputHeaderProps {
  draftDate: string;
  onDraftDateChange: (date: string) => void;
  onSelectedDateChange: (date: string) => void;
  onSave: () => void;
  saving: boolean;
}

const InputHeader = ({
  draftDate,
  onDraftDateChange,
  onSelectedDateChange,
  onSave,
  saving,
}: InputHeaderProps) => {
  const tRecapInput = useTranslations("reksadana.recap.input");
  const tCommon = useTranslations("common");

  return (
    <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
      <div className="flex flex-col gap-4">
        {/* Title */}
        <h2 className="text-xl font-semibold">{tRecapInput("title")}</h2>

        {/* Select Date */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">
            {tRecapInput("form.selectDate")}:
          </label>
          <input
            type="date"
            value={draftDate}
            onChange={(e) => onDraftDateChange(e.target.value)}
            className="border p-2 rounded text-zinc-800 dark:text-zinc-200 dark:bg-zinc-800"
          />
          <button
            onClick={() => onSelectedDateChange(draftDate)}
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 ml-1 rounded cursor-pointer transition"
          >
            {tCommon("actions.apply")}
          </button>
        </div>
      </div>

      {/* Save Daily Data */}
      <div className="flex items-start md:items-end">
        <button
          onClick={onSave}
          disabled={saving}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded cursor-pointer transition disabled:opacity-50"
        >
          {saving ? tRecapInput("form.saving") : tRecapInput("form.save")}
        </button>
      </div>
    </div>
  );
};

export default InputHeader;
