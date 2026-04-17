"use client";

import InputTable from "@/components/reksadana/recap/input/InputTable";
import InputHeader from "@/components/reksadana/recap/input/InputHeader";
import SkeletonTable from "@/components/reksadana/recap/input/SkeletonTable";
import TopProgressBar from "@/components/shared/TopProgressBar";
import TableOverlay from "@/components/shared/TableOverlay";
import { useRecapInputData } from "@/hooks/useRecapInputData";

export default function InputPage() {
  const {
    categories,
    inputs,
    draftDate,
    setDraftDate,
    setSelectedDate,
    handleInputChange,
    handleSave,
    loading,
    fetching,
    saving,
    canSave,
  } = useRecapInputData();

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm">
      <InputHeader
        draftDate={draftDate}
        onDraftDateChange={setDraftDate}
        onSelectedDateChange={setSelectedDate}
        onSave={handleSave}
        saving={saving}
        canSave={canSave}
      />

      {loading ? (
        <SkeletonTable />
      ) : (
        <div className="flex flex-col gap-4">
          {fetching && <TopProgressBar />}

          <div className="relative">
            {fetching && <TableOverlay />}

            <InputTable
              categories={categories}
              inputs={inputs}
              onInputChange={handleInputChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
