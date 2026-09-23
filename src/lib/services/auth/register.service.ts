import { registerRepo } from "@/lib/repositories/auth/register.repo";
import { registerSchema } from "@/lib/validations/auth/register.schema";
import { RegisterResponse } from "@/types/auth/register";

export async function registerService(
  input: unknown,
  emailRedirectTo?: string,
): Promise<RegisterResponse> {
  const parsed = registerSchema.parse(input);
  
  return await registerRepo(parsed, emailRedirectTo);
}
