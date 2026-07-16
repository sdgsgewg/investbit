import { Role } from "@/enums/Role";
import { Profile } from "@/types/profile";

// khusus guest
export function isGuest(profile: Pick<Profile, "role"> | null | undefined) {
  return profile === null || profile === undefined;
}

// rdn categories, items, records.
export function canManageContent(
  profile: Pick<Profile, "role"> | null | undefined,
) {
  return profile?.role === Role.ADMIN || profile?.role === Role.EDITOR;
}

// user, role, dll.
export function canManageSystem(
  profile: Pick<Profile, "role"> | null | undefined,
) {
  return profile?.role === Role.ADMIN;
}

// khusus admin
export function isAdmin(profile: Pick<Profile, "role"> | null | undefined) {
  return profile?.role === Role.ADMIN;
}
