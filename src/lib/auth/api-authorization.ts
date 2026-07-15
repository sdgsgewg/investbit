import { canManageContent, canManageSystem } from "./roles";
import { getCurrentProfile } from "./current-auth";
import { ForbiddenError, UnauthorizedError } from "../errors/http-error";

export async function authorizeManageContent() {
  const profile = await getCurrentProfile();

  if (!profile) {
    throw new UnauthorizedError();
  }

  if (!canManageContent(profile)) {
    throw new ForbiddenError();
  }

  return profile;
}

export async function authorizeManageSystem() {
  const profile = await getCurrentProfile();

  if (!profile) {
    throw new UnauthorizedError();
  }

  if (!canManageSystem(profile)) {
    throw new ForbiddenError();
  }

  return profile;
}
