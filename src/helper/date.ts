import { format, isValid, parseISO } from "date-fns";

export function safeFormatDate(
  dateStr: string,
  formatStr: string,
  fallback = "-",
) {
  try {
    const date = parseISO(dateStr); // lebih strict dari new Date()

    if (!isValid(date)) return fallback;

    return format(date, formatStr);
  } catch {
    return fallback;
  }
}
