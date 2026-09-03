import {
  CategoryLeaderboardQuery,
  CategoryLeaderboardResponse,
} from "@/types/mutual-fund/performance";
import { apiClient } from "../client";
import { ApiResponse } from "@/types/api";

const baseRoute = "/mutual-fund/performance/leaderboard";

export const fetchCategoryLeaderboard = async (
  params?: CategoryLeaderboardQuery,
): Promise<CategoryLeaderboardResponse> => {
  const { data } = await apiClient.get<
    ApiResponse<CategoryLeaderboardResponse>
  >(baseRoute, {
    params,
  });

  return data.data;
};
