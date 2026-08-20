export function getPaginationItems(
  currentPage: number,
  totalPages: number,
): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items: (number | "...")[] = [1];

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) {
    items.push("...");
  }

  for (let i = start; i <= end; i++) {
    items.push(i);
  }

  if (end < totalPages - 1) {
    items.push("...");
  }

  items.push(totalPages);

  return items;
}
