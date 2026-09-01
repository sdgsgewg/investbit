import { GroupedItemQuery, ItemQuery } from "@/types/mutual-fund/items";

export const itemKeys = {
  all: ["items"] as const,

  lists: () => [...itemKeys.all, "list"] as const,

  list: (params?: ItemQuery) => [...itemKeys.lists(), params] as const,

  groupedLists: () => [...itemKeys.all, "grouped"] as const,

  groupedList: (params?: GroupedItemQuery) =>
    [...itemKeys.groupedLists(), params] as const,

  edits: () => [...itemKeys.all, "edit"] as const,

  edit: (id: string) => [...itemKeys.edits(), id] as const,
};
