import {
  upsertRecordsRepo,
  getRecordsRepo,
} from "@/lib/repositories/mutual-fund/records.repo";
import {
  recordsQuerySchema,
  upsertRecordSchema,
} from "../../validations/mutual-fund/records.schema";

export async function getRecordsService(query: unknown) {
  // Validate query params
  const parsed = recordsQuerySchema.parse(query);

  return getRecordsRepo(parsed);
}

export async function upsertRecordsService(input: unknown) {
  // Validate
  const parsed = upsertRecordSchema.parse(input);

  // Business rule example (optional)
  // e.g. prevent future date
  const today = new Date().toISOString().split("T")[0];
  parsed.forEach((r) => {
    if (r.date > today) {
      throw new Error(`Date ${r.date} cannot be in the future`);
    }
  });

  return upsertRecordsRepo(parsed);
}
