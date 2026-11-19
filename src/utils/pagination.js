/**
 * Pure pagination helpers — kept independently testable from any DOM/API code.
 */

export function computeTotalPages(total, pageSize) {
  if (!total || total <= 0 || !pageSize) return 1;
  return Math.max(1, Math.ceil(total / pageSize));
}

export function computeSkip(page, pageSize) {
  return Math.max(0, (page - 1) * pageSize);
}

export function clampPage(page, totalPages) {
  const safeTotalPages = totalPages < 1 ? 1 : totalPages;
  return Math.min(Math.max(1, page), safeTotalPages);
}
