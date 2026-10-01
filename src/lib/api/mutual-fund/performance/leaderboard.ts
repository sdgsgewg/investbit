import {
  CategoryLeaderboardResponse,
  PerformanceQuery,
} from "@/types/mutual-fund/performance";
import { ApiResponse } from "@/types/api";
import { apiClient } from "../../client";

const baseRoute = "/mutual-fund/performance/leaderboard";

export const fetchCategoryLeaderboard = async (
  params?: PerformanceQuery,
): Promise<CategoryLeaderboardResponse> => {
  const { data } = await apiClient.get<
    ApiResponse<CategoryLeaderboardResponse>
  >(baseRoute, {
    params,
  });

  return data.data;
};
