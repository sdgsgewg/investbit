import {
  CONTENT_MANAGE_ROUTES,
  ADMIN_MANAGE_ROUTES,
  GUEST_ONLY_ROUTES,
} from "./manage-routes";

import { canManageContent, canManageSystem, isGuest } from "./roles";

export const MANAGE_ROUTE_PERMISSIONS = [
  {
    routes: GUEST_ONLY_ROUTES,
    type: "guest",
    check: isGuest,
  },
  {
    routes: CONTENT_MANAGE_ROUTES,
    type: "protected",
    check: canManageContent,
  },
  {
    routes: ADMIN_MANAGE_ROUTES,
    type: "protected",
    check: canManageSystem,
  },
];
