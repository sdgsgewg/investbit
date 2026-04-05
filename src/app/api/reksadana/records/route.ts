import { NextResponse } from "next/server";
import {
  upsertRecordsService,
  getRecordsService,
} from "@/lib/services/reksadana/records.service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = {
      startDate: searchParams.get("startDate") || undefined,
      endDate: searchParams.get("endDate") || undefined,
    };

    const data = await getRecordsService(query);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("GET /records error:", error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 400 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data = await upsertRecordsService(body);

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("POST /records error:", error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 400 },
    );
  }
}
