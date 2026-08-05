import {
  PerformanceQuery,
  PerformanceResponse,
} from "@/types/mutual-fund/performance";
import { apiClient } from "../client";
import { ApiResponse } from "@/types/api";

/**
 *
 * @param params
 * @returns PerformanceResponse
 */
export const fetchPerformance = async (
  params?: PerformanceQuery,
): Promise<PerformanceResponse> => {
  const { data } = await apiClient.get<ApiResponse<PerformanceResponse>>(
    "/reksadana/recap/performance",
    {
      params,
    },
  );

  return data.data;
};
