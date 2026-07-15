import { CONTENT_MANAGE_ROUTES, ADMIN_MANAGE_ROUTES } from "./manage-routes";

import { canManageContent, canManageSystem } from "./roles";

export const MANAGE_ROUTE_PERMISSIONS = [
  {
    routes: ADMIN_MANAGE_ROUTES,
    check: canManageSystem,
  },
  {
    routes: CONTENT_MANAGE_ROUTES,
    check: canManageContent,
  },
];
