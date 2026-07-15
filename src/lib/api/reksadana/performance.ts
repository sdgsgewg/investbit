import { PerformanceResponse } from "@/types/reksadana/performance/PerformanceResponse";
import { apiClient } from "../client";

export const fetchPerformance = async (params: {
  timeFrame: string;
  categoryId?: string;
  periodLimit?: number;
  startPeriod?: string;
  endPeriod?: string;
}): Promise<PerformanceResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PerformanceResponse;
  }>("/reksadana/recap/performance", {
    params: {
      timeFrame: params.timeFrame,
      categoryId: params.categoryId || undefined,
      periodLimit:
        params.startPeriod || params.endPeriod ? undefined : params.periodLimit,
      startPeriod: params.startPeriod || undefined,
      endPeriod: params.endPeriod || undefined,
    },
  });

  return data.data;
};
