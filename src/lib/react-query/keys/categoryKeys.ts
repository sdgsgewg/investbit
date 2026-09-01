import { CategoryQuery } from "@/types/mutual-fund/categories";

export const categoryKeys = {
  all: ["categories"] as const,

  lists: () => [...categoryKeys.all, "list"] as const,

  list: (params?: CategoryQuery) => [...categoryKeys.lists(), params] as const,

  options: () => [...categoryKeys.all, "options"] as const,
};
