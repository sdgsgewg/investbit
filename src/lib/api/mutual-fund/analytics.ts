import {
  PerformanceAnalyticsQuery,
  PerformanceAnalyticsResponse,
} from "@/types/mutual-fund/performance";
import { apiClient } from "../client";
import { ApiResponse } from "@/types/api";

const baseRoute = "/mutual-fund/performance/analytics";

export const fetchPerformanceAnalytics = async (
  params?: PerformanceAnalyticsQuery,
): Promise<PerformanceAnalyticsResponse> => {
  const { data } = await apiClient.get<
    ApiResponse<PerformanceAnalyticsResponse>
  >(baseRoute, {
    params,
  });

  return data.data;
};
