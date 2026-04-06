import { ItemData } from "../items/ItemData";

export type CategoryData = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  rd_items: ItemData[];
};
