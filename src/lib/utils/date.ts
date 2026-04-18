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

export const getLastWorkingDay = (date = new Date()) => {
  const d = new Date(date);

  const day = d.getDay();

  if (day === 0) {
    // Sunday -> Friday
    d.setDate(d.getDate() - 2);
  } else if (day === 6) {
    // Saturday -> Friday
    d.setDate(d.getDate() - 1);
  }

  return d;
};
