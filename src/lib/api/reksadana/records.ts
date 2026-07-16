import { CategoryWithItems } from "@/types/reksadana/records/CategoryWithItems";
import { apiClient } from "../client";
import { RecordData } from "@/types/reksadana/records/RecordData";
import { upsertRecordSchema } from "@/lib/validations/reksadana/records.schema";

export const fetchCategoriesWithItems = async (): Promise<
  CategoryWithItems[]
> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: CategoryWithItems[];
  }>("/reksadana/items?grouped=true");

  return data.data;
};

export const fetchRecords = async (date: string): Promise<RecordData[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: RecordData[];
  }>(`/reksadana/records?startDate=${date}&endDate=${date}`);

  return data.data;
};

export const saveRecords = async (payload: unknown) => {
  const parsed = upsertRecordSchema.parse(payload); // validation

  await apiClient.post("/reksadana/records", parsed);
};
