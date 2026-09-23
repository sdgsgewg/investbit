import { HttpError } from "@/lib/errors/http-error";
import { RegisterInput, RegisterResponse } from "@/types/auth/register";
import { createClient } from "@/utils/supabase/server";

export async function registerRepo(
  payload: RegisterInput,
  emailRedirectTo?: string,
): Promise<RegisterResponse> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      emailRedirectTo,
      data: {
        name: payload.name,
      },
    },
  });

  if (error) {
    throw new HttpError(error.message, 400);
  }

  return {
    hasSession: Boolean(data.session),
    userId: data.user?.id,
    email: data.user?.email,
  };
}
