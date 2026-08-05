type ReksaDanaItem = {
  id: string;
  name: string;
};

export type CategoryWithItems = {
  id: string;
  name: string;
  rd_items: ReksaDanaItem[];
};
