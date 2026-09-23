import { errorResponse, successResponse } from "@/lib/api/response";
import { loginService } from "@/lib/services/auth/login.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data = await loginService(body);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}