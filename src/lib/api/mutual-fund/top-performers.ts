import {
  TopPerformersQuery,
  TopPerformersResponse,
} from "@/types/mutual-fund/performance";
import { apiClient } from "../client";
import { ApiResponse } from "@/types/api";

const baseRoute = "/mutual-fund/performance/top-performers";

export const fetchTopPerformers = async (
  params?: TopPerformersQuery,
): Promise<TopPerformersResponse> => {
  const { data } = await apiClient.get<ApiResponse<TopPerformersResponse>>(
    baseRoute,
    {
      params,
    },
  );

  return data.data;
};
