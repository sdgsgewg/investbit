"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { DatePicker } from "@/components/ui/DatePicker";
import { safeFormatDate } from "@/lib/utils/date";

interface InputHeaderProps {
  draftDate: string;
  onDraftDateChange: (date: string) => void;
  onSelectedDateChange: (date: string) => void;
  onSave: () => void;
  saving: boolean;
  canSave: boolean;
}

const InputHeader = ({
  draftDate,
  onDraftDateChange,
  onSelectedDateChange,
  onSave,
  saving,
  canSave,
}: InputHeaderProps) => {
  const tRecapInput = useTranslations("reksadana.recap.input");

  const selectedDate = draftDate ? new Date(draftDate) : undefined;

  return (
    <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">{tRecapInput("title")}</h2>

        {/* Date Picker */}
        <div className="flex flex-row items-center gap-2">
          <label className="text-sm font-medium">
            {tRecapInput("form.selectDate")}:
          </label>

          <DatePicker
            value={selectedDate}
            onChange={(date) => {
              if (!date) return;
              onDraftDateChange(safeFormatDate(date, "yyyy-MM-dd"));
            }}
            onSelectFinal={(date) => {
              const formatted = safeFormatDate(date, "yyyy-MM-dd");
              onSelectedDateChange(formatted); // trigger fetch di sini
            }}
            disabled={(date) => {
              const day = date.getDay();
              return day === 0 || day === 6 || date > new Date();
            }}
          />
        </div>
      </div>

      {/* Save */}
      <div className="flex items-start md:items-end">
        <button
          onClick={onSave}
          disabled={saving || !canSave}
          className={cn(
            "font-semibold py-2 px-6 rounded transition text-white",
            saving || !canSave
              ? "bg-green-400 dark:bg-green-800 cursor-not-allowed opacity-50"
              : "bg-green-600 hover:bg-green-700 active:scale-95",
          )}
        >
          {saving ? tRecapInput("form.saving") : tRecapInput("form.save")}
        </button>
      </div>
    </div>
  );
};

export default InputHeader;
