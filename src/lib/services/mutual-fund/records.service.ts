import {
  upsertRecordsRepo,
  getRecordsRepo,
} from "@/lib/repositories/mutual-fund/records.repo";
import {
  recordsQuerySchema,
  upsertRecordSchema,
} from "../../validations/mutual-fund/records.schema";
import { getTodayInTimezone } from "@/lib/utils/date";

export async function getRecordsService(query: unknown) {
  // Validate query params
  const parsed = recordsQuerySchema.parse(query);

  return await getRecordsRepo(parsed);
}

export async function upsertRecordsService(input: unknown, timezone: string) {
  // Validate
  const parsed = upsertRecordSchema.parse(input);

  // Business rule example (optional)
  // e.g. prevent future date
  const today = getTodayInTimezone(timezone);

  parsed.forEach((r) => {
    if (r.date > today) {
      throw new Error(`Date ${r.date} cannot be in the future`);
    }
  });

  return await upsertRecordsRepo(parsed);
}
