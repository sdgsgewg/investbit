import { loginSchema } from "@/lib/validations/auth/login.schema";
import { loginRepo } from "@/lib/repositories/auth/login.repo";
import { LoginResponse } from "@/types/auth/login";

export async function loginService(input: unknown): Promise<LoginResponse> {
  const parsed = loginSchema.parse(input);

  return await loginRepo(parsed);
}
