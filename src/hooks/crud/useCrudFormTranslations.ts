import { useTranslations } from "next-intl";

export function useCrudFormTranslations(entityKey?: string) {
  const getModifiedEntityKey = () => {
    if (!entityKey) return "";

    const entityKeyLastChar = entityKey.charAt(entityKey.length - 1);

    if (entityKeyLastChar === "y") {
      return entityKey.replace(entityKeyLastChar, "ie");
    }

    return entityKey;
  };

  const tLabels = useTranslations(
    `dashboard.${getModifiedEntityKey()}s.form.labels`,
  );
  const tPlaceholders = useTranslations(
    `dashboard.${getModifiedEntityKey()}s.form.placeholders`,
  );

  const tCommonLabels = useTranslations("common.form.labels");

  const tCommonPlaceholders = useTranslations("common.form.placeholders");

  const tEntities = useTranslations("entities");
  const tCommon = useTranslations("common");

  return {
    tLabels,
    tPlaceholders,
    tCommonLabels,
    tCommonPlaceholders,
    tEntities,
    tCommon,
  };
}
