export const parseNumber = (
  val: string,
  locale: string = "id-ID",
): number | null => {
  if (!val) return null;

  let normalized = val.trim();

  const supportedLocales = ["id-ID", "en-US"];

  if (!supportedLocales.includes(locale)) {
    throw new Error(
      `Unsupported locale: ${locale}. Supported locales: ${supportedLocales.join(", ")}`,
    );
  }

  const isNegative = normalized.startsWith("-");
  if (isNegative) normalized = normalized.slice(1);

  const hasDot = normalized.includes(".");
  const hasComma = normalized.includes(",");

  if (hasDot && hasComma) {
    const lastDot = normalized.lastIndexOf(".");
    const lastComma = normalized.lastIndexOf(",");
    const decimalSeparator = lastDot > lastComma ? "." : ",";
    const thousandSeparator = decimalSeparator === "." ? "," : ".";

    normalized = normalized
      .replace(new RegExp(`\\${thousandSeparator}`, "g"), "")
      .replace(decimalSeparator, ".");
  } else if (hasComma) {
    // Be tolerant with decimal comma input in both locales.
    normalized = normalized.replace(",", ".");
  } else if (hasDot && locale === "id-ID") {
    const isDotDecimal = /^\d+\.\d+$/.test(normalized);

    if (!isDotDecimal) {
      normalized = normalized.replace(/\./g, "");
    }
  }

  const parsed = Number(normalized);

  if (isNaN(parsed)) return null;

  return isNegative ? -parsed : parsed;
};

export const formatNumber = (
  value: number | null | undefined,
  options?: Intl.NumberFormatOptions,
  locale: string = "id-ID",
): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return "-";
  }

  return new Intl.NumberFormat(locale, options).format(value);
};

export const formatDecimal = (
  value: number | null | undefined,
  fractionDigits: number = 2,
  locale: string = "id-ID",
): string => {
  return formatNumber(
    value,
    {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    },
    locale,
  );
};

export const formatPercent = (
  value: number | null | undefined,
  fractionDigits: number = 2,
  locale: string = "id-ID",
): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return "-";
  }

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);

  return value >= 0 ? `+${formatted}%` : `${formatted}%`;
};

export const formatCurrency = (
  value: number | null | undefined,
  currency: string = "IDR",
  locale: string = "id-ID",
): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return "-";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
};
