import { ROUTES } from "@/constants/routes";

interface EntityConfig {
  table: string;
  label: string;
  dashboardRoute?: string;
}

export const ENTITY_CONFIG = {
  rdCategory: {
    table: "rd_categories",
    label: "Category",
    dashboardRoute: ROUTES.DASHBOARD.MUTUAL_FUND.CATEGORIES,
  },

  rdItem: {
    table: "rd_items",
    label: "Item",
    dashboardRoute: ROUTES.DASHBOARD.MUTUAL_FUND.ITEMS.BASE,
  },

  rdRecord: {
    table: "rd_records",
    label: "Record",
    dashboardRoute: ROUTES.DASHBOARD.MUTUAL_FUND.RECORDS,
  },
} as const satisfies Record<string, EntityConfig>;

export type Entity = keyof typeof ENTITY_CONFIG;

export type EntityTable = (typeof ENTITY_CONFIG)[Entity]["table"];
export type EntityLabel = (typeof ENTITY_CONFIG)[Entity]["label"];

// HOW TO USE:
// ENTITY_CONFIG[entity].supportsImage
// or
// ENTITY_CONFIG.rdCategory.storageBucket
