export type RecordData = {
  id: string;
  item_id: string;
  date: string;
  yield_1d: number;
  yield_ytd: number;
  rd_items: {
    id: string;
    name: string;
    category_id: string;
    rd_categories: {
      id: string;
      name: string;
    } | null;
  } | null;
};
