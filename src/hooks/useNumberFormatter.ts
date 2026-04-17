import { useLocale } from "next-intl";
import { mapLocale } from "@/lib/utils/locale";
import {
  parseNumber as baseParseNumber,
  formatNumber as baseFormatNumber,
  formatDecimal as baseFormatDecimal,
  formatPercent as baseFormatPercent,
  formatCurrency as baseFormatCurrency,
} from "@/lib/utils/number";

export const useNumberFormatter = () => {
  const locale = useLocale();
  const intlLocale = mapLocale(locale);

  return {
    parseNumber: (val: string) => baseParseNumber(val, intlLocale),

    formatNumber: (
      value: number | null | undefined,
      options?: Intl.NumberFormatOptions,
    ) => baseFormatNumber(value, options, intlLocale),

    formatDecimal: (value: number | null | undefined, fractionDigits = 2) =>
      baseFormatDecimal(value, fractionDigits, intlLocale),

    formatPercent: (value: number | null | undefined, fractionDigits = 2) =>
      baseFormatPercent(value, fractionDigits, intlLocale),

    formatCurrency: (value: number | null | undefined, currency = "IDR") =>
      baseFormatCurrency(value, currency, intlLocale),
  };
};
