export function isActivePath(pathname: string, path: string, exact = false) {
  if (exact) {
    return pathname === path;
  }

  return pathname === path || pathname.startsWith(`${path}/`);
}
