import { getPerformanceService } from "@/lib/services/reksadana/recap/performance.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = {
      timeFrame: searchParams.get("timeFrame") || "weekly",
      categoryId: searchParams.get("categoryId") || undefined,
      periodLimit: searchParams.get("periodLimit") || undefined,
    };

    const data = await getPerformanceService(query);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("GET /performance error:", error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 400 },
    );
  }
}
