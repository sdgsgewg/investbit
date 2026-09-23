import {
  TopPerformersQuery,
  TopPerformersResponse,
} from "@/types/mutual-fund/performance";
import { ApiResponse } from "@/types/api";
import { apiClient } from "../../client";

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
