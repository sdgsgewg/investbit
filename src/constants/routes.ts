export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    EMAIL_VERIFICATION: "/email-verification",
    COMPLETE_PROFILE: "/complete-profile",
  },
  HOME: "/",
  ANALYZE: "/analyze",
  LEARN: "/learn",
  GLOSSARY: "/glossary",
  MUTUAL_FUND: {
    BASE: "/mutual-fund",
    PERFORMANCE: "/mutual-fund/performance",
  },
  DASHBOARD: {
    HOME: "/dashboard",
    MUTUAL_FUND: {
      CATEGORIES: "/dashboard/mutual-fund/categories",
      ITEMS: "/dashboard/mutual-fund/items",
      RECORDS: "/dashboard/mutual-fund/records",
    },
    SYSTEM: {
      USERS: "/dashboard/system/users",
      ROLES: "/dashboard/systems/roles",
    },
  },
};
