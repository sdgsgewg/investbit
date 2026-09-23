import { apiClient } from "@/lib/api/client";
import { ApiResponse } from "@/types/api";
import { LoginInput, LoginResponse } from "@/types/auth/login";

export const loginUser = async (payload: LoginInput): Promise<LoginResponse> => {
  const { data } = await apiClient.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    payload,
  );

  return data.data;
};
