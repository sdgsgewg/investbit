import { redirect } from "next/navigation";

import { getCurrentProfile } from "./current-auth";
import { canManageContent, canManageSystem } from "./roles";

export async function requireAuthentication() {}

export async function requireManageContent() {
  const profile = await getCurrentProfile();

  if (!canManageContent(profile)) {
    redirect("/");
  }

  return profile;
}

export async function requireManageSystem() {
  const profile = await getCurrentProfile();

  if (!canManageSystem(profile)) {
    redirect("/");
  }

  return profile;
}

export async function requireAdmin() {}
