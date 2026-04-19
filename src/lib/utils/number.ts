export const parseNumber = (
  val: string,
  locale: string = "id-ID",
): number | null => {
  if (!val) return null;

  let normalized = val.trim();

  // detect jika pakai titik sebagai decimal (case: 0.29)
  const isDotDecimal = /^\d+\.\d+$/.test(normalized);

  if (locale === "id-ID" && !isDotDecimal) {
    normalized = normalized
      .replace(/\./g, "") // thousand
      .replace(",", "."); // decimal
  } else {
    normalized = normalized.replace(/,/g, "");
  }

  const parsed = Number(normalized);
  return isNaN(parsed) ? null : parsed;
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
