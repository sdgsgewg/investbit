import { CategoryListResponse } from "@/types/mutual-fund/categories";
import { Option } from "@/types/option";
import { Translate } from "@/types/translate";

interface GetCategoryOptionsParams {
  categories: CategoryListResponse[];
  showAllCategoryOption?: boolean;
  tCommonFilter?: Translate;
}

/**
 *
 * @param categories
 * @param showAllCategoryOption
 * @param tCommonFilter
 * @returns Option[]
 */
export function getCategoryOptions({
  categories,
  showAllCategoryOption = false,
  tCommonFilter,
}: GetCategoryOptionsParams): Option[] {
  const options = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  if (showAllCategoryOption && tCommonFilter) {
    options.unshift({
      label: tCommonFilter("allCategory"),
      value: "",
    });
  }

  return options;
}
