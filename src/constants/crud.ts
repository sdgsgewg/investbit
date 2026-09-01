export const CRUD_PAGE_LIMITS = [10, 20, 50, 100] as const;

export const DEFAULT_CRUD_PAGE_LIMIT = 20;

export const CRUD_PAGE_LIMIT_OPTIONS = CRUD_PAGE_LIMITS.map((limit) => ({
  value: String(limit),
  label: String(limit),
}));
