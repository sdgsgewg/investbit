"use client";

import { useTranslations } from "next-intl";
import { DatePicker } from "@/components/ui/DatePicker";
import { safeFormatDate } from "@/lib/utils/date";
import { Button } from "@/components/ui/button";

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
  const tRecords = useTranslations("dashboard.mutualFund.records");

  const selectedDate = draftDate ? new Date(draftDate) : undefined;

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">{tRecords("form.title")}</h2>

        {/* Date Picker */}
        <div className="flex flex-row items-center gap-2">
          <label className="text-sm font-medium">
            {tRecords("form.selectDate")}:
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
        <Button
          variant="default"
          size="lg"
          onClick={onSave}
          disabled={saving || !canSave}
        >
          {saving ? tRecords("form.saving") : tRecords("form.save")}
        </Button>
      </div>
    </div>
  );
};

export default InputHeader;
