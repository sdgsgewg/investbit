import { CategoryWithItems } from "@/types/mutual-fund/records/CategoryWithItems";
import { apiClient } from "../client";
import { upsertRecordSchema } from "@/lib/validations/reksadana/records.schema";
import { ApiResponse } from "@/types/api";
import { RecordListItem, RecordQuery } from "@/types/mutual-fund/records";

export const fetchCategoriesWithItems = async (): Promise<
  CategoryWithItems[]
> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: CategoryWithItems[];
  }>("/reksadana/items?grouped=true");

  return data.data;
};

export const fetchRecords = async (
  params?: RecordQuery,
): Promise<RecordListItem[]> => {
  const { data } = await apiClient.get<ApiResponse<RecordListItem[]>>(
    `/reksadana/records`,
    {
      params,
    },
  );

  return data.data;
};

export const saveRecords = async (payload: unknown) => {
  const parsed = upsertRecordSchema.parse(payload); // validation

  await apiClient.post("/reksadana/records", parsed);
};
