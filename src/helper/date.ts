import { format, isValid, parseISO } from "date-fns";

export function safeFormatDate(
  value: string,
  formatStr: string,
  fallback = "-"
) {
  try {
    const date = parseISO(value); // lebih strict dari new Date()

    if (!isValid(date)) return fallback;

    return format(date, formatStr);
  } catch {
    return fallback;
  }
}