import { apiClient } from "@/lib/api/client";
import { ApiResponse } from "@/types/api";
import { RegisterInput, RegisterResponse } from "@/types/auth/register";

export interface RegisterPayload extends RegisterInput {
  locale: string;
  next: string;
}

export const registerUser = async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  const { data } = await apiClient.post<ApiResponse<RegisterResponse>>(
    "/auth/register",
    payload,
  );

  return data.data;
};
