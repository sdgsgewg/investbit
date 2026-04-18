"use client";

import TopProgressBar from "@/components/feedback/TopProgressBar";
import TableOverlay from "@/components/feedback/TableOverlay";
import { useRecapInputData } from "@/features/reksadana/recap/input/hooks/useRecapInputData";
import InputHeader from "@/features/reksadana/recap/input/components/InputHeader";
import SkeletonTable from "@/features/reksadana/recap/input/components/SkeletonTable";
import InputTable from "@/features/reksadana/recap/input/components/InputTable";

export default function InputPage() {
  const {
    categoriesWithItems,
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
              categoriesWithItems={categoriesWithItems}
              inputs={inputs}
              onInputChange={handleInputChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
