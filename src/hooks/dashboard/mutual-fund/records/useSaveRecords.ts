import { saveRecords } from "@/lib/api/mutual-fund/records";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { useCrudMutation } from "../../useCrudMutation";

export function useSaveRecords(selectedDate?: string) {
  return useCrudMutation({
    mutationFn: saveRecords,

    invalidateQueries: [
      {
        queryKey: queryKeys.records({
          startDate: selectedDate,
          endDate: selectedDate,
        }),
      },
    ],

    entityKey: "rdRecord",

    action: "upsert",
  });
}
