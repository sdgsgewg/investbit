interface EntityConfig {
  table: string;
  label: string;
}

export const ENTITY_CONFIG = {
  rdCategory: {
    table: "rd_categories",
    label: "Category",
  },

  rdItem: {
    table: "rd_items",
    label: "Item",
  },

  rdRecord: {
    table: "rd_records",
    label: "Record",
  },
} as const satisfies Record<string, EntityConfig>;

export type Entity = keyof typeof ENTITY_CONFIG;

export type EntityTable = (typeof ENTITY_CONFIG)[Entity]["table"];
export type EntityLabel = (typeof ENTITY_CONFIG)[Entity]["label"];

// HOW TO USE:
// ENTITY_CONFIG[entity].supportsImage
// or
// ENTITY_CONFIG.rdCategory.storageBucket
