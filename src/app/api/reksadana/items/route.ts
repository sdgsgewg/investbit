import {
  createItemsService,
  getItemsGroupedService,
  getItemsService,
} from "@/lib/services/reksadana/items.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = {
      name: searchParams.get("name") || undefined,
      category_id: searchParams.get("category_id") || undefined,
    };

    const grouped = searchParams.get("grouped") === "true";

    const data = grouped
      ? await getItemsGroupedService(query)
      : await getItemsService(query);

    console.log(
      "GET /items with query",
      query,
      "grouped:",
      grouped,
      "result:",
      data,
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("GET /items error:", error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 400 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data = await createItemsService(body);

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 400 },
    );
  }
}
