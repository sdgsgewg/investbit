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
import { useFilterSync } from "@/hooks/filter";
import {
  useRecordData,
  useRecordFilter,
  useRecordForm,
  useRecordSubmit,
} from "@/hooks/dashboard/mutual-fund/records";

export default function RecordPage() {
  const t = useTranslations("dashboard.mutualFund.records");

  // 1. Filter & URL Sync
  const {
    filters,
    syncUrl,
    handleDateChange,
    handleCategoryChange,
  } = useRecordFilter();

  useFilterSync(filters, syncUrl);

  // 2. Data Fetching
  const {
    groupedItems,
    recordsData,
    loading,
    fetching,
    loadError,
    retryLoad,
  } = useRecordData(filters);

  // 3. Form Input Table State
  const {
    inputs,
    handleInputChange,
    canSave,
    buildPayload,
    resetForm,
  } = useRecordForm(recordsData, filters);

  // 4. Submit Orchestrator
  const { isSubmitting, submit } = useRecordSubmit(filters.startDate);

  const handleSave = () => {
    const payload = buildPayload(filters.startDate);
    submit({
      payload,
      onSuccess: resetForm,
    });
  };

  return (
    <>
      <CrudPageHeader title={t("title")} />

      <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-sm space-y-6">
        <InputHeader
          filters={filters}
          onDateChange={handleDateChange}
          onCategoryChange={handleCategoryChange}
          onSave={handleSave}
          saving={isSubmitting}
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
