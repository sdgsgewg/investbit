type ReksaDanaItem = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
  rd_items: ReksaDanaItem[];
};
