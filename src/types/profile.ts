import { Role } from "@/enums/Role";

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  role: Role;
}
