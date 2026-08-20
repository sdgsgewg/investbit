export function getQueryParams<T extends object>(
  request: Request,
  keys: readonly (keyof T)[],
): Partial<Record<keyof T, string | undefined>> {
  const { searchParams } = new URL(request.url);

  return Object.fromEntries(
    keys.map((key) => [key, searchParams.get(String(key)) || undefined]),
  ) as Partial<Record<keyof T, string | undefined>>;
}

export function getCrudQuery<T extends object>(
  request: Request,
  extraKeys: readonly (keyof T)[] = [],
): Partial<Record<keyof T, string | undefined>> {
  return getQueryParams<T>(request, [
    "search",
    "page",
    "limit",
    "sortBy",
    "sortOrder",
    ...extraKeys,
  ] as (keyof T)[]);
}
