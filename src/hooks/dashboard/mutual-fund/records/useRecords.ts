import { fetchRecords } from "@/lib/api/mutual-fund/records";
import { queryConfig } from "@/lib/react-query/queryConfig";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { RecordQuery } from "@/types/mutual-fund/records";
import { useQuery } from "@tanstack/react-query";

export function useRecords(params?: RecordQuery) {
  const query = useQuery({
    queryKey: queryKeys.records(params),
    queryFn: () => fetchRecords(params),
    enabled: !!params?.startDate && !!params.endDate,
    ...queryConfig,
  });

  return {
    records: query.data ?? [],
    ...query,
  };
}
