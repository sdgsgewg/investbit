import { apiClient } from "../client";
import { upsertRecordSchema } from "@/lib/validations/mutual-fund/records.schema";
import { ApiResponse } from "@/types/api";
import { RecordListItem, RecordQuery } from "@/types/mutual-fund/records";

const baseRoute = "/mutual-fund/records";

export const fetchRecords = async (
  params?: RecordQuery,
): Promise<RecordListItem[]> => {
  const { data } = await apiClient.get<ApiResponse<RecordListItem[]>>(
    baseRoute,
    {
      params,
    },
  );

  return data.data;
};

export const saveRecords = async (payload: unknown) => {
  await apiClient.post(baseRoute, payload);
};
