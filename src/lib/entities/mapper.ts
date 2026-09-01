import { DbOptionListRow } from "@/types/database";
import { Option } from "@/types/option";

export function mapEntityOption(data: DbOptionListRow): Option {
  const { id, name } = data;

  return {
    label: name,
    value: id,
  };
}
