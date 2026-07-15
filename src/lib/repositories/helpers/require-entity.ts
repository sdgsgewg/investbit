import { EntityLabel } from "@/config/entities";
import { NotFoundError } from "@/lib/errors/http-error";

export async function requireEntity<T>(
  getById: (id: string) => Promise<T | null>,
  id: string,
  entityLabel: EntityLabel,
): Promise<T> {
  const entity = await getById(id);

  if (!entity) {
    throw new NotFoundError(`${entityLabel} not found`);
  }

  return entity;
}
