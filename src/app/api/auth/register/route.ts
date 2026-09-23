import { createdResponse, errorResponse } from "@/lib/api/response";
import { registerService } from "@/lib/services/auth/register.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const origin = request.headers.get("origin") || new URL(request.url).origin;

    const locale = typeof body.locale === "string" ? body.locale : "en";
    const next = typeof body.next === "string" ? body.next : "/";

    const emailRedirectTo = `${origin}/auth/callback?locale=${encodeURIComponent(locale)}&next=${encodeURIComponent(next)}`;

    const data = await registerService(body, emailRedirectTo);

    return createdResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
