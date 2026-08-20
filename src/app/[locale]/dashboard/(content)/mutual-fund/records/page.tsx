"use client";

import TopProgressBar from "@/components/feedback/TopProgressBar";
import TableOverlay from "@/components/feedback/TableOverlay";
import InputHeader from "@/components/mutual-fund/records/InputHeader";
import SkeletonTable from "@/components/mutual-fund/records/SkeletonTable";
import InputTable from "@/components/mutual-fund/records/InputTable";
import ConnectionErrorAlert from "@/components/feedback/ConnectionErrorAlert";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { CrudPageHeader } from "@/components/templates/crud/CrudPageHeader";
import { useTranslations } from "next-intl";
import { useRecordData } from "@/hooks/dashboard/mutual-fund/records";

export default function RecordPage() {
  const t = useTranslations("dashboard.mutualFund.records");

  const {
    groupedItems,
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
    <>
      <CrudPageHeader title={t("title")} />

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
                groupedItems={groupedItems}
                inputs={inputs}
                onInputChange={handleInputChange}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
