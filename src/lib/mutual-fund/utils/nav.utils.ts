export function isValidNav(nav: number | null): nav is number {
  return nav !== null && Number.isFinite(nav) && nav > 0;
}
