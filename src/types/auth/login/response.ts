import { User, Session } from "@supabase/supabase-js";

export interface LoginResponse {
  user: User;
  session: Session;
}
