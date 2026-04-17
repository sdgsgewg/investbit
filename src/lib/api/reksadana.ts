import { apiClient } from "./client";
import { Category } from "@/types/reksadana/recap/input/Category";
import { RecordData } from "@/types/reksadana/records/RecordData";
import { PerformanceResponse } from "@/types/reksadana/recap/performance/PerformanceResponse";
import { recordsSchema } from "../validations/reksadana/records.schema";

// categories
export const fetchCategories = async () => {
  const { data } = await apiClient.get<Category[]>(
    "/reksadana/items?grouped=true",
  );
  return data;
};

// records
export const fetchRecords = async (date: string) => {
  const { data } = await apiClient.get<RecordData[]>(
    `/reksadana/records?startDate=${date}&endDate=${date}`,
  );
  return data;
};

// performance
export const fetchPerformance = async (params: {
  timeFrame: string;
  categoryId?: string;
}) => {
  const { data } = await apiClient.get<PerformanceResponse>(
    "/reksadana/recap/performance",
    {
      params: {
        timeFrame: params.timeFrame,
        categoryId: params.categoryId || undefined,
      },
    },
  );
  return data;
};

// save records
export const saveRecords = async (payload: unknown) => {
  const parsed = recordsSchema.parse(payload); // validation

  await apiClient.post("/api/reksadana/records", parsed);
};
