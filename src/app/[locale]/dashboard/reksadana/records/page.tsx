"use client";

import TopProgressBar from "@/components/feedback/TopProgressBar";
import TableOverlay from "@/components/feedback/TableOverlay";
import { useRecordData } from "@/hooks/reksadana/useRecordData";
import InputHeader from "@/components/reksadana/records/InputHeader";
import SkeletonTable from "@/components/reksadana/records/SkeletonTable";
import InputTable from "@/components/reksadana/records/InputTable";
import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { isLikelyConnectionError } from "@/lib/utils/error";

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
    loadError,
    retryLoad,
  } = useRecordData();

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm space-y-6">
      <InputHeader
        draftDate={draftDate}
        onDraftDateChange={setDraftDate}
        onSelectedDateChange={setSelectedDate}
        onSave={handleSave}
        saving={saving}
        canSave={canSave}
      />

      {isLikelyConnectionError(loadError) && (
        <div className="mt-4">
          <ConnectionErrorAlert onRetry={retryLoad} retrying={fetching} />
        </div>
      )}

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
