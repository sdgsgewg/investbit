export function getNameFromPayload(payload: unknown): string {
  if (payload instanceof FormData) {
    return String(payload.get("name") ?? "");
  }

  if (typeof payload === "object" && payload !== null && "name" in payload) {
    return String((payload as { name: unknown }).name);
  }

  return "";
}
