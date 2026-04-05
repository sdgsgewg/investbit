import {
  upsertRecordsRepo,
  getRecordsRepo,
} from "@/lib/repositories/reksadana/records.repo";
import {
  recordsQuerySchema,
  recordsSchema,
} from "../../validations/reksadana/records.schema";

export async function upsertRecordsService(input: unknown) {
  // Validate
  const parsed = recordsSchema.parse(input);

  // Business rule example (optional)
  // e.g. prevent future date
  const today = new Date().toISOString().split("T")[0];
  parsed.forEach((r) => {
    if (r.date > today) {
      throw new Error(`Date ${r.date} cannot be in the future`);
    }
  });

  // Call repo
  return await upsertRecordsRepo(parsed);
}

export async function getRecordsService(query: unknown) {
  // Validate query params
  const parsed = recordsQuerySchema.parse(query);

  return await getRecordsRepo(parsed);
}
