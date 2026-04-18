import { format, isValid, parseISO } from "date-fns";

export function safeFormatDate(
  input: string | Date | null | undefined,
  formatStr: string,
  fallback = "-",
) {
  try {
    if (!input) return fallback;

    const date = typeof input === "string" ? parseISO(input) : input;

    if (!isValid(date)) return fallback;

    return format(date, formatStr);
  } catch {
    return fallback;
  }
}
