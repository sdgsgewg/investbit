import { HttpError } from "@/lib/errors/http-error";
import { LoginInput, LoginResponse } from "@/types/auth/login";
import { createClient } from "@/utils/supabase/server";

export async function loginRepo(
  payload: LoginInput,
): Promise<LoginResponse> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });

  if (error) {
    throw new HttpError(error.message, 400);
  }

  if (!data.user || !data.session) {
    throw new HttpError("Failed to create user session", 400);
  }

  return {
    user: data.user,
    session: data.session,
  };
}